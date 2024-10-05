import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "zap-events";

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingZaps = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingZaps.map((z) => ({
        value: z.zapRunId,
      })),
    });

    await client.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingZaps.map((z) => z.id),
        },
      },
    });
  }
}

main();
