import express from "express";

export const checkAuthorizedMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void | express.Response> => {
  const email = req.body.email.toLowerCase();
  const email = req.body.email.toLowerCase();
};
