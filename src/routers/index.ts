export { default as AuthRouter } from "./auth.router";
export { default as OAuthRouter } from "./oauth.router";
export { default as UserRouter } from "./user.router";

import { Request, Response } from "express";

export const HealthCheck = (_: Request, res: Response) => {
  return res.json({ status: "online" });
};
