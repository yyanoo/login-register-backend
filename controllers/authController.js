import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserWithPassword, users } from "../models/userModel.js";
import { Player, players } from "../models/playerModel.js";

// 註冊
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const existing_email = users.find((u) => u.email === email);
  if (existing_email)
    return res.status(400).json({ message: "Email already used" });
  const existing_userName = users.find((u) => u.username === username);
  if (existing_userName)
    return res.status(400).json({ message: "Username already used" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserWithPassword(username, email, hashedPassword);
  users.push(newUser);

  const newPlayer = new Player(username, 1000, []);
  players.push(newPlayer);

  res.status(201).json({ message: "Register success" });
  console.log(`register`);
};

// 登入
export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User notfound" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ username: user.username }, "SECRET_KEY", {
    expiresIn: "12h",
  });
  const userData = user.getInfo();

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // 需要 HTTPS
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Login success",
    data: userData,
  });
  console.log(`login`);
};

export const logout = (req, res) => {
  // 清除 cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    /// sameSite: "None", 部署後增加
  });

  // 回傳訊息
  res.json({ message: "Logout success" });
  console.log(`logout`);
};

// 檢查個人資訊
export const profile = (req, res) => {
  const username = req.query.username;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: "user not found" });

  const player = players.find((p) => p.playerid === username);
  const playerInfo = player.getInfo();

  res.json({
    message: "Player found",
    data: playerInfo,
  });
};

// 尋找其他人資料
export const searchprofile = (req, res) => {
  const username = req.query;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: "Player not found" });

  const player = players.find((p) => p.playerid === username);
  const playerInfo = player.getInfo();

  res.json({
    message: "Player found",
    data: playerInfo,
  });
};
