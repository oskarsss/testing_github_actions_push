import React from 'react';
import { styled, Theme } from '@mui/material/styles';
import { IChipColors } from '@/@core/theme/chip';

type BadgeProps = {
    color: IChipColors;
    size?: number;
    theme?: Theme;
};

const StyledIcon = styled('div')(({
    theme,
    color,
    size
}: BadgeProps) => () => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center',

    svg: {
        fill: theme?.palette.utility.foreground[color]?.primary,
        ...(size
            ? {
                width : size,
                height: size
            }
            : {})
    }
}));

type Props = {
    icon: React.ReactNode;
    color: IChipColors;
    size?: number;
};

export default function Icon({
    icon,
    color,
    size
}: Props) {
    return (
        <StyledIcon
            color={color}
            size={size}
        >
            {icon}
        </StyledIcon>
    );
}
