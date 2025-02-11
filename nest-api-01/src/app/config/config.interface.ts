export interface ConfigDatabase{
    url: string;
}
export interface ConfigSwagger{
    username: string
    password: string
}
// export interface AuthConfig {
//   expiresIn: number;
//   access_token_secret: string;
//   refresh_token_secret: string;
// }

export interface ElasticConfig {
  url: string;
  username?: string;
  password?: string;
  index?: string;
}

// export interface GoogleConfig {
//   oauth_google_id: string;
//   oauth_google_callback: string;
//   oauth_google_secret: string;
// }


export interface ConfigData {
  env: string;
  port: number;
  db: ConfigDatabase;
  swagger: ConfigSwagger;
  logLevel: string;
//   auth: AuthConfig;
//   google: GoogleConfig;
  elastic: ElasticConfig;
}