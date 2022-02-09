import express from "express";

export const saveOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void | express.Response> => {
  res.status(200).json();
};
