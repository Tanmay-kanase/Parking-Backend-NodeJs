/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  // The project uses native ESM ("type": "module" in package.json).
  // Jest is run with NODE_OPTIONS=--experimental-vm-modules (see the
  // "test" script in package.json) so no Babel transform is needed.
  transform: {},
  testMatch: ["**/test/**/*.test.js"],
  setupFiles: ["<rootDir>/test/helpers/setupEnv.js"],
  // Keep test runs isolated/quiet and give Mongo/Redis spin-up enough time.
  testTimeout: 20000,
  clearMocks: true,
  restoreMocks: true,
};
