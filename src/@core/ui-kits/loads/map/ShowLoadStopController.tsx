import { Box, IconButton, Tooltip, createSvgIcon, useTheme } from '@mui/material';
import React from 'react';

type Props = {
    showOtherStops: boolean;
    setShowOtherStops: (value: boolean) => void;
    disabled?: boolean;
};

const Icon = createSvgIcon(
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 2C9.23858 2 7 4.23858 7 7C7 9.41896 8.71776 11.4367 11 11.9V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V11.9C15.2822 11.4367 17 9.41896 17 7C17 4.23858 14.7614 2 12 2Z"
            fill="currentColor"
        />
        <path
            d="M2 17C2 15.0158 4.3115 13.3016 7.66154 12.4938C8.07281 12.819 8.52146 13.099 9 13.3264V16C9 17.6568 10.3431 19 12 19C13.6569 19 15 17.6568 15 16V13.3264C15.4785 13.099 15.9272 12.819 16.3385 12.4938C19.6885 13.3016 22 15.0158 22 17C22 19.7614 17.5228 22 12 22C6.47715 22 2 19.7614 2 17Z"
            fill="currentColor"
        />
    </svg>,
    'ShowLoadStopIcon'
);

export default function ShowOtherStopsController({
    setShowOtherStops,
    showOtherStops,
    disabled
}: Props) {
    const { palette } = useTheme();
    return (
        <Tooltip
            disableInteractive
            title={showOtherStops ? 'Hide other stops' : 'Show other stops'}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                height="40px"
                width="40px"
                sx={{
                    backgroundColor: (theme) => theme.palette.semantic.background.white,
                    display        : 'flex',
                    alignItems     : 'center',
                    justifyContent : 'center',
                    pointerEvents  : 'auto',
                    borderRadius   : '8px'
                }}
            >
                <IconButton
                    disabled={disabled}
                    onClick={() => {
                        setShowOtherStops(!showOtherStops);
                    }}
                    sx={{
                        borderRadius: 'inherit',
                        width       : '100%',
                        height      : '100%'
                    }}
                >
                    <Icon
                        htmlColor={showOtherStops ? palette.semantic.foreground.brand.primary : ''}
                    />
                </IconButton>
            </Box>
        </Tooltip>
    );
}
