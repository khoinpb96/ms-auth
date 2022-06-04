import { Request, Response } from "express";
import axios from "axios";
import config from "../config";

export const github = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token",
      {},
      {
        params: {
          client_id: config.GITHUB.CLIENT_ID,
          client_secret: config.GITHUB.CLIENT_SECRET,
          code: req.body.code || "",
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const result = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `${data.token_type} ${data.access_token}`,
      },
    });

    return res.json(result.data);
  } catch (err: any) {
    return res.status(400).json({ message: err });
  }
};

// export const google = async (req: Request, res: Response) => {};
// export const facebook = async (req: Request, res: Response) => {};
// export const twitter = async (req: Request, res: Response) => {};
