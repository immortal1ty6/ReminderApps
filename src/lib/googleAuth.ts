import { google } from "googleapis";  

const CLIENT_ID = process.env.CLIENT_ID
const SECRET_ID = process.env.SECRET_ID
const REDIRECT_URI = process.env.REDIRECT_URI

export const getOAuth2Client = () => {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    SECRET_ID,
    REDIRECT_URI
  );

  return oauth2Client;
}