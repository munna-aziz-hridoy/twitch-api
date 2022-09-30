import { config } from "dotenv";
config();
import request from "request";

const setToken = (req, response, next) => {
  const options = {
    url: process.env.GET_TOKEN_URL,
    json: true,
    body: {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  };
  try {
    request.post(options, (err, res, body) => {
      if (err) {
        response.status(501).send({ message: "Internal server error" });
        return;
      }
      response.accessToken = res.body.access_token;
      next();
    });
  } catch (err) {
    return response.status(501).send({ message: "Internal server error" });
  }
};

export default setToken;
