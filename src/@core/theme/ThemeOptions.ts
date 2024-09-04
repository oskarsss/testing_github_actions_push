// ** MUI Theme Provider
// eslint-disable-next-line import/no-extraneous-dependencies

// ** Theme Override Imports
import { ThemeOptions } from '@mui/material';
import palette from './palette';
import spacing from './spacing';
import shadows from './shadows';
import breakpoints from './breakpoints';
import { LayoutSettingsType } from '../../context/LayoutSettingsContext';

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

export default themeOptions;
