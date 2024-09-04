/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs');
const { i18n } = require('./next-i18next.config');
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

const moduleExports = {
    // Your existing module.exports

    sentry: {
        // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
        // for client-side builds. (This will be the default starting in
        // `@sentry/nextjs` version 8.0.0.) See
        // https://webpack.js.org/configuration/devtool/ and
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
        // for more information.
        hideSourceMaps: true
    },

    webpack: (config) => {
        config.module.rules.push({
            test: /\.(webm|mp4)$/,
            use : {
                loader : 'file-loader',
                options: {
                    publicPath: '/_next',
                    name      : 'static/media/[name].[hash].[ext]'
                }
            }
        });

        return config;
    },
    i18n
};

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore
    // dryRun: process.env.VERCEL_ENV !== "production",

    silent: true // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const uploadSourceMap = process.env.NEXT_PUBLIC_DISABLE_SOURCE_MAPS === 'true';
const skipExtraActions = process.env.SKIP_EXTRA_BUILD_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const next_js_options = {
    trailingSlash              : true,
    reactStrictMode            : true,
    productionBrowserSourceMaps: uploadSourceMap,
    env                        : {
        // test:1,
        // API_URL: process.env.API_URL,
    },
    compiler: {
        // removeConsole: true,
        styledComponents: true,
        emotion         : true
    },
    sassOptions: {
        includePaths: [path.join(__dirname, './src/scss')]
    },

    modularizeImports: {
        '@mui/material/?(((\\w*)?/?)*)': {
            transform: '@mui/material/{{ matches.[1] }}/{{member}}'
        },

        '@mui/icons-material/?(((\\w*)?/?)*)': {
            transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
        }
    },
    transpilePackages: [
        '@mui/system',
        '@mui/material',
        '@mui/icons-material'

        // [
        //     'babel-plugin-import',
        //     {
        //         libraryName            : '@mui/material',
        //         libraryDirectory       : '',
        //         camel2DashComponentName: false
        //     },
        //     'core'
        // ],
        // [
        //     'babel-plugin-import',
        //     {
        //         libraryName            : '@mui/icons-material',
        //         libraryDirectory       : '',
        //         camel2DashComponentName: false
        //     },
        //     'icons'
        // ]
    ],
    eslint: {
        ignoreDuringBuilds: skipExtraActions
    },
    typescript: {
        ignoreBuildErrors: skipExtraActions
    },
    staticPageGenerationTimeout: 120
};

module.exports = withBundleAnalyzer({
    ...next_js_options,
    ...(skipExtraActions ? {} : withSentryConfig(moduleExports, {}))
});
