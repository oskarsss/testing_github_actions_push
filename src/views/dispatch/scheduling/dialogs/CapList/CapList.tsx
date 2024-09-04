import React, { useMemo, useState } from 'react';
import moment from 'moment-timezone';
import { useAppTranslation } from '@/hooks/useAppTranslation';

import useCopyToClipboard from '@/utils/copy-to-clipboard';
import { menuHookFabric } from '@/utils/menu-hook-fabric';

import { useAppSelector } from '@/store/hooks';
import trucksAvailabilityService from '@/@grpcServices/services/trucks-availability.service';
import { TruckModel_Availability_EmptyAtType } from '@proto/models/model_truck';
import { filterTruckI, listDate } from '@/views/dispatch/scheduling/dialogs/CapList/helpers';
import HeaderCapList from '@/views/dispatch/scheduling/dialogs/CapList/components/HeaderCapList';
import TableCapList from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/TableCapList';
import { useLastDriversLocation } from '@/store/streams/events/hooks';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { Stack } from '@mui/material';
import MenuComponents from '@/@core/ui-kits/menus';
import Loading from '@/@core/components/page/Loading';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';

export const useCapListMenu = menuHookFabric(CapList, undefined, (props) => (
    <MenuComponents.MenuWrapper
        {...props}
        sx={{
            '.MuiMenu-paper': {
                borderRadius   : '8px',
                padding        : '6px 16px 16px 16px',
                minWidth       : '1060px',
                backgroundColor: ({ palette }) => palette.semantic.foreground.white.tertiary
            }
        }}
    />
));

export default function CapList() {
    const [selectedDate, setSelectedDate] = useState(0);
    const trailersMap = useTrailersMap();
    const trailersTypesMap = useTrailersTypesMap();
    const { t } = useAppTranslation();
    const copy = useCopyToClipboard();

    const {
        data,
        isLoading
    } = trucksAvailabilityService.useGetTrucksAvailabilityQuery(
        {},
        {
            pollingInterval: 20000
        }
    );

    const trucksMap = useTrucksMap();

    const trucks_locations = useAppSelector((state) => state.events.truckLocations);
    const drivers_locations = useLastDriversLocation();

    const filterTrucks: filterTruckI[][] = useMemo(() => {
        if (!data?.trucksAvailability?.length || !Object.keys(trucksMap).length) return [];
        const firstFilter: filterTruckI[] = [];
        data.trucksAvailability.forEach((item) => {
            const truck = trucksMap[item.truckId];
            if (!truck) {
                return;
            }
            const empty_at =
                // eslint-disable-next-line no-nested-ternary
                item.emptyAtType === TruckModel_Availability_EmptyAtType.current_location
                    ? null
                    : moment(item.emptyAt).isValid()
                        ? item.emptyAt
                        : null;
            const primaryDriverId = truck.drivers.find((ht) => ht.primary)?.driverId;

            firstFilter.push({
                ...item,
                truck_type        : TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type],
                truck_reference_id: truck.referenceId,
                trailer_type_id   : trailersMap[truck.trailerId]?.trailerTypeId || '',
                driver_id         : primaryDriverId || '',
                empty_at
            } as filterTruckI);
        });

        firstFilter.sort((a, b) => moment(b.empty_at).valueOf() - moment(a.empty_at).valueOf());

        return listDate.map((item) => {
            if (!item.date) return firstFilter;
            return firstFilter.filter((truck) => {
                if (!truck) return false;
                if (!truck.empty_at) return true;

                return moment(item.date).isSameOrAfter(moment(truck.empty_at), 'day');
            });
        });
    }, [data?.trucksAvailability, trucksMap, trailersMap]);

    const getRow = (item: filterTruckI) => {
        const truck_location = trucks_locations[item.truckId];
        const is_fleet_location =
            item.emptyAtType === TruckModel_Availability_EmptyAtType.current_location;

        const dropoff_address = item.dropoffLocation?.city
            ? `${item.dropoffLocation?.city}, ${item.dropoffLocation?.state}`
            : t('common:empty.no_location');

        let location =
            (is_fleet_location ? truck_location?.address : dropoff_address) ||
            t('common:empty.no_location');

        if (is_fleet_location) {
            const driver_location = drivers_locations.get(item.driver_id || '');
            if (driver_location && truck_location) {
                if (driver_location.timestamp > truck_location.timestamp) {
                    location = driver_location.address;
                }
            } else if (!truck_location && driver_location) {
                location = driver_location.address;
            }
        }

        // Truck Number | Location | Date Available | Trailer Type
        const formatDate = (date: string | null | undefined) =>
            date ? moment(date).format('M/DD H:mm') : t('common:now');

        const trailer_type_name =
            trailersTypesMap[item.trailer_type_id]?.name || t('state_info:trailers.po');
        const time = formatDate(item.empty_at);

        return `${t('entity:truck')} #${
            item.truck_reference_id
        } | ${location} | ${time} | ${trailer_type_name}`;
    };

    const onCopyRow = (item: filterTruckI) => {
        copy(getRow(item));
    };

    const onCopyAll = () => {
        if (!filterTrucks[selectedDate]?.length) return;
        const data = filterTrucks[selectedDate].map((item) => getRow(item));

        copy(data.length ? data.join('\n') : '');
    };

    const countData = useMemo(() => {
        const count: Record<number, number> = {};
        listDate.forEach((item) => {
            count[item.id] = filterTrucks[item.id]?.length || 0;
        });
        return count;
    }, [filterTrucks]);

    return (
        <Stack
            overflow="hidden"
            gap="12px"
            height="400px"
        >
            <HeaderCapList
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                onCopyAll={onCopyAll}
                countData={countData}
                disabledShareButton={!data?.trucksAvailability?.length}
            />

            {isLoading ? (
                <Loading />
            ) : (
                <TableCapList
                    trucks_list={filterTrucks[selectedDate] || []}
                    onCopyRow={onCopyRow}
                />
            )}
        </Stack>
    );
}
