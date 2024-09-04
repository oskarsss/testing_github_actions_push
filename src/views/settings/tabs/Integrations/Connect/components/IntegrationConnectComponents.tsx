import Box from '@mui/material/Box';
import React, { PropsWithChildren } from 'react';
import { CircularProgress, Typography, Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function Container({ children }: PropsWithChildren) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            flex="1 1 100%"
            height="100vh"
        >
            {children}
        </Box>
    );
}

function Loading({ type }: { type: string }) {
    const { t } = useAppTranslation();
    return (
        <Stack position="relative">
            <CircularProgress
                sx={{
                    position  : 'absolute',
                    left      : '50%',
                    top       : '50%',
                    marginLeft: '-20px',
                    marginTop : '-70px'
                }}
            />
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center'
                }}
            >
                {`${type} ${t('settings:integrations.connect.connecting')}...`}
            </Typography>
        </Stack>
    );
}

type TitleWithButtonProps = {
    title: string;
    buttonText?: string;
    onClick?: () => void;
};

function TitleWithButton({
    title,
    buttonText,
    onClick
}: TitleWithButtonProps) {
    return (
        <Typography
            variant="h6"
            sx={{
                textAlign: 'center',
                position : 'relative'
            }}
        >
            {title}{' '}
            {buttonText && onClick && (
                <Typography
                    noWrap
                    variant="inherit"
                    color={(theme) => theme.palette.semantic.foreground.brand.primary}
                    fontWeight={500}
                    onClick={onClick}
                    sx={{
                        cursor   : 'pointer',
                        position : 'absolute',
                        left     : '50%',
                        bottom   : 0,
                        transform: 'translate(-50%, 100%)'
                    }}
                >
                    {buttonText}
                </Typography>
            )}
        </Typography>
    );
}

const IntegrationConnectComponents = {
    Container,
    Loading,
    TitleWithButton
};

export default IntegrationConnectComponents;
