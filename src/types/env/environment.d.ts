export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGHOST: string;
      PGUSER: string;
      PGDATABASE: string;
      PGPASSWORD: string;
      PGPORT: string;
      JWT_SECRET_KEY: string;
    }
  }
}
