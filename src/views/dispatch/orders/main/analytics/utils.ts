import React from 'react';
import { GetLoadsStatsReply_ActiveLoad } from '@proto/stats';
import { Theme } from '@mui/material/styles/createTheme';

export function hexToSemiTransparentHex(hex: string, alpha: number) {
    const new_hex = hex.replace(/^#/, '');

    const r = parseInt(new_hex.substring(0, 2), 16);
    const g = parseInt(new_hex.substring(2, 4), 16);
    const b = parseInt(new_hex.substring(4, 6), 16);

    const opacity = Math.round(alpha * 255)
        .toString(16)
        .toUpperCase();

    // eslint-disable-next-line no-bitwise
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}${opacity}`;
}

export type Item = {
    label: string;
    value: string;
    count: number;
    short_label?: string;
};

export const getActiveLoadsColors = (
    theme: Theme
): Record<GetLoadsStatsReply_ActiveLoad['value'], React.CSSProperties['backgroundColor']> => ({
    drafts     : theme.palette.semantic.foreground.primary,
    pending    : theme.palette.utility.foreground.yellow.primary,
    assigned   : theme.palette.utility.foreground.warning.primary,
    in_progress: theme.palette.colors.blue_dark[500]
});
