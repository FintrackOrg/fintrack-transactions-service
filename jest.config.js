const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  roots: ["./src/"],
  collectCoverageFrom: ["./src/**"],
  coveragePathIgnorePatterns: [
    "/infraestructure/models/proto/",
    "/*.fake.ts",
    "src/server.ts",
    "src/init.ts",
    "src/integration",
  ],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};
