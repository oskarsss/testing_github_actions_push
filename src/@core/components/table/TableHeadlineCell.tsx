import React from 'react';
import TableTypes from '@/@core/components/table/types';
import { AppPalette } from '@/@core/theme/palette';
import { useTheme } from '@mui/material';

// Slate Gray: #6B8E8D
// Steel Blue: #4682B4
// Cadet Blue: #5F9EA0
// Dark Sea Green: #8FBC8F
// Medium Turquoise: #48D1CC
// Thistle: #D8BFD8
// Light Steel Blue: #B0C4DE
// Powder Blue: #B0E0E6
// Pale Goldenrod: #EEE8AA
// Khaki: #F0E68C
// Rosy Brown: #BC8F8F
// Indian Red: #CD5C5C
// Salmon: #FA8072
// Dark Khaki: #BDB76B
// Tan: #D2B48C
// Burlywood: #DEB887
// Sandy Brown: #F4A460
// Dark Salmon: #E9967A
// Light Coral: #F08080

// Peach Puff: #FFDAB9

export const getColorScheme: (
    palette: AppPalette
) => Record<string, { light: string; dark: string; text_light: string; text_dark: string }> = (
    palette
) => ({
    slate_gray: {
        light     : '#cef4f3',
        dark      : '#4A6A6B',
        text_light: '#4A6A6B',
        text_dark : '#cef4f3'
    },
    steel_blue: {
        light     : '#8ec9f9',
        dark      : '#2C5177',
        text_light: '#2C5177',
        text_dark : '#8ec9f9'
    },
    cadet_blue: {
        light     : '#88dfe2',
        dark      : '#3C6D73',
        text_light: '#3C6D73',
        text_dark : '#88dfe2'
    },
    dark_sea_green: {
        light     : '#b6f0b6',
        dark      : '#5F8C5F',
        text_light: '#5F8C5F',
        text_dark : '#b6f0b6'
    },
    medium_turquoise: {
        light     : '#56f7f2',
        dark      : '#2C8385',
        text_light: '#2C8385',
        text_dark : '#56f7f2'
    },
    thistle: {
        light     : '#ffe4ff',
        dark      : '#816781',
        text_light: '#816781',
        text_dark : '#ffe4ff'
    },
    light_steel_blue: {
        light     : '#cde2ff',
        dark      : '#5f748d',
        text_dark : '#cde2ff',
        text_light: '#5f748d'
    },
    powder_blue: {
        light     : '#c4f8ff',
        dark      : '#6EA2A8',
        text_light: '#6EA2A8',
        text_dark : '#c4f8ff'
    },
    pale_goldenrod: {
        light     : '#fffcd6',
        dark      : '#979462',
        text_light: '#979462',
        text_dark : '#fffcd6'
    },
    khaki: {
        light     : '#f5eda8',
        dark      : '#898549',
        text_light: '#898549',
        text_dark : '#f5eda8'
    },
    rosy_brown: {
        light     : '#f7c0c0',
        dark      : '#805C5C',
        text_dark : '#f7c0c0',
        text_light: '#805C5C'
    },
    indian_red: {
        light     : '#fe8484',
        dark      : '#763434',
        text_dark : '#fe8484',
        text_light: '#763434'
    },
    salmon: {
        light     : '#faa298',
        dark      : '#71372f',
        text_dark : '#faa298',
        text_light: '#71372f'
    },
    dark_khaki: {
        light     : '#BDB76B',
        dark      : '#686137',
        text_dark : '#BDB76B',
        text_light: '#686137'
    },
    tan: {
        light     : '#dfc29d',
        dark      : '#6d5b45',
        text_dark : '#dfc29d',
        text_light: '#6d5b45'
    },
    burlywood: {
        light     : '#f8d6a9',
        dark      : '#7c6147',
        text_dark : '#f8d6a9',
        text_light: '#7c6147'
    },
    sandy_brown: {
        light     : '#F4A460',
        dark      : '#714729',
        text_dark : '#F4A460',
        text_light: '#714729'
    },
    dark_salmon: {
        light     : '#f99f82',
        dark      : '#663b32',
        text_dark : '#f99f82',
        text_light: '#663b32'
    },
    light_coral: {
        light     : '#e57a7a',
        dark      : '#5e2f2f',
        text_dark : '#e57a7a',
        text_light: '#5e2f2f'
    },
    peach_puff: {
        light     : '#fbdec5',
        dark      : '#816b54',
        text_dark : '#fbdec5',
        text_light: '#816b54'
    },
    default: {
        light     : palette.semantic.foreground.secondary,
        dark      : palette.semantic.foreground.secondary,
        text_dark : palette.semantic.text.primary,
        text_light: palette.semantic.text.primary
    }
});
const renderColors = (color: string, mode: 'light' | 'dark', palette: AppPalette) => {
    const colorSchema = getColorScheme(palette);

    return colorSchema[color]?.[mode] || palette.semantic.foreground.secondary;
};

const renderTextColors = (color: string, mode: 'light' | 'dark', palette: AppPalette) => {
    const colorSchema = getColorScheme(palette);

    return colorSchema[color]?.[`text_${mode}`] || palette.semantic.text.primary;
};

type Props = {
    col: TableTypes.HeadlineCell;
    mode: 'light' | 'dark';
    hasSticky: boolean;
};

export default function TableHeadlineCell({
    col,
    mode,
    hasSticky
}: Props) {
    const { palette } = useTheme();
    return (
        <div
            style={{
                fontSize      : '0.875rem',
                display       : 'flex',
                flexDirection : 'row',
                justifyContent: 'center',
                alignItems    : 'center',
                fontWeight    : 600,
                borderLeft    : hasSticky ? 'none' : `1px solid ${palette.semantic.border.secondary}`,
                color         : renderTextColors(col.color, mode, palette),
                margin        : 0,
                width         : col.width,
                minWidth      : col.width,
                maxWidth      : col.width,
                borderRight   : col.border_right
                    ? `2px solid ${palette.semantic.border.secondary}`
                    : 'none',
                borderBottom: `1px solid ${palette.semantic.border.secondary}`,

                backgroundColor: renderColors(col.color, mode, palette)
            }}
        >
            {col.name}
        </div>
    );
}
