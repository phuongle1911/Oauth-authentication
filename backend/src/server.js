const express = require('express');
const app = express();
const dotenv = require('dotenv')
const crypto = require('node:crypto')
const { OAuth2Client } = require('google-auth-library');
const cors = require("cors");

dotenv.config();

app.use(cors());

// Set up for server handling Json data from the request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let corsOption = { 
  credentials: true,
  origin: [
  "http://localhost:5173"
], optionsSuccessStatus: 200}
app.use(cors(corsOption));

// Google URL for OAuth authorisation
const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;

// CLIENT ID obtained from created credentials 
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;

const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

// CALLBACK URL needs to be the same as authorized redirect URL in credential
const GOOGLE_CALLBACK_URL = "http://localhost:3000/google/callback";

const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;

// Access scopes for selected scopes in OAuth2.0 Consent screen configuration
const GOOGLE_OAUTH_SCOPES = [
"https%3A//www.googleapis.com/auth/userinfo.email",

"https%3A//www.googleapis.com/auth/userinfo.profile",

];

const client = new OAuth2Client;


app.get("/", (request, response) => {

  // set up state to be a random number
  const state = crypto.randomBytes(32).toString("hex");


  // query parameters
  const params = {
    scope: GOOGLE_OAUTH_SCOPES.join(" "),
    access_type: 'offline',
    state: state,
    response_type: 'code',
    redirect_uri: GOOGLE_CALLBACK_URL,
    client_id: GOOGLE_CLIENT_ID,
  };
  
  // Construct OAuth consent screen URL from query parameters
  const paramsString = Object.entries(params).reduce((accu, [key, value]) => {
    accu.push(`${key}=${value}`);
    return accu;
  }, []);

  // redirect to consent screen URL
  response.redirect(`${GOOGLE_OAUTH_URL}?${paramsString.join('&')}`);
});

// Set up redirect URI following user login
app.get("/google/callback", async(request, response) => {
  q = request.query;
  // if it is a error response from server
  if (q.error) {
    console.error("Error:" + q.error)
  } else { // when response contain authorization code
    const code = request?.query?.code;
    if (!code) {
      console.error("No access code provided")
    } else {
      const data = {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code"
      };
    // exchange authorization code for access token and refresh token
    // by sending data to google server
    const response_token = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    // get the refresh token
    const access_token_data = await response_token.json();

    const { id_token } = access_token_data;

    // verify and extract information in id token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID
    });

    // extract username 
    const payload = ticket.getPayload();
    const username = payload["name"];

    // save username to cookie
    response.cookie("username", username);
    response.redirect("http://localhost:5173/")
    }
  }
});

module.exports = { app };

