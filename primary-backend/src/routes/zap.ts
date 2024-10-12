import { Router } from "express";
import { authMiddleware } from "../middlware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const zap = await prismaClient.zap.create({
    data: {
      userId: parseInt(id),
      trigger: {
        create: {
          triggerId: parsedData.data.availableTriggerId,
        },
      },
      actions: {
        create: parsedData.data.actions.map((ac, index) => ({
          actionId: ac.availableActionId,
          sortingOrder: index,
          metaData: ac.actionMetadata,
        })),
      },
    },
  });

  return res.json({
    zapId: zap.id,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.id;

  const zaps = await prismaClient.zap.findMany({
    where: {
      userId: userId,
    },
    include: {
      trigger: {
        include: {
          type: true,
        },
      },
      actions: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zaps,
  });
});

router.get("/:zapId", authMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.id;
  const zapId = req.params.zapId;

  const zap = await prismaClient.zap.findFirst({
    where: {
      id: zapId,
      userId: userId,
    },
    include: {
      trigger: {
        include: {
          type: true,
        },
      },
      actions: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zap,
  });
});

export const zapRoutes = router;
