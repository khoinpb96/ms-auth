import mongoose from "mongoose";

type SchemaType = {
  username: string;
  password: string;
  authType: "local" | "google" | "facebook" | "twitter" | "github";
  email: string;
};

const schema = new mongoose.Schema<SchemaType>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  authType: { type: String, required: true },
});

const User = mongoose.model("User", schema);

export default User;
