const path = require('path')

module.exports = {
    ...require('./jest-common'),
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    snapshotSerializers: ['jest-emotion'],
    coverageThreshold: {
        global: {
            statements: 31,
            branches: 18,
            functions: 32,
            lines: 32,
        },
        './src/shared/utils.js': {
            statements: 100,
            branches: 80,
            functions: 100,
            lines: 100,
        },
    },
}
