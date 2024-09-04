/* eslint-disable no-nested-ternary */
import { styled } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { ForegroundUtilityType } from '@/@core/theme/palette';

const badgeSize = {
    small: {
        height      : '20px',
        minWidth    : '20px',
        borderRadius: '4px',
        fontSize    : '12px',
        lineHeight  : 1.5,
        iconSize    : '16px'
    },
    medium: {
        height      : '26px',
        minWidth    : '26px',
        borderRadius: '5px',
        fontSize    : '14px',
        lineHeight  : 1.4,
        iconSize    : '18px'
    }
};

type ContainerProps = {
    size: 'small' | 'medium';
    variant: 'filled' | 'outlined';
    backgroundColor?: (theme: Theme) => string;
    textColor?: (theme: Theme) => string;
    borderColor?: (theme: Theme) => string;
    iconColor?: (theme: Theme) => string;
    utilityColor?: ForegroundUtilityType;
};

const BadgeContainer = styled('div')<ContainerProps>(
    ({
        theme,
        size,
        variant,
        backgroundColor,
        textColor,
        borderColor,
        iconColor,
        utilityColor
    }) => ({
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        gap           : '4px',
        borderRadius  : badgeSize[size].borderRadius,
        height        : badgeSize[size].height,
        minWidth      : badgeSize[size].minWidth,
        fontSize      : badgeSize[size].fontSize,
        lineHeight    : badgeSize[size].lineHeight,
        padding       : '0 6px',
        fontWeight    : 500,
        borderWidth   : '1px',
        borderStyle   : 'solid',
        borderColor   : 'transparent',
        overflow      : 'hidden',
        textOverflow  : 'ellipsis',
        whiteSpace    : 'nowrap',

        ...(variant === 'filled'
            ? {
                background: theme.palette.utility.foreground.blue_dark.secondary,
                color     : theme.palette.utility.text.blue_dark
            }
            : {
                color      : theme.palette.semantic.text.secondary,
                borderColor: theme.palette.semantic.border.primary,
                background : theme.palette.semantic.foreground.white.tertiary,
                boxShadow  : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
            }),

        ...(utilityColor && {
            background: theme.palette.utility.foreground[utilityColor].secondary,
            color     : theme.palette.utility.text[utilityColor]
        }),

        ...(backgroundColor && {
            background: backgroundColor(theme)
        }),
        ...(textColor && {
            color: textColor(theme)
        }),
        ...(borderColor && {
            borderColor: borderColor(theme)
        }),

        svg: {
            width : badgeSize[size].iconSize,
            height: badgeSize[size].iconSize,
            color : utilityColor
                ? theme.palette.utility.foreground[utilityColor].primary
                : iconColor
                    ? iconColor(theme)
                    : variant === 'filled'
                        ? theme.palette.utility.foreground.blue_dark.primary
                        : theme.palette.semantic.foreground.primary
        }
    })
);

type Props = {
    size?: 'small' | 'medium';
    variant?: 'filled' | 'outlined';
    text?: React.ReactNode;
    icon?: React.ReactNode;
    sx?: SxProps<Theme>;
    backgroundColor?: (theme: Theme) => string;
    textColor?: (theme: Theme) => string;
    borderColor?: (theme: Theme) => string;
    iconColor?: (theme: Theme) => string;
    children?: React.ReactNode;
    utilityColor?: ForegroundUtilityType;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Badge({
    size = 'small',
    variant = 'filled',
    backgroundColor,
    textColor,
    borderColor,
    iconColor,
    text,
    icon,
    sx,
    children,
    utilityColor,
    ...props
}: Props) {
    return (
        <BadgeContainer
            {...props}
            size={size}
            variant={variant}
            backgroundColor={backgroundColor}
            textColor={textColor}
            borderColor={borderColor}
            iconColor={iconColor}
            utilityColor={utilityColor}
            sx={sx}
        >
            {icon}
            {text && (
                <span
                    style={{
                        overflow    : 'inherit',
                        textOverflow: 'inherit',
                        whiteSpace  : 'inherit'
                    }}
                >
                    {text}
                </span>
            )}
            {children}
        </BadgeContainer>
    );
}
