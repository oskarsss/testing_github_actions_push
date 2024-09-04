// ** MUI Imports
// eslint-disable-next-line import/no-extraneous-dependencies
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

// ** Theme Config
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import React, { useEffect, useState } from 'react';
import { ThemeOptions } from '@mui/material';
import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import * as locales from '@mui/material/locale';
import { useRouter } from 'next/router';
import { LANGUAGE_LOCAL_TO_MUI } from '@/models/language/language-mappings';
import type { LANGUAGE_CODES } from '@/models/language/language';
import themeConfig from '../../configs/themeConfig';

// ** Direction components for LTR or RTL
import Direction from '../../layouts/UserLayout/components/Direction';

// ** Theme Override Imports
import overrides from './overrides';
import typography from './typography';
import palette, { AppPalette } from './palette';
import spacing from './spacing';
import shadows from './shadows';
import breakpoints from './breakpoints';

// ** Theme

// ** Global Styles
import GlobalStyling from './globalStyles';

declare module '@mui/material/styles' {
    interface Theme {
        palette: AppPalette;
    }
}

const themeOptions = (settings: LayoutSettingsType): ThemeOptions => {
    const {
        mode,
        direction
    } = settings;

    const pallette = palette(mode ?? 'light');

    const mergedThemeConfig: ThemeOptions = {
        direction,
        palette   : pallette,
        typography: {
            fontFamily: [
                'Inter',
                'sans-serif',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(',')
        },
        shadows    : shadows(mode ?? 'light'),
        ...spacing,
        breakpoints: breakpoints(),
        shape      : {
            borderRadius: 6
        },
        mixins: {
            toolbar: {
                minHeight: 64
            }
        }
    };

    return mergedThemeConfig;
};

type Props = {
    settings: LayoutSettingsType;
    children: React.ReactNode;
};

const ThemeComponent = ({
    children,
    settings
}: Props) => {
    const [language, setLanguage] = useState<typeof locales.enUS>(locales.enUS);
    const coreThemeConfig = themeOptions(settings);
    const router = useRouter();
    const mode = settings.mode ?? 'light';

    useEffect(() => {
        const el = document.querySelector('#__next');
        el?.setAttribute('data-mode', mode === 'dark' ? 'dark' : 'light');
    }, [mode]);

    useEffect(() => {
        if (router.locale) {
            const muiLocale = LANGUAGE_LOCAL_TO_MUI[router.locale as LANGUAGE_CODES];
            if (!muiLocale) return;
            setLanguage(locales[muiLocale]);
        }
    }, [router.locale]);

    let theme = createTheme(coreThemeConfig, language);

    theme = createTheme(theme as ThemeOptions, {
        components: { ...overrides(theme, settings) },
        typography: { ...typography(theme) }
    });

    if (themeConfig.responsiveFontSizes) {
        theme = responsiveFontSizes(theme);
    }

    return (
        <ThemeProvider theme={theme}>
            <Direction direction={settings.direction}>
                <CssBaseline />
                <GlobalStyles styles={() => GlobalStyling(theme, settings)} />
                {children}
            </Direction>
        </ThemeProvider>
    );
};

export default ThemeComponent;
