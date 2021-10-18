module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/src/__tests__/**/*.test.ts'],
	collectCoverage: Boolean(process.env.CI),
	coverageReporters: ['clover'],
	coverageDirectory: 'src/__tests__/coverage',
	collectCoverageFrom: ['src/**/*.ts', '!**/__tests__/**/*'],
};
