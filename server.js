import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://yyanoo.github.io"];

app.use(
  express.json(),
  cookieParser(),
  cors({
    origin: function (origin, callback) {
      // 允許沒有 origin (像 Postman) 或在允許清單內的 origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 允許攜帶 cookie
  })
);

// 掛載登入/註冊路由
app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
