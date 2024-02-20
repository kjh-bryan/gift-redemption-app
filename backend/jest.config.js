module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  //   setupFilesAfterEnv: ["<rootDir>/src/setupFilesAfterEnv.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testMatch: ["**/test/**/*.test.(ts|js)"],
  moduleFileExtensions: ["ts", "js"],
  verbose: true,
};
