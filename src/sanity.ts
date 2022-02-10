import express from "express";
const fetch = require("node-fetch");

export const getRequest = async (
  req: express.Request,
  res: express.Response
): Promise<void | express.Response> => {
  const url = process.env.SANITY_URL;
  const query = req.query.query;
  if (!query) {
    res.status(500).send({ error: "Query params not found in URL" });
    return;
  }
  const response = await fetch(url + "/query/production?query=" + query, {
    method: "GET",
  });

  const data = await response.json();
  res.status(response.status).send(data);
};

export const postRequest = async (
  req: express.Request,
  res: express.Response
): Promise<void | express.Response> => {
  const url = process.env.SANITY_URL;
  const token = process.env.SANITY_TOKEN;
  if (!url || !token) {
    res
      .status(500)
      .send({ error: "SANITY_URL or SANITY_TOKEN env variable not found" });
    return;
  }
  const response = await fetch(
    url + "/mutate/production?returnDocuments=true",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );

  const data = await response.json();
  res.status(response.status).send(data);
};
