import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  express.json(),
  cookieParser(),
  cors({
    origin: "http://localhost:5173", // 只能允許前端的 domain
    credentials: true, // 允許攜帶 cookie
  })
);

// 掛載登入/註冊路由
app.use("/api/auth", authRoutes);
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
