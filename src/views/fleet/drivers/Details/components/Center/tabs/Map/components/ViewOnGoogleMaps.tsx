import Image from 'next/image';
import GoogleMapsIcon from '@/../public/images/icons/loads/Google_Maps_icon.svg';
import { useCallback } from 'react';
import { useAppSelector } from '@/store/hooks';
import LoadMapStyled from '@/views/dispatch/orders/Details/sections/load-map/LoadMap.styled';

export default function ViewOnGoogleMaps() {
    const coordinates = useAppSelector((state) => state.drivers.coordinates);
    const first_render_coordinates = useAppSelector(
        (state) => state.drivers.first_render_coordinates
    );

    const onOpenGoogleMaps = useCallback(() => {
        const [lon, lat] = coordinates;
        window.open(
            `https://maps.google.com/?q=${lat || first_render_coordinates[1]},${
                lon || first_render_coordinates[0]
            }`
        );
    }, [coordinates, first_render_coordinates]);

    return (
        <LoadMapStyled.ViewInGoogleMaps onClick={onOpenGoogleMaps}>
            <Image
                src={GoogleMapsIcon}
                width={16}
                height={16}
                alt="google maps icon"
            />
        </LoadMapStyled.ViewInGoogleMaps>
    );
}
