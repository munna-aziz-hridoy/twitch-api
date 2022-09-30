import { config } from "dotenv";
config();
import axios from "axios";
import express from "express";
import cors from "cors";
import setToken from "./middleware/setToken.js";

const app = express();
app.use(express.json());
app.use(cors());

// const getToken = async (url, callback) => {
//   const options = {
//     url,
//     json: true,
//     body: {
//       client_id: process.env.TWITCH_CLIENT_ID,
//       client_secret: process.env.TWITCH_CLIENT_SECRET,
//       grant_type: "client_credentials",
//     },
//   };
//   request.post(options, (err, res, body) => {
//     if (err) {
//       return console.log(err);
//     }
//     callback(res);
//   });
// };

// let token;

// await getToken(process.env.GET_TOKEN_URL, (res) => {
//   token = res.body.access_token;
//   return token;
// });

// const getGames = (url, accessToken, callback) => {

//   request.post(gameOptions, (err, res, body) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(res.statusCode);
//     console.log(res);
//     console.log(JSON.parse(body), "From inside");
//   });
// };

// setTimeout(() => {
//   console.log(token, "From set-timeouts");
//   getGames(process.env.GET_GAME_URL, token);
// }, 3000);

app.get("/test", setToken, async (req, response) => {
  const token = response.accessToken;
  const gameOptions = {
    url: process.env.GET_COMPANIES_URL,
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios
    .post(
      gameOptions.url,
      {},
      {
        headers: gameOptions.headers,
      }
    )
    .catch((err) => console.log(err));
  console.log(data);
  response.send("hello");
});

app.listen(5000, () => console.log("server is running"));
