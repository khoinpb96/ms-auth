import mongoose from "mongoose";

type SchemaType = {
  username: string;
  password: string;
  authType: "local" | "google" | "facebook" | "twitter" | "github";
  email?: string;
  bio?: string;
  phone?: string;
  photoUrl?: string;
  oauthId?: string;
  fullName?: string;
};

const schema = new mongoose.Schema<SchemaType>({
  username: { type: String, required: true },
  password: String,
  authType: { type: String, required: true },
  email: String,
  bio: String,
  phone: String,
  photoUrl: String,
  oauthId: String,
  fullName: String,
});

const User = mongoose.model("User", schema);

export default User;
