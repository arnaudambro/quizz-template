const fetch = require("node-fetch");

exports.sendFeedback = async (req, res) => {
  const { email, text, subject, address } = req.body;
  const response = await fetch("https://api.tipimail.com/v1/messages/send", {
    method: "POST",
    headers: {
      "X-Tipimail-ApiUser": "1216dec5c2eb93965831abea2cf188a0",
      "X-Tipimail-ApiKey": "6cb290b8ac5fd371026bb63830350665",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "6cb290b8ac5fd371026bb63830350665",
      to: [
        {
          address,
        },
      ],
      msg: {
        from: {
          address: email || "viennoiseries@kestuf.io",
          personalName: process.env.APP_NAME,
        },
        subject,
        text,
      },
    }),
  }).catch((err) => console.log("send feedback err", err));
  console.log("email sent", response.statusText === "OK");
  res.json({ ok: response.statusText === "OK" });
};
