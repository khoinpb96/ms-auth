import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = [
  "http://localhost:3000",
  "https://authentication-webapp.vercel.app",
  "https://authentication-webapp-khoinpb96.vercel.app/",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.mongo_uri!,
  JWT_SECRET: process.env.jwt_secret!,
  corsOptions,
  GITHUB: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },
};
