import { DRIVER_STATUS_COLORS, DRIVER_STATUS_ICONS } from '@/@core/theme/entities/driver/status';
import { DRIVER_TYPE_COLORS, DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { DriverStatus } from '@/models/fleet/drivers/driver-status';
import { useActiveRevenueTypes } from '@/store/accounting/settlements/hooks/revenue_type';
import { useActiveDrivers, useDriversTypes } from '@/store/fleet/drivers/hooks';
import { useTags } from '@/store/tags/hooks';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';
import { DRIVER_STATUS_TO_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import Icon from '../filter-button/Icon';
import { AvatarFilterItem } from '../filter-button/filter_helpers';
import { $Filter } from '../utils';
import { FILTER_EMPTY_VALUE } from '../constants';

const statusOrder: DriverStatus[] = [
    'onboarding',
    'active',
    'compliance_review',
    'pending_termination',
    'terminated',
    'deleted'
];

export const DRIVER_STATUS_FILTER_CONFIG = $Filter.configure<DriverStatus>((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            statusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={DRIVER_STATUS_COLORS[DRIVER_STATUS_TO_GRPC_ENUM[status]]}
                        icon={DRIVER_STATUS_ICONS[DRIVER_STATUS_TO_GRPC_ENUM[status]]}
                    />,
                    t(`state_info:drivers.status.${status}`)
                ),
                searchValue: t(`state_info:drivers.status.${status}`),
                value      : status,
                count      : counts?.[status]
            })),
        [counts, t]
    );

    const customTotalCount = useMemo(() => $Filter.excludeDelete(statusOrder, counts), [counts]);

    return { filterItems, label: 'common:status' as const, customTotalCount };
});

export const DRIVER_TYPE_FILTER_CONFIG = $Filter.configure((counts) => {
    const { driverTypes } = useDriversTypes();
    const driverTypesMap = useDriverTypesMap();
    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(driverTypes, 'driverTypeId', 'name', counts)
                .map(({
                    driverTypeId,
                    name,
                    icon
                }) => ({
                    label: $Filter.createLabel(
                        <Icon
                            color={DRIVER_TYPE_COLORS[driverTypesMap[driverTypeId].icon]}
                            icon={DRIVER_TYPE_ICONS[icon]}
                        />,
                        name
                    ),
                    searchValue: name,
                    value      : driverTypeId,
                    count      : counts?.[driverTypeId]
                })),
        [counts, driverTypes]
    );

    return { filterItems, label: 'common:type' as const };
});

// Frontend counts example
export const DRIVER_SETTLEMENT_FILTER_CONFIG = $Filter.configure((counts) => {
    const { revenue_types } = useActiveRevenueTypes();
    const { drivers } = useActiveDrivers();

    const revenueDriverMap = useMemo(
        () =>
            drivers.reduce(
                (acc, driver) => {
                    if (!driver.settlementRevenueTypeId) {
                        acc[FILTER_EMPTY_VALUE] = (acc[FILTER_EMPTY_VALUE] ?? 0) + 1;
                        return acc;
                    }
                    acc[driver.settlementRevenueTypeId] =
                        (acc[driver.settlementRevenueTypeId] ?? 0) + 1;
                    return acc;
                },
                { [FILTER_EMPTY_VALUE]: 0 } as Record<string, number>
            ),
        [drivers]
    );

    const filterItems = useMemo(
        () =>
            [
                { revenueTypeId: FILTER_EMPTY_VALUE, name: 'Other' },
                ...$Filter.sortItemsByCount(revenue_types, 'revenueTypeId', 'name', counts)
            ].map(({
                revenueTypeId,
                name
            }) => ({
                label      : name,
                searchValue: name,
                value      : revenueTypeId,
                count      : counts?.[revenueTypeId] ?? revenueDriverMap[revenueTypeId] ?? 0
            })),
        [counts, revenue_types, revenueDriverMap]
    );

    return { filterItems, label: 'core:filters.labels.revenue_type' as const };
});

export const DRIVER_TAGS_FILTER_CONFIG = $Filter.configure((counts) => {
    const { tags } = useTags('DRIVER');

    const filterItems = useMemo(
        () =>
            $Filter.sortItemsByCount(tags, 'tagId', 'name', counts).map((tag) => ({
                label      : tag.name,
                searchValue: tag.name,
                value      : tag.tagId,
                count      : counts?.[tag.tagId]
            })),
        [counts, tags]
    );

    return { filterItems, label: 'core:filters.labels.tags' as const };
});

export const DRIVER_FILTER_CONFIG = $Filter.configure((counts?, amounts?) => {
    const { drivers } = useActiveDrivers();

    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(drivers, 'driverId', 'firstName', counts)
                .map(({
                    driverId,
                    selfieThumbUrl,
                    firstName,
                    lastName
                }) => {
                    const label = `${firstName} ${lastName}`;
                    return {
                        label: $Filter.createLabel(
                            <AvatarFilterItem
                                url={selfieThumbUrl}
                                label={label}
                                type="driver"
                            />,
                            label,
                            amounts?.[driverId] ? `(${amounts?.[driverId]})` : ''
                        ),
                        searchValue: label,
                        value      : driverId,
                        count      : counts?.[driverId]
                    };
                }),
        [counts, amounts, drivers]
    );

    return { filterItems, label: 'entity:driver' as const };
});
