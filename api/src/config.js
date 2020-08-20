const MONGO_URL = process.env.DB_ACCOUNT;
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "not_so_secret";
const ENVIRONMENT = process.env.NODE_ENV;

module.exports = { PORT, MONGO_URL, ENVIRONMENT, SECRET };
