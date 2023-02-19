import * as Pino from "pino";

export class Logger {
  logger: Pino.Logger;

  constructor(file: string) {
    this.logger = Pino.pino({
      level: process.env.PINO_LOG_LEVEL || "info",
      transport:
        process.env.NODE_ENV === "dev"
          ? {
              options: {
                colorize: true,
                ignore: "file",
                messageFormat: "[{file}] {msg}",
                translateTime: "yyyy-mm-dd HH:MM:ss"
              },
              target: "pino-pretty"
            }
          : undefined
    }).child({
      file
    });
  }
}
