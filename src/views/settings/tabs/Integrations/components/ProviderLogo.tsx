import { useTheme } from '@mui/material/styles';
import React, { CSSProperties } from 'react';

type Props = {
    srcLightMode: string;
    srcDarkMode: string;
    height?: CSSProperties['height'];
    style?: CSSProperties;
};

export default function ProviderLogo({
    srcLightMode,
    srcDarkMode,
    height = '27px',
    style = {}
}: Props) {
    const isDarkMode = useTheme().palette.mode === 'dark';
    const src = (isDarkMode ? srcDarkMode : srcLightMode) || srcLightMode;

    return (
        <div style={{ width: 'fit-content', display: 'flex' }}>
            <img
                src={src}
                alt="Provider Logo"
                height={height}
                style={{
                    objectFit: 'contain',
                    ...style
                }}
            />
        </div>
    );
}
