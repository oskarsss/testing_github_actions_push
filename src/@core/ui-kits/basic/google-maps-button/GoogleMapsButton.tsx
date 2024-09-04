import React, { CSSProperties } from 'react';
import Image, { ImageProps } from 'next/image';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { SxProps, Theme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import GoogleMapsIcon from '../../../../../public/images/icons/loads/Google_Maps_icon.svg';

type Props = {
    lat: number | undefined;
    lon: number | undefined;
    width?: ImageProps['width'];
    height?: ImageProps['height'];
    tooltip?: IntlMessageKey;
    padding?: CSSProperties['padding'];
    sx?: SxProps<Theme>;
};

export default function GoogleMapsButton({
    lat,
    lon,
    width = 12,
    height = 12,
    tooltip = 'core:basic.google_maps_btn.tooltip',
    padding = '2px',
    sx
}: Props) {
    const { t } = useAppTranslation();
    if (!lat || !lon) return null;
    const openGoogleMaps = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        window.open(`http://maps.google.com/?q=${lat},${lon}`);
    };

    return (
        <Tooltip title={t(tooltip)}>
            <IconButton
                sx={{ padding, ...sx }}
                onClick={openGoogleMaps}
            >
                <Image
                    src={GoogleMapsIcon}
                    width={width}
                    height={height}
                    alt="google maps icon"
                />
            </IconButton>
        </Tooltip>
    );
}
