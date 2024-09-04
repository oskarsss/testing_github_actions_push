import VectorIcons from '@/@core/icons/vector_icons';
import { PLATE_STATUS_COLORS, PLATE_STATUS_ICONS } from '@/@core/theme/entities/plate/status';
import { PlateStatus } from '@/models/fleet/plates/plate-status';
import { useActivePlatesCompanies } from '@/store/fleet/plates/hooks';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Icon from '../filter-button/Icon';
import { $Filter } from '../utils';

const statusOrder: PlateStatus[] = ['active', 'pending_cancellation', 'cancelled'];

export const PLATE_STATUS_FILTER_CONFIG = $Filter.configure<PlateStatus>((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            statusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={PLATE_STATUS_COLORS[status]}
                        icon={PLATE_STATUS_ICONS[status]}
                    />,
                    t(`state_info:plates.status.${status}`)
                ),
                searchValue: t(`state_info:plates.status.${status}`),
                value      : status,
                count      : counts?.[status]
            })),
        [counts, t]
    );

    return { filterItems, label: 'common:status' as const };
});

const truckTypeOrder: ('truck' | 'trailer' | 'empty')[] = ['empty', 'truck', 'trailer'];

const icons = {
    truck  : <VectorIcons.NavIcons.Truck />,
    trailer: <VectorIcons.NavIcons.Trailer />
};

export const PLATE_VEHICLE_TYPE_FILTER_CONFIG = $Filter.configure((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            truckTypeOrder.map((type) => ({
                label: $Filter.createLabel(
                    type !== 'empty' && (
                        <Icon
                            color="blue_dark"
                            icon={icons[type]}
                        />
                    ),
                    t(`state_info:plates.vehicle_type.${type}`)
                ),
                searchValue: t(`state_info:plates.vehicle_type.${type}`),
                value      : type,
                count      : counts?.[type]
            })),
        [counts, t]
    );

    return { filterItems, label: 'core:filters.labels.vehicle_type' as const };
});

export const PLATE_COMPANY_FILTER_CONFIG = $Filter.configure((counts) => {
    const { companies } = useActivePlatesCompanies();

    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(companies, 'plateCompanyId', 'name', counts)
                .map(({
                    plateCompanyId,
                    name: label
                }) => ({
                    label,
                    searchValue: label ?? '',
                    value      : plateCompanyId,
                    count      : counts?.[plateCompanyId]
                })),
        [counts, companies]
    );

    return { filterItems, label: 'core:filters.labels.company' as const };
});
