/* eslint-disable import/order */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-multi-assign */
/* eslint-disable no-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
// ** Next Imports
import Head from 'next/head';
import Smartlook from 'smartlook-client';
import { Provider } from 'react-redux';

import { setupListeners } from '@reduxjs/toolkit/query';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { CacheProvider } from '@emotion/react';
import { appWithTranslation, UserConfig } from 'next-i18next';

import { AuthProvider } from '@/context/AuthContext';
import { LayoutSettingsConsumer, LayoutSettingsProvider } from '@/context/LayoutSettingsContext';

import { createEmotionCache } from '@/utils/create-emotion-cache';
import { BroadcastTagInvalidation, createStore } from '@/store/createStore';
import { ConfirmProvider } from '@/@core/components/confirm-dialog';

import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../utils/devdebug';

import ThemeComponent from '../@core/theme/ThemeComponent';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'overlayscrollbars/overlayscrollbars.css';
import GoogleApiLoaderProvider from '../context/GoogleApiLoaderContext';
import DialogAndMenuProvider from '../context/DialogAndMenuContext';
import ErrorBoundary from '../@core/components/ErrorBoundary';
import SYSTEM from '../@system';
import { useRouter } from 'next/router';
import { LANGUAGE_LOCAL_TO_MOMENT } from '@/models/language/language-mappings';
import { LANGUAGE_CODES } from '@/models/language/language';

// import { createWrapper } from 'next-redux-wrapper';
import moment from 'moment-timezone';
import { api } from '@/store/api';
import { WindowFocus } from '@/utils/windowFocus';
import nextI18NextConfig from '../../next-i18next.config';
import '@/scss/main.scss';

// import createCache from '@emotion/cache';

// const clientSideEmotionCache = createEmotionCache({

// });
const cache = createEmotionCache();

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;

export const store = createStore();

const emptyInitialI18NextConfig: UserConfig = {
    i18n: {
        defaultLocale: nextI18NextConfig.i18n.defaultLocale,
        locales      : nextI18NextConfig.i18n.locales
    }
};

const CustomApp = ({
    Component,
    pageProps,
    ...rest
}: AppProps) => {
    const router = useRouter();

    useEffect(() => {
        setupListeners(store.dispatch);
        WindowFocus.init();
        BroadcastTagInvalidation.addMessageListener((data) => {
            store.dispatch(api.util.invalidateTags([data.tag]));
        });
    }, []);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
            Smartlook.init('05fb866b29d83895bd00d95759563efcce5fb930', {
                region: 'eu'
            });
        }
    }, []);

    useEffect(() => {
        if (router.locale) {
            const momentLocale = LANGUAGE_LOCAL_TO_MOMENT[router.locale as LANGUAGE_CODES];
            if (!momentLocale) return;
            import(`moment/locale/${momentLocale}`)
                .then(() => {
                    moment.locale(momentLocale);
                })
                .catch(() => {
                    console.error(`Failed to load moment locale: ${momentLocale}`);
                    moment.locale('en');
                });
        }
    }, [router.locale]);

    return (
        <Provider store={store}>
            <CacheProvider value={cache}>
                <Head>
                    <title>{SYSTEM.TITLE}</title>
                    <meta
                        name="description"
                        content={SYSTEM.TITLE}
                    />
                    <meta
                        name="keywords"
                        content={SYSTEM.KEYWORDS}
                    />
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <LayoutSettingsProvider>
                    <LayoutSettingsConsumer>
                        {({ settings }) => (
                            <ThemeComponent settings={settings}>
                                <GoogleApiLoaderProvider>
                                    <ConfirmProvider>
                                        <DialogAndMenuProvider>
                                            <AuthProvider>
                                                <ErrorBoundary>
                                                    <Component {...pageProps} />
                                                    <SpeedInsights />
                                                </ErrorBoundary>
                                            </AuthProvider>
                                        </DialogAndMenuProvider>
                                    </ConfirmProvider>
                                </GoogleApiLoaderProvider>
                            </ThemeComponent>
                        )}
                    </LayoutSettingsConsumer>
                </LayoutSettingsProvider>
            </CacheProvider>
        </Provider>
    );
};

export default appWithTranslation(CustomApp, emptyInitialI18NextConfig);
