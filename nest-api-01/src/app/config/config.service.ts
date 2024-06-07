import { Injectable } from "@nestjs/common";
import { ConfigData, ConfigDatabase, ConfigSwagger } from "./config.interface";
import { DEFAULT_CONFIG } from "./config.default";



@Injectable()
export class ConfigService {
    private config: ConfigData;
    constructor(data: ConfigData = DEFAULT_CONFIG) {
        this.config = data;
    }

    public loadFromEnv() {
        this.config = this.parseConfigFromEnv(process.env)
    }
    private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
        return {
            port: Number(env.PORT || 3001),
            env: env.NODE_ENV || DEFAULT_CONFIG.env,
            db: this.parseDBConfig(env, DEFAULT_CONFIG.db),
            swagger: this.parseSwaggerConfig(env, DEFAULT_CONFIG.swagger),
            logLevel: env.LOG_LEVEL!,
            elastic: {
                url: env.ELASTIC_SEARCH_URL!,
                username: env.ELASTIC_SEARCH_USERNAME!,
                password: env.ELASTIC_SEARCH_PASSWORD!,
                index: env.ELASTIC_SEARCH_INDEX,
            },
        };
    }

    private parseDBConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigDatabase>
) {
    return {
        url: env.DATABASE_URL || defaultConfig.url,
    };
}
  private parseSwaggerConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigSwagger>
) {
    return {
        username: env.SWAGGER_USERNAME || defaultConfig.username,
        password: env.SWAGGER_PASSWORD || defaultConfig.password,
    };
}

  public get(): Readonly < ConfigData > {
    return this.config;
}

}
