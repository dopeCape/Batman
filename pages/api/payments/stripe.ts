import stripe from "../../../services/stripe/stripe";
const handler = async (req: Request, res: Response) => {
  const { products, country, userId } = req.body;
  console.log(userId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: country.toLowerCase(),
          unit_amount: products.prices * 100,
          product_data: {
            name: `${products.tokens} tokens/${products.words} words`,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_intent_data: {
      metadata: {
        userId: userId,
        tokens: products.tokens,
      },
    },

    success_url: "http://localhost:3000/pricing",
    cancel_url: "http://localhost:3000/pricing",
  });
  res.status(200).json({ id: session.id });
};

export default handler;
