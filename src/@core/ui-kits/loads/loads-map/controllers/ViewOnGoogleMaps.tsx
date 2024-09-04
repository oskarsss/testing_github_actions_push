import React from 'react';
import Image from 'next/image';
import { Tooltip } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import GoogleMapsIcon from '../../../../../../public/images/icons/loads/Google_Maps_icon.svg';
import LoadMapStyled from '../../../../../views/dispatch/orders/Details/sections/load-map/LoadMap.styled';

type Props = {
    coordinates: string[];
};
export default function ViewOnGoogleMaps({ coordinates }: Props) {
    const { t } = useAppTranslation();
    const onOpenGoogleMaps = () => {
        if (coordinates?.length) {
            if (!coordinates.length) return;
            if (coordinates.length === 1) {
                window.open(`https://maps.google.com/?q=${coordinates[0]}`);
                return;
            }
            const openMap = (first: string, last: string, waypoints?: string) => {
                const BASE_URL = 'https://www.google.com/maps/dir/';
                window.open(
                    `${BASE_URL}?api=1&origin=${first}&destination=${last}&travelmode=driving${
                        waypoints ? `&waypoints=${waypoints}` : ''
                    }`
                );
            };
            if (coordinates.length === 2) {
                openMap(coordinates[0], coordinates[1]);
                return;
            }
            openMap(
                coordinates[0],
                coordinates[coordinates.length - 1],
                coordinates.slice(1, coordinates.length - 1).join('%7C')
            );
        }
    };

    return (
        <Tooltip title={t('core:basic.google_maps_btn.tooltip')}>
            <LoadMapStyled.ViewInGoogleMaps onClick={onOpenGoogleMaps}>
                <Image
                    src={GoogleMapsIcon}
                    width={16}
                    height={16}
                    alt="google maps icon"
                />
            </LoadMapStyled.ViewInGoogleMaps>
        </Tooltip>
    );
}
