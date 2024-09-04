/* eslint-disable no-nested-ternary */

import moment from 'moment-timezone';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import isOnline from '@/utils/is-online';
import { getLocationColor } from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/utils';
import VectorIcons from '@/@core/icons/vector_icons';
import { FlyToPoint } from '@/views/dispatch/tracking/map';
import { useTranslation } from 'react-i18next';

const SIZE = {
    small: {
        iconSize     : '12px',
        containerSize: '16px'
    },
    medium: {
        iconSize     : '16px',
        containerSize: '24px'
    }
};

type Location = {
    address: string;
    timestamp: number;
    lat: number;
    lon: number;
};

type Props<L> = {
    size?: 'small' | 'medium';
    location: L | undefined;
    flyToPoint: FlyToPoint;
};

export default function LoadInfoControllerLocationBtn<L extends Location>({
    size = 'medium',
    location,
    flyToPoint
}: Props<L>) {
    const { t } = useTranslation();
    const onClickLocation = () => {
        if (!location) return;
        flyToPoint(location.lon, location.lat, 14);
    };

    const online = isOnline(location?.timestamp);
    const locationColor = getLocationColor(location, online);

    const tooltipText = location
        ? `${location.address} | ${moment(location.timestamp).fromNow()}`
        : t('common:empty.no_location');

    return (
        <Tooltip title={tooltipText}>
            <IconButton
                onClick={onClickLocation}
                sx={{
                    cursor         : location ? 'pointer' : 'default',
                    backgroundColor: (theme) =>
                        `${theme.palette.utility.foreground[locationColor].secondary} !important`,
                    borderRadius: '4px',
                    height      : SIZE[size].containerSize,
                    width       : SIZE[size].containerSize,
                    padding     : '0px',
                    transition  : 'background-color 0.3s',

                    ...(location && {
                        '&:hover': {
                            backgroundColor: (theme) =>
                                `${theme.palette.utility.foreground[locationColor].tertiary} !important`
                        }
                    })
                }}
            >
                {location ? (
                    <VectorIcons.CurrentLocationIcon
                        sx={{
                            height    : SIZE[size].iconSize,
                            width     : SIZE[size].iconSize,
                            transition: 'color 0.2s',
                            color     : (theme) =>
                                theme.palette.utility.foreground[locationColor].primary
                        }}
                    />
                ) : (
                    <VectorIcons.NoCurrentLocationIcon
                        sx={{
                            height    : SIZE[size].iconSize,
                            width     : SIZE[size].iconSize,
                            transition: 'color 0.2s',
                            color     : (theme) =>
                                theme.palette.utility.foreground[locationColor].primary
                        }}
                    />
                )}
            </IconButton>
        </Tooltip>
    );
}
