export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET_KEY: string;
      DATABASE_URL: string;
      PORT: string;
      AUDIENCE: string;
      ISSUER_BASE_URL: string;
      TOKEN_SIGNING_ALG: string;
    }
  }
}
