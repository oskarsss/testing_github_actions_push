import { styled, Theme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import React from 'react';
import ChipDotIcon from '@/@core/fields/chip-select/components/ChipDotIcon';
import { ForegroundUtilityType } from '../palette';

export type IChipColors = ForegroundUtilityType;

export const COLORS: Record<IChipColors, IChipColors> = {
    blue_dark: 'blue_dark',
    error    : 'error',
    success  : 'success',
    gray     : 'gray',
    indigo   : 'indigo',
    pink     : 'pink',
    purple   : 'purple',
    violet   : 'violet',
    warning  : 'warning',
    yellow   : 'yellow'
};

export type StatusChipStyledProps = {
    theme?: Theme;
    color: IChipColors;
};
export const StatusChipStyled = styled('div')(({
    theme,
    color
}: StatusChipStyledProps) => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center',
    fontWeight    : 600,

    paddingLeft : '10px',
    paddingRight: '10px',

    minHeight   : 22,
    borderRadius: 4,
    fontSize    : 12,
    background:

        // theme?.palette.isLight
        // ? CHIP_COLORS[color].backgroundColor
        // :
        theme?.palette.utility.foreground[color]?.secondary,
    color:

        // theme?.palette.isLight
        // ? CHIP_COLORS[color].color
        // :
        theme?.palette.utility.foreground[color]?.primary,
    span: {
        height      : 6,
        width       : 6,
        borderRadius: '50%',
        display     : 'inline-block',
        background:

            //  theme?.palette.isLight
            // ? CHIP_COLORS[color].color
            // :
            theme?.palette.utility.foreground[color]?.primary,
        margin: '0 4px 0 0'
    }
}));

type StatusChipProps = {
    color: IChipColors;
    status: string;
};

export const StatusChip = ({
    color,
    status: string
}: StatusChipProps) => (
    <StatusChipStyled color={color}>
        <span />
        {string}
    </StatusChipStyled>
);

export const StatusChipWithDot = ({
    color,
    status
}: StatusChipProps) => (
    <Stack
        direction="row"
        gap="4px"
        minHeight="20px"
        height="20px"
        padding="0px 6px"
        width="fit-content"
        alignItems="center"
        borderRadius="4px"
        sx={{
            fontWeight   : 500,
            fontSize     : '12px',
            lineHeight   : '18px',
            letterSpacing: '1%',
            background   : (theme) => theme?.palette.utility.foreground[color]?.secondary,
            color        : (theme) => theme?.palette.utility.foreground[color]?.primary,
            svg          : {
                fontSize: '14px'
            }
        }}
    >
        <ChipDotIcon />
        {status}
    </Stack>
);
