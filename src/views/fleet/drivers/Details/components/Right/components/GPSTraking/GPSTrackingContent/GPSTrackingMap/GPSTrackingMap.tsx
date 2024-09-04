import MapEmptyScreen from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/MapEmptyScreen';
import Map from './Map';

export type MapProps = {
    lat?: number;
    lon?: number;
    icon: string;
};

export default function GPSTrackingMap({
    lat,
    lon,
    icon
}: MapProps) {
    return lat && lon ? (
        <Map
            icon={icon}
            lat={lat}
            lon={lon}
        />
    ) : (
        <MapEmptyScreen />
    );
}
