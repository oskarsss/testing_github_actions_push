import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useMemo } from 'react';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import {
    MANIFEST_STATUS_GRPC_COLORS,
    MANIFEST_STATUS_GRPC_ICONS
} from '@/@core/theme/entities/manifests/status';
import { FORMATTED_MANIFEST_STATUS, manifestStatuses } from '@/models/manifests/mapping';
import { $Filter } from '../utils';
import Icon from '../filter-button/Icon';

const statusOrder: ManifestModel_Status[] = [
    ManifestModel_Status.ASSIGNED,
    ManifestModel_Status.PLANNING,
    ManifestModel_Status.IN_PROGRESS,
    ManifestModel_Status.DELIVERED,
    ManifestModel_Status.CANCELED,
    ManifestModel_Status.DELETED,
    ManifestModel_Status.TONU
];

export const MANIFEST_STATUS_FILTER_CONFIG = $Filter.configure<manifestStatuses>((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            statusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={MANIFEST_STATUS_GRPC_COLORS[status]}
                        icon={MANIFEST_STATUS_GRPC_ICONS[status]}
                    />,
                    t(`state_info:manifests.status.${status}`)
                ),
                searchValue: t(`state_info:manifests.status.${status}`),
                value      : FORMATTED_MANIFEST_STATUS[status],
                count      : counts?.[FORMATTED_MANIFEST_STATUS[status]] || 0
            })),
        [counts, t]
    );

    const customTotalCount = useMemo(() => $Filter.excludeDelete(statusOrder, counts), [counts]);

    return { filterItems, label: 'common:status' as const, customTotalCount };
});
