export type IConfig = {
  aws: {
    region: string;
    endpoint?: string;
    credentials: {
      accessKeyId: string;
      secretAccessKey: string;
    };
    ddb: {
      tableName: string;
    };
  };
};

export class EnvVarsConfig {
  private config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  get(key: keyof IConfig): IConfig[keyof IConfig] {
    return this.config[key];
  }
}

export const CONFIG: IConfig = {
  aws: {
    credentials: {
      accessKeyId: process.env.AWS_CREDENTIALS_ACCESS_KEY_ID || "key",
      secretAccessKey: process.env.AWS_CREDENTIALS_SECRET_ACCESS_KEY || "key",
    },
    ddb: {
      tableName: process.env.AWS_DDB_TABLE_NAME || "transactions",
    },
    endpoint: process.env.AWS_ENDPOINT,
    region: process.env.AWS_REGION || "region",
  },
};
