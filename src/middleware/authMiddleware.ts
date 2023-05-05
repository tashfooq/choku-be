import { auth } from "express-oauth2-jwt-bearer";

const verifyToken = auth({
  audience: "http://localhost:3001/",
  issuerBaseURL: "https://dev-7ljxey41s8vqi4x8.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default verifyToken;
