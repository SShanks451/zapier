import express from "express";
import { userRoutes } from "./routes/user";
import { zapRoutes } from "./routes/zap";
import cors from "cors";
import { triggerRoutes } from "./routes/trigger";
import { actionRoutes } from "./routes/action";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/zap", zapRoutes);

app.use("/api/v1/trigger", triggerRoutes)

app.use("/api/v1/action", actionRoutes)

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
