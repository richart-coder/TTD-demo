export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  projects: [
    {
      displayName: "services",
      testMatch: ["<rootDir>/src/services/**/*.test.js"],
      testEnvironment: "node",
    },
    {
      displayName: "components",
      testMatch: ["<rootDir>/src/components/**/*.test.jsx"],
      testEnvironment: "jsdom",
    },
  ],
};
