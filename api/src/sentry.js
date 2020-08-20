const Sentry = require("@sentry/node");

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: process.env.SENTRY_KEY,
    environment: `api-${process.env.NODE_ENV}`,
  });
}

function capture(err) {
  if (Sentry && process.env.SENTRY_KEY && err) {
    if (typeof err === "string") {
      console.log("capture message", err);
      Sentry.captureMessage(err);
    } else {
      console.log("capture exception", err);
      Sentry.captureException(err);
    }
  } else {
    console.log(err);
  }
}

module.exports = { capture };
