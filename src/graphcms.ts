import express from "express";
const fetch = require("node-fetch");

export const postRequest = async (
  req: express.Request,
  res: express.Response
): Promise<void | express.Response> => {
  const url = process.env.GRAPHCMS_URL;
  const token = process.env.GRAPHCMS_TOKEN;
  if (!url || !token) {
    res
      .status(500)
      .send({ error: "GRAPHCMS_URL or GRAPHCMS_TOKEN env variable not found" });
    return;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).send(data);
};
