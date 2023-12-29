import { Router } from "express";
import Omise from "omise";

const omise = Omise({
  // secretKey: process.env.SECRET_KEY_OMISE,
  secretKey: "skey_test_5x5w3xsxg2gqel1tyx4", //TODO: move to env
  omiseVersion: "2019-05-29",
  //   publicKey: process.env.Public_Key,
});

const pamentGatewayRouter = Router();

pamentGatewayRouter.post("/", async (req, res) => {
  const { amount, token } = req.body;

  if (!token) {
    return res.status(404).json({ message: "token not found" });
  }

  if (!amount) {
    return res.status(404).json({ message: "amount not found" });
  }

  try {
    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      card: token.startsWith("tokn_") ? token : null,
    });
    // console.log(charge);
    if (charge.status === "successful") {
      return res.status(200).json({ message: "successful" });
    } else {
      return res.status(400).json({ message: "failed" });
    }
  } catch (error) {
    console.log(error, "error");
  }
});

export default pamentGatewayRouter;
