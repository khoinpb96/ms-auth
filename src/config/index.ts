import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = [
  "http://localhost:3000",
  "http://authentication-webapp.vercel.app",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.mongo_uri!,
  JWT_SECRET: process.env.jwt_secret!,
  corsOptions,
};
