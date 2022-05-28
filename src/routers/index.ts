export { default as AuthRouter } from "./auth.router";
export { default as UserRouter } from "./user.router";

export const HealthCheck = (_: any, res: any) => {
  res.json({ status: "online" });
};
