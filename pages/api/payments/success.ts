import stripe from "@/services/stripe/stripe";
import Cors from "micro-cors";
import { buffer } from "micro";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getUserTokens,
  updateUserTokens,
} from "@/services/firebase-admin/models";
const webhook_secret = process.env.WEEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = await buffer(req);
  const signature = req.headers["stripe-signature"]!;
  const event: Stripe.Event = stripe.webhooks.constructEvent(
    body.toString(),
    signature,
    webhook_secret
  );
  switch (event.type) {
    case "charge.succeeded":
      res.status(200).json({ message: "ok" }); //its not a mistake we need to send the response back to strpe immediately.we update tokens after sending the response
      const object = event.data.object.metadata;
      const userTokens = await getUserTokens(object.userId);
      const newTokens = Number(userTokens) + Number(object.tokens);
      await updateUserTokens(object.userId, newTokens);
      break;
    case "payment_method.attached":
      res.status(200).json({ message: "ok" });
      break;
    default:
      res.status(200).json({ message: "ok" });
      console.log(`Unhandled event type ${event.type}`);
  }
}

export default cors(handler as any);
