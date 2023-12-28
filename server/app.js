import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pamentGatewayRouter from "./routers/payment.js";

function init() {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (res) => {
    res.send("Hello World!");
  });

  //pamentGatewayRouter
  app.use("/pamentGateway", pamentGatewayRouter);

  app.get("*", (res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
