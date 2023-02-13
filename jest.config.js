const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  collectCoverageFrom: ["./src/**"],
  // testPathIgnorePatterns: ["/infraestructure/models/proto/", "/*.fake.ts"],
  coveragePathIgnorePatterns: ["/infraestructure/models/proto/", "/*.fake.ts", "src/server.ts"],
};
