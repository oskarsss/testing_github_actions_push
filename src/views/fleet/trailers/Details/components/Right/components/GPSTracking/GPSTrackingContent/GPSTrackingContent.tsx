import TrackingInfo from '@/views/fleet/trailers/Details/components/Right/components/GPSTracking/GPSTrackingContent/TrackingInfo';
import GPSTrackingMap from '@/views/fleet/drivers/Details/components/Right/components/GPSTraking/GPSTrackingContent/GPSTrackingMap/GPSTrackingMap';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';

type Props = {
    lon?: number;
    lat?: number;
    icon: string;
    integration_provide_id?: string;
    timestamp?: number;
};

export default function GPSTrackingContent({
    lon,
    lat,
    icon,
    integration_provide_id,
    timestamp
}: Props) {
    return (
        <>
            {integration_provide_id && timestamp && (
                <TrackingInfo
                    integration_provide_id={integration_provide_id}
                    timestamp={timestamp}
                />
            )}

            <RightStyled.GPSTrackingMapWrap>
                <GPSTrackingMap
                    lat={lat}
                    lon={lon}
                    icon={icon}
                />
            </RightStyled.GPSTrackingMapWrap>
        </>
    );
}
