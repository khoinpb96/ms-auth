import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_URI: process.env.mongo_uri!,
};
