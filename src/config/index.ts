import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.mongo_uri!,
  JWT_SECRET: process.env.jwt_secret!,
};
