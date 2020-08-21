const express = require("express");
const router = express.Router();

const { catchErrors } = require("../errors");
const ViennoiserieQuizzObject = require("../models/viennoiserie");
const { sendFeedback } = require("./feedback");

const formatQuizz = ({ name, email, zip, comment, quizz }) => {
  quizz = typeof quizz === "string" ? JSON.parse(quizz) : quizz;
  return `
  ${Object.keys(quizz)
    .sort()
    .map((question) => `${question}:\n      - ${quizz[question].join(";\n      - ")}`)
    .join("\n")}
    Nom: ${name}
    Email: ${email}
    Code postal: ${zip}
    Commentaires: ${comment}`;
};

router.post(
  "/",
  catchErrors(async (req, res, next) => {
    const { body } = req;
    if (body.email) {
      const exists = await ViennoiserieQuizzObject.findOne({ email: body.email });
      if (exists) {
        exists.name = body.name;
        exists.comment = body.comment;
        exists.email = body.email;
        exists.zip = body.zip;
        exists.quizz = JSON.stringify(body.quizz);
        await exists.save();
      }
    } else {
      const newUser = body;
      newUser.quizz = JSON.stringify(body.quizz);
      await ViennoiserieQuizzObject.create(newUser);
    }

    body.address = "quizz-viennoiseries@ambroselli.io";
    body.email = body.email || "viennoiserie-anonyme@ambroselli.io";
    body.text = formatQuizz(body);
    body.subject = "Nouvelle réponse au quizz: " + body.email;
    next();
  }),
  catchErrors(sendFeedback)
);

module.exports = router;
