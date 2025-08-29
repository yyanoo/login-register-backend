import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.cookies.token; // 從 cookie 拿
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
