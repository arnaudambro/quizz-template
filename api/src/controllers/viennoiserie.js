const express = require("express");
const router = express.Router();

const { catchErrors } = require("../errors");
const ViennoiserieQuizzObject = require("../models/viennoiserie");
const { sendFeedback } = require("./feedback");

const formatQuizz = ({ name, email, zip, comment, quizz }) => {
  console.log(typeof quizz, quizz);
  return `
  ${Object.keys(quizz)
    .sort()
    .map((question) => `${question}: ${quizz[question].join("; ")}`)
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
    console.log(body);
    const exists = await ViennoiserieQuizzObject.findOne({ email: body.email });
    if (exists) {
      exists.name = body.name;
      exists.comment = body.comment;
      exists.email = body.email;
      exists.zip = body.zip;
      exists.quizz = body.quizz;
      await exists.save();
    } else {
      const newUser = body;
      newUser.quizz = JSON.stringify(body.quizz);
      console.log("typeof newUser.quizz", typeof newUser.quizz);
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
