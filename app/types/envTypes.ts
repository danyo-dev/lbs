export interface EnvVars {
  ENV: {
    AUTH0_SESSION_TIMEOUT: number;
  };
}

export interface CustomWindow extends Window, EnvVars {}
