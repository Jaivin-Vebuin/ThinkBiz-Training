export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }], // ✅ Move tsconfig here
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  // collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  // coverageReporters: ["text", "lcov", "json", "clover"]
};
