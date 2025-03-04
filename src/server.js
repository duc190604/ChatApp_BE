import express from "express";
import { connectDB } from "~/config/mongodb";
import { env } from "~/config/environments";
import { APIs_V1 } from "~/routes/v1";
import { errorHandling } from "~/middlewares/errorHandling";
import authJwt from "~/middlewares/expressJWT";
const app = express();
const PORT = env.APP_PORT;
const HOST = env.APP_HOST;

app.use(express.json());
app.use(authJwt);
app.use("/api/v1", APIs_V1);
app.use(errorHandling);
app.listen(PORT, HOST, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
