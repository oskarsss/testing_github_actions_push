import { TRAILER_STATUS_COLORS, TRAILER_STATUS_ICONS } from '@/@core/theme/entities/trailer/status';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { TrailerStatus } from '@/models/fleet/trailers/trailer-status';
import { TrailerOwnershipType } from '@/models/fleet/trailers/trailer-type';
import {
    useActiveTrailers,
    useActiveTrailersCompanies,
    useAllTrailersTypes
} from '@/store/fleet/trailers/hooks';
import { useTags } from '@/store/tags/hooks';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRAILER_OWNERSHIP_TYPE_ICONS } from '@/@core/theme/entities/trailer/trailerOwnershipType';
import { FILTER_EMPTY_VALUE } from '../constants';
import Icon from '../filter-button/Icon';
import { $Filter } from '../utils';

const statusOrder: TrailerStatus[] = ['active', 'offline', 'deleted'];

export const TRAILER_STATUS_FILTER_CONFIG = $Filter.configure<TrailerStatus>((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            statusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={TRAILER_STATUS_COLORS[status]}
                        icon={TRAILER_STATUS_ICONS[status]}
                    />,

                    t(`state_info:trailers.status.${status}`)
                ),
                searchValue: t(`state_info:trailers.status.${status}`),
                value      : status,
                count      : counts?.[status]
            })),
        [counts, t]
    );

    const customTotalCount = useMemo(() => $Filter.excludeDelete(statusOrder, counts), [counts]);

    return { filterItems, label: 'common:status' as const, customTotalCount };
});

export const TRAILER_TYPE_FILTER_CONFIG = $Filter.configure((counts) => {
    const { types } = useAllTrailersTypes();
    const filterItems = useMemo(
        () =>
            $Filter.sortItemsByCount(types, 'trailerTypeId', 'name', counts).map((type) => ({
                label      : $Filter.createLabel(getTrailerTypeIcon(type.icon), type.name),
                searchValue: type.name,
                value      : type.trailerTypeId,
                count      : counts?.[type.trailerTypeId]
            })),
        [counts, types]
    );

    return { filterItems, label: 'common:type' as const };
});

const ownershipTypeOrder: TrailerOwnershipType[] = ['leased', 'owned', 'owner_operator'];

export const TRAILER_OWNERSHIP_TYPE_FILTER_CONFIG = $Filter.configure((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            ownershipTypeOrder.map((type) => ({
                label: $Filter.createLabel(
                    <Icon
                        icon={TRAILER_OWNERSHIP_TYPE_ICONS[type]}
                        color="gray"
                    />,
                    t(`state_info:trailers.ownership_type.${type}`)
                ),
                searchValue: t(`state_info:trailers.ownership_type.${type}`),
                value      : type,
                count      : counts?.[type]
            })),
        [counts, t]
    );

    return { filterItems, label: 'core:filters.labels.ownership_type' as const };
});

export const TRAILER_TAGS_FILTER_CONFIG = $Filter.configure((counts) => {
    const { tags } = useTags('TRAILER');
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

export const TRAILER_COMPANY_FILTER_CONFIG = $Filter.configure((counts) => {
    const { companies } = useActiveTrailersCompanies();
    const filterItems = useMemo(
        () =>
            [
                { name: 'None', trailerCompanyId: FILTER_EMPTY_VALUE },
                ...$Filter.sortItemsByCount(companies, 'trailerCompanyId', 'name', counts)
            ].map((company) => ({
                label      : company.name,
                searchValue: company.name,
                value      : company.trailerCompanyId,
                count      : counts?.[company.trailerCompanyId]
            })),
        [counts, companies]
    );

    return { filterItems, label: 'core:filters.labels.company' as const };
});

export const TRAILER_FILTER_CONFIG = $Filter.configure((counts) => {
    const { trailers } = useActiveTrailers();

    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(trailers, 'trailerId', 'referenceId', counts)
                .map(({
                    trailerId,
                    referenceId: trailer_friendly_id,
                    trailerType
                }) => ({
                    label: $Filter.createLabel(
                        getTrailerTypeIcon(trailerType?.icon || 0),
                        trailer_friendly_id
                    ),
                    searchValue: trailer_friendly_id?.toString() ?? '',
                    value      : trailerId,
                    count      : counts?.[trailerId]
                })),
        [counts, trailers]
    );

    return { filterItems, label: 'entity:trailer' as const };
});
