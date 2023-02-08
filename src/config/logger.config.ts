import * as Pino from "pino";

export class Logger {
  logger: Pino.Logger;

  constructor(file: string) {
    this.logger = Pino.pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          messageFormat: "[{file}] {msg}",
          ignore: "file",
        },
      },
      level: process.env.PINO_LOG_LEVEL || "info",
    }).child({
      file,
    });
  }
}
