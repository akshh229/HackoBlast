import dotenv from "dotenv";
dotenv.config(); // load .env before anything else

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 HackoBlast API running on http://localhost:${PORT}`);
  });
})();
