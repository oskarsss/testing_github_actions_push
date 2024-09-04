/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
    // debug: process.env.NODE_ENV === 'development',
    debug: false,
    i18n : {
        defaultLocale  : 'en',
        locales        : ['en', 'ua'],
        localeDetection: false
    },
    trailingSlash: true,
    localePath   : path.resolve('./public/locales'),

    reloadOnPrerender: process.env.NODE_ENV === 'development'
};
