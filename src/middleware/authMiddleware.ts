import { auth } from "express-oauth2-jwt-bearer";

const verifyToken = auth({
  // audience: "http://localhost:3001/",
  // issuerBaseURL: "https://dev-7ljxey41s8vqi4x8.us.auth0.com/",
  // tokenSigningAlg: "RS256",
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNING_ALG,
});

export default verifyToken;
