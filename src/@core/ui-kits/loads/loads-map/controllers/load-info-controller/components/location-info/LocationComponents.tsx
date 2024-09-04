import { IconButton, Typography } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import moment, { MomentInput } from 'moment-timezone';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import getTimeAgo from '@/utils/get-time-ago';

const IconContainer = styled('div')(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    width          : '24px',
    height         : '24px',
    borderRadius   : '50%',
    flexShrink     : 0,
    backgroundColor: theme.palette.semantic.foreground.secondary,
    svg            : {
        flexShrink: 0,
        width     : '14px',
        height    : '14px',
        fill      : theme.palette.semantic.foreground.primary
    }
}));

const LocationIconButton = styled(IconButton)(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    width          : '16px',
    height         : '16px',
    borderRadius   : '4px',
    flexShrink     : 0,
    padding        : 0,
    backgroundColor: theme.palette.semantic.background.secondary,
    svg            : {
        flexShrink: 0,
        width     : '12px',
        height    : '12px'
    }
}));

type LocationProps = {
    color: 'blue_dark' | 'gray' | 'error';
    location?: string;
    disabled?: boolean;
    onClick?: () => void;
};

function Location({
    color,
    location,
    disabled = false,
    onClick
}: LocationProps) {
    const { t } = useAppTranslation();
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap="4px"
            overflow="hidden"
            flex="2 1 0"
        >
            <LocationIconButton
                onClick={!disabled ? onClick : undefined}
                disabled={disabled}
                sx={{
                    cursor         : disabled ? 'default' : 'pointer',
                    backgroundColor: (theme) =>
                        `${theme.palette.utility.foreground[color].secondary} !important`,

                    ...(!disabled && {
                        '&:hover': {
                            backgroundColor: (theme) =>
                                `${theme.palette.utility.foreground[color].tertiary} !important`
                        }
                    })
                }}
            >
                {!disabled ? (
                    <VectorIcons.CurrentLocationIcon
                        sx={{
                            height    : '12px',
                            width     : '12px',
                            transition: 'color 0.2s',
                            color     : (theme) => theme.palette.utility.foreground[color].primary
                        }}
                    />
                ) : (
                    <VectorIcons.NoCurrentLocationIcon
                        sx={{
                            height    : '12px',
                            width     : '12px',
                            transition: 'color 0.2s',
                            color     : (theme) => theme.palette.utility.foreground[color].primary
                        }}
                    />
                )}
            </LocationIconButton>
            <Typography
                variant="body2"
                fontSize="12px"
                fontWeight={500}
                lineHeight={1.5}
                noWrap
            >
                {location || t('common:empty.no_location')}
            </Typography>
        </Stack>
    );
}

function Time({ time }: { time: MomentInput }) {
    const { t } = useAppTranslation();

    const isValid = moment(time).seconds() !== 0;

    return (
        <Typography
            flex="1.1"
            variant="body2"
            fontSize="12px"
            fontWeight={500}
            noWrap
            flexShrink={0}
            lineHeight={1.5}
            textAlign="right"
        >
            {time && moment(time).isValid() && isValid ? getTimeAgo(time, t) : '-'}
        </Typography>
    );
}

function Row({
    children,
    alignItems = 'center',
    ...props
}: StackProps) {
    return (
        <Stack
            {...props}
            flexDirection="row"
            alignItems={alignItems}
            gap="8px"
            overflow="hidden"
        >
            {children}
        </Stack>
    );
}

function TitleColumn({ children }: { children: React.ReactNode }) {
    return (
        <Stack
            color="text.secondary"
            fontWeight="600"
            fontSize="12px"
            flexDirection="row"
            alignItems="center"
            overflow="hidden"
            flex="1.5 1 0"
        >
            {children}
        </Stack>
    );
}

type ProviderLogoProps = {
    light_logo_url: string;
    dark_logo_url: string;
    provider_name: string;
};

function ProviderLogo({
    light_logo_url,
    provider_name,
    dark_logo_url
}: ProviderLogoProps) {
    const isDarkMode = useTheme().palette.mode === 'dark';

    return (
        <img
            style={{
                maxWidth : '60px',
                width    : 'fit-content',
                height   : '14px',
                objectFit: 'contain'
            }}
            src={isDarkMode ? light_logo_url : dark_logo_url}
            alt={provider_name}
        />
    );
}

const LocationComponents = {
    Row,
    TitleColumn,
    Time,
    Location,
    IconContainer,
    ProviderLogo
};

export default LocationComponents;
