import express from "express";
const jwt = require("jsonwebtoken");

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void | express.Response> => {
  const email = req.body?.email?.toLowerCase();
  const password = req.body?.password;

  if (!(email && password)) {
    return res.status(401).json({
      message: "Email and Password are required fields",
    });
  }

  if (!(email === process.env.USER && password === process.env.PASSWORD)) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: email }, process.env.HASHSECRET, {
    expiresIn: process.env.TOKENEXPIRATION,
  });
  res.status(200).json({
    jwt: token,
  });
};
