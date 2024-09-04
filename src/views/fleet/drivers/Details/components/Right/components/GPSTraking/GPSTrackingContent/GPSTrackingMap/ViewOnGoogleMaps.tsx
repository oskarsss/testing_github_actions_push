import Image from 'next/image';
import GoogleMapsIcon from '@/../public/images/icons/loads/Google_Maps_icon.svg';
import { useCallback } from 'react';
import LoadMapStyled from '@/views/dispatch/orders/Details/sections/load-map/LoadMap.styled';

type Props = {
    lat: number;
    lon: number;
};
export default function ViewOnGoogleMaps({
    lat,
    lon
}: Props) {
    const onOpenGoogleMaps = useCallback(() => {
        window.open(`https://maps.google.com/?q=${lat},${lon}`);
    }, [lat, lon]);

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
