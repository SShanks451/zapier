import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

const client = new PrismaClient();

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  // store in db a new trigger
  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json({
    message: "Webhook received",
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
