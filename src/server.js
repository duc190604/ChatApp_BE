import express from "express";
import { connectDB } from "~/config/mongodb";
import { env } from "~/config/environments";
import { APIs_V1 } from "~/routes/v1";
import { errorHandling } from "~/middlewares/errorHandling";
import authJwt from "~/middlewares/expressJWT";
import http from "http";
import socket from "~/socket";
const app = express();
const PORT = env.APP_PORT;
const HOST = env.APP_HOST;
const server = http.createServer(app);
socket(server);
app.use(express.json());
app.use(authJwt);
app.use("/api/v1", APIs_V1);
app.use(errorHandling);
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
