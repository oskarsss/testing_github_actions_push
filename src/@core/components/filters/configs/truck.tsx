import { TRUCK_STATUS_COLORS, TRUCK_STATUS_ICONS } from '@/@core/theme/entities/truck/status';
import { TruckStatus } from '@/models/fleet/trucks/truck-status';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TruckType } from '@/models/fleet/trucks/truck-type';
import { TRUCK_TYPE_COLORS, TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { useTags } from '@/store/tags/hooks';
import { useActiveTrucks } from '@/store/fleet/trucks/hooks';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { $Filter } from '../utils';
import Icon from '../filter-button/Icon';

const statusOrder: TruckStatus[] = [
    'onboarding',
    'active',
    'compliance_review',
    'pending_termination',
    'terminated',
    'inactive',
    'deleted'
];

export const TRUCK_STATUS_FILTER_CONFIG = $Filter.configure<TruckStatus>((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            statusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={TRUCK_STATUS_COLORS[status]}
                        icon={TRUCK_STATUS_ICONS[status]}
                    />,
                    t(`state_info:trucks.status.${status}`)
                ),
                searchValue: t(`state_info:trucks.status.${status}`),
                value      : status,
                count      : counts?.[status]
            })),
        [counts, t]
    );

    const customTotalCount = useMemo(() => $Filter.excludeDelete(statusOrder, counts), [counts]);

    return { filterItems, label: 'common:status' as const, customTotalCount };
});

const truckTypeOrder: TruckType[] = ['owner_operator', 'owned', 'leased'];

export const TRUCK_TYPE_FILTER_CONFIG = $Filter.configure<TruckType>((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            truckTypeOrder.map((type) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={TRUCK_TYPE_COLORS[type]}
                        icon={TRUCK_TYPE_ICONS[type]}
                    />,
                    t(`state_info:trucks.type.${type}`)
                ),
                searchValue: t(`state_info:trucks.type.${type}`),
                value      : type,
                count      : counts?.[type]
            })),
        [counts, t]
    );

    return { filterItems, label: 'common:type' as const };
});

export const TRUCK_TAGS_FILTER_CONFIG = $Filter.configure<string>((counts) => {
    const { tags } = useTags('TRUCK');
    const filterItems = useMemo(
        () =>
            $Filter.sortItemsByCount(tags, 'tagId', 'name', counts).map(({
                tagId,
                name
            }) => ({
                label      : name,
                searchValue: name,
                value      : tagId,
                count      : counts?.[tagId]
            })),
        [counts, tags]
    );

    return { filterItems, label: 'core:filters.labels.tags' as const };
});

export const TRUCK_FILTER_CONFIG = $Filter.configure((counts) => {
    const { trucks } = useActiveTrucks();
    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(trucks, 'truckId', 'referenceId', counts)
                .map(({
                    truckId,
                    referenceId: label,
                    type
                }) => ({
                    label: $Filter.createLabel(
                        <Icon
                            icon={TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[type]]}
                            color={TRUCK_TYPE_COLORS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[type]]}
                        />,
                        label
                    ),
                    searchValue: label ?? '',
                    value      : truckId,
                    count      : counts?.[truckId]
                })),
        [counts, trucks]
    );

    return { filterItems, label: 'entity:truck' as const };
});
