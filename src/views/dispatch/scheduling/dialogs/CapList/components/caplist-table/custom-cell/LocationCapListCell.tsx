import CapListStyled from '@/views/dispatch/scheduling/dialogs/CapList/styled';
import LocationDisabledIcon from '@mui/icons-material/LocationDisabled';
import GpsFixed from '@mui/icons-material/GpsFixed';
import React from 'react';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';
import { filterTruckI } from '@/views/dispatch/scheduling/dialogs/CapList/helpers';
import { TruckModel_Availability_EmptyAtType } from '@proto/models/model_truck';
import { InTransitIcon } from '@/@core/theme/entities/load/load_status_icons';
import { Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    row: filterTruckI;
};

export default function LocationCapListCell({ row }: Props) {
    const { t } = useAppTranslation('common');
    const location = useLocationFleet(row.driver_id || '', row.truckId);

    if (row.emptyAtType === TruckModel_Availability_EmptyAtType.dropoff) {
        const address = row.dropoffLocation?.city
            ? `${row.dropoffLocation?.city}, ${row.dropoffLocation?.state}`
            : t('empty.no_location');

        return (
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <InTransitIcon size={24} />
                <CapListStyled.MainTextCell>{address}</CapListStyled.MainTextCell>
            </Stack>
        );
    }

    const no_location = !location.lon && !location.lat;
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <CapListStyled.LocationIconWrapper
                noLocation={no_location}
                currentLocation={location.location_current}
            >
                {no_location ? <LocationDisabledIcon /> : <GpsFixed />}
            </CapListStyled.LocationIconWrapper>

            {no_location ? (
                <CapListStyled.MainTextCell>{t('empty.no_location')}</CapListStyled.MainTextCell>
            ) : (
                <Stack>
                    <CapListStyled.MainTextCell>
                        {location.address || t('empty.no_address_found')}
                    </CapListStyled.MainTextCell>

                    {location.location_age && (
                        <CapListStyled.SecondaryTextCell>
                            {location.location_age}
                        </CapListStyled.SecondaryTextCell>
                    )}
                </Stack>
            )}
        </Stack>
    );
}
