/* eslint-disable no-mixed-operators */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import CenterStyled from '@/views/fleet/drivers/Details/components/Center/styled';
import Map from '@/views/fleet/drivers/Details/components/Center/tabs/Map/Map';
import MapEmptyScreen from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/MapEmptyScreen';
import DriversTypes from '@/store/fleet/drivers/types';
import {
    ListenReply_DriverDeviceLocations,
    ListenReply_TrailerLocations,
    ListenReply_TruckLocations
} from '@proto/events_serv';
import TrailersTypes from '@/store/fleet/trailers/types';
import { useDriverDevices } from '@/store/fleet/drivers/hooks';

type Props = {
    driver_id?: DriversTypes.Driver['driverId'];
    driver_full_name?: string;
    driverLocations?: Record<string, ListenReply_DriverDeviceLocations['locations'][0]>;
    truckLocation?: ListenReply_TruckLocations['locations'][0];
    trailerLocation?: ListenReply_TrailerLocations['locations'][0];
    truck_model?: string;
    trailer_reference_id?: TrailersTypes.Trailer['referenceId'];
    type: 'driver' | 'truck' | 'trailer';
};

export default function MapWrapper({
    driver_id,
    driver_full_name,
    truck_model,
    trailer_reference_id,
    trailerLocation,
    driverLocations,
    truckLocation,
    type
}: Props) {
    const { devices } = useDriverDevices(driver_id);

    const showMap =
        (devices && devices.length > 0) || trailerLocation || driverLocations || truckLocation;

    return (
        <CenterStyled.Map>
            {/* <CenterStyled.MapHeader> */}
            {/*     <PageHeadersKit.DateRange */}
            {/*         label="" */}
            {/*         field="" */}
            {/*         date={[]} */}
            {/*         filter_id="map" */}

            {/*         // temporary solution */}
            {/*     /> */}
            {/*     <CenterStyled.MapHeaderButtons> */}
            {/*         <Button */}
            {/*             startIcon={<RefreshIcon />} */}
            {/*             variant="outlined" */}
            {/*         > */}
            {/*             Reset Filters */}
            {/*         </Button> */}
            {/*         <Button */}
            {/*             startIcon={<PlaceIcon />} */}
            {/*             variant="contained" */}
            {/*         > */}
            {/*             Current */}
            {/*         </Button> */}
            {/*     </CenterStyled.MapHeaderButtons> */}
            {/* </CenterStyled.MapHeader> */}

            {showMap ? (
                <Map
                    driver_id={driver_id}
                    driver_full_name={driver_full_name}
                    devices={devices}
                    truckLocation={truckLocation}
                    driverLocations={driverLocations}
                    trailerLocation={trailerLocation}
                    truck_model={truck_model}
                    trailer_reference_id={trailer_reference_id}
                    type={type}
                />
            ) : (
                <MapEmptyScreen />
            )}
        </CenterStyled.Map>
    );
}
