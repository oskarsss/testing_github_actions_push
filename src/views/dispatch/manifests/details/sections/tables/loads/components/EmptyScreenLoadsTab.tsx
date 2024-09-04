import { createSvgIcon, Stack } from '@mui/material';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import React from 'react';

const CubeIcon = createSvgIcon(
    <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g opacity="0.3">
            <path
                d="M30.625 11.8393L18.9587 17.6725V31.4778L29.8816 25.3336C30.3408 25.0753 30.625 24.5894 30.625 24.0625V11.8393Z"
                fill="currentColor"
            />
            <path
                d="M16.042 31.4781V17.6725L4.375 11.839V24.0625C4.375 24.5894 4.65917 25.0753 5.11837 25.3336L16.042 31.4781Z"
                fill="currentColor"
            />
        </g>
        <path
            d="M18.215 3.10394C17.771 2.85423 17.229 2.85423 16.7851 3.10394L5.79297 9.28699L17.5003 15.1407L29.2074 9.28716L18.215 3.10394Z"
            fill="currentColor"
        />
    </svg>,
    'CubeIcon'
);

export default function EmptyScreenLoadsTab() {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            height="100%"
            position="relative"
        >
            <FallbackContent
                icon={(
                    <CubeIcon
                        sx={{
                            fontSize: '80px',
                            color   : (theme) => theme.palette.semantic.foreground.primary
                        }}
                    />
                )}
                firstText="common:empty.no_loads"
                size="medium"
            />
        </Stack>
    );
}
