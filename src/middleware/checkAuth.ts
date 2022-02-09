import express from "express";
const jwt = require("jsonwebtoken");

export const checkAuthorizedMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void | express.Response> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access Token not found!" });
      return;
    }
    jwt.verify(token, process.env.HASHSECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};
