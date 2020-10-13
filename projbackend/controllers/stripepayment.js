const stripe = require("stripe")(
  "sk_test_51H45acGuwcpoNAgOm0reLwgDVIk0yCEMXwxfHcvw5fUFirmGedygmHAo5rGU4reOBnsmfH7WQCfDenpRNeDsgEXB00NsOApc2i"
);
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS", products);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "account description",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                city: token.card.address_city,
                country: token.card.address_country,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};
