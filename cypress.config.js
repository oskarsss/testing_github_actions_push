// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import { defineConfig } from 'cypress';

module.exports = defineConfig({
    viewportWidth : 1920,
    viewportHeight: 1080,

    e2e: {
        baseUrl: 'http://localhost:8080',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    },

    component: {
        devServer: {
            framework: 'next',
            bundler  : 'webpack'
        }
    },

    env: {
        api_url: process.env.NEXT_PUBLIC_API_URL
    }
});
