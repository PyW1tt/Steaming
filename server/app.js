import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pamentGatewayRouter from "./routers/payment.js";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/userData.js";
import adminRouter from "./routers/adminData.js";
import unauthenticatedRouter from "./routers/unauthenGetData.js";

function init() {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(cors());
  app.use(bodyParser.json());

  //pamentGatewayRouter
  app.use("/pamentGateway", pamentGatewayRouter);
  // Auth
  app.use("/auth", authRouter);
  // user
  app.use("/user", userRouter);
  //admin
  app.use("/admin", adminRouter);
  //unauthenticated
  app.use("/unauthen", unauthenticatedRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
