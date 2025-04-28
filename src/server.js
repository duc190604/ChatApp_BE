import express from "express";
import { connectDB } from "~/config/mongodb";
import { env } from "~/config/environments";
import { APIs_V1 } from "~/routes/v1";
import { errorHandling } from "~/middlewares/errorHandling";
import authJwt from "~/middlewares/expressJWT";
import http from "http";
import socket from "~/socket";
import cors from "cors";
import morgan from "morgan";
const app = express();
const PORT = env.APP_PORT;
const HOST = env.APP_HOST;
const server = http.createServer(app);
socket(server);
app.use(morgan("dev"));
app.use((req, res, next) => {
  if (env.BUILD_MODE === "dev") {
    // Chỉ log trong môi trường development
    console.log("Chi tiết Request -----------------");
    console.log("Time:", new Date().toISOString());
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", JSON.stringify(req.headers, null, 2));
    console.log("Body:", JSON.stringify(req.body, null, 2));
    console.log("---------------------------\n");
  }
  next();
});
app.use(
  cors({
    origin: "*", // Cho phép tất cả các domain
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(authJwt);
app.use("/api/v1", APIs_V1);
app.use(errorHandling);
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});

