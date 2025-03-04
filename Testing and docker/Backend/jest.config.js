/** @type {import('jest').Config} */
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/**/**.test.ts"], // Match all test files inside tests/
    // collectCoverage: true, // Enable coverage reports
    // coverageDirectory: "coverage", // Output folder for reports
    // coverageReporters: ["text", "lcov"], // Console + HTML reports
    // collectCoverageFrom: [
    //   "src/**/*.ts", // Include all TS files
    //   "!src/**/*.d.ts", // Exclude TypeScript declaration files
    //   "!src/**/index.ts" // Exclude index.ts files
    // ],
    moduleFileExtensions: ["ts", "js"],
  };
  