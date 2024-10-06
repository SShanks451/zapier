import { Router } from "express";
import { prismaClient } from "../db";

const router = Router();

router.get("/available", async (req, res) => {
  const availabeTriggers = await prismaClient.availableTrigger.findMany({});
  res.json({
    availabeTriggers,
  });
});

export const triggerRoutes = router;
