import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";

/** Get the JWT secret, failing fast if not configured */
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return secret;
}

/** Basic email format check */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** POST /api/auth/register */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // ── Input validation ────────────────────────────
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      res.status(400).json({ error: "A valid email is required" });
      return;
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // Check if user exists
    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    // Hash password & create user
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email: trimmedEmail, password: hashed, name: trimmedName });

    // Return JWT
    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user._id, email: trimmedEmail, name: trimmedName } });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

/** POST /api/auth/login */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // ── Input validation ────────────────────────────
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      res.status(400).json({ error: "A valid email is required" });
      return;
    }
    if (!password || typeof password !== "string" || password.length === 0) {
      res.status(400).json({ error: "Password is required" });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    // select('+password') because the password field has select: false by default
    const user = await User.findOne({ email: trimmedEmail }).select("+password");
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
