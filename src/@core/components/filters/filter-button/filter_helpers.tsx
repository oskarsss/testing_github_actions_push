import * as React from 'react';
import { ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import type { TFunction } from '@/@types/next-intl';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import Avatar from '@mui/material/Avatar';
import EntitiyFilters from '@/@core/components/filters/filter-button/types';
import { getPublicURL } from '@/configs/storage';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';

import { Stack } from '@mui/material';
import { useDriverTypesMap, useTrailersTypesMap } from '@/store/hash_maps/hooks';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { FilterIdMap, FilterKeys, FilterTypeID, PhpFilterTypeToPbMap } from '../types';

const GAP = '6px';

export const mergeFilters = (
    filters: EntitiyFilters.FiltersList | FilterKeys[],
    filters_count?: EntitiyFilters.FiltersList
): EntitiyFilters.MergedFilters => {
    const filterCountsMap = filters_count?.reduce((acc, f) => {
        const filterId = f?.filterId ?? f.filter_id;
        if (typeof filterId === 'string') {
            acc[FilterIdMap[PhpFilterTypeToPbMap[filterId]]] = f;
            return acc;
        }
        acc[FilterIdMap[filterId as FilterTypeID]] = f;
        return acc;
    }, {} as Record<string, EntitiyFilters.Filter>);

    const formatted_filters = filters.map((f) => {
        const id = typeof f === 'string' ? f : f.filter_id;

        return {
            ...filterCountsMap?.[id ?? ''],
            ...(typeof f === 'string' ? { filter_id: f } : f)
        };
    });

    return formatted_filters;
};

const TrailerTypeLabel = ({ value }: { value?: string }) => {
    const trailerTypesMap = useTrailersTypesMap();
    return (
        <div
            style={{
                display       : 'flex',
                flexDirection : 'row',
                alignItems    : 'center',
                justifyContent: 'flex-start',
                gap           : GAP
            }}
        >
            label
            {getTrailerTypeIcon(!value ? 0 : trailerTypesMap?.[value]?.icon || 0)}
            <span>{!value ? 'Power Only' : trailerTypesMap?.[value]?.name || '-'}</span>
        </div>
    );
};

const DriverTypeLabel = ({ value = '' }: { value?: string }) => {
    const driverTypesMap = useDriverTypesMap();
    const icon = driverTypesMap[value]?.icon || DriverTypeModel_Icon.DEFAULT;
    const name = driverTypesMap[value]?.name || '';
    return (
        <div
            style={{
                display       : 'flex',
                flexDirection : 'row',
                alignItems    : 'center',
                justifyContent: 'flex-start',
                gap           : GAP
            }}
        >
            {DRIVER_TYPE_ICONS[icon]}
            <span>{name}</span>
        </div>
    );
};

type AvatarProps = {
    type?: 'driver' | 'user';
    url: string | null | undefined;
    label: string | null;
};

export const AvatarFilterItem = ({
    type,
    url,
    label
}: AvatarProps) => {
    const result = usePrivateFileUrl(type === 'driver' ? url || '' : '');
    const src = type === 'driver' ? result.url : getPublicURL(url);
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
                alt={label || ''}
                src={src}
                sx={{ width: 22, height: 22, marginRight: GAP, fontSize: '12px' }}
            >
                {label?.split(' ')[0].charAt(0).toUpperCase()}
                {label?.split(' ')[1]?.charAt(0).toUpperCase()}
            </Avatar>
        </div>
    );
};

const TruckLabel = ({ value }: { value?: string }) => {
    const trucksMap = useTrucksMap();

    const truck = trucksMap[value || ''];

    if (!truck) return '';

    return (
        <Stack
            direction="row"
            gap={GAP}
        >
            {ENTITY_CHIP_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
            <span>{truck.referenceId}</span>
        </Stack>
    );
};

export const getLabel = (
    type: string,
    item: {
        label: string | null;
        value?: string;
        selfie_thumb_url?: string | null;
        amount?: string;
    },
    trans_prefix?: string,
    t?: TFunction
) => {
    switch (type) {
    case 'driver':
    case 'user':
        return (
            <div
                style={{
                    display       : 'flex',
                    flexDirection : 'row',
                    alignItems    : 'center',
                    justifyContent: 'flex-start'
                }}
            >
                {'selfie_thumb_url' in item && (
                    <AvatarFilterItem
                        type={type}
                        url={item.selfie_thumb_url}
                        label={item.label}
                    />
                )}
                {item.label}
            </div>
        );
    case 'trailer_type':
        return <TrailerTypeLabel value={item.value} />;
    case 'driver_type':
        return <DriverTypeLabel value={item.value} />;
    case 'truck':
        return <TruckLabel value={item.value} />;
    default:
        if (trans_prefix && t) {
            // @ts-ignore
            return `${t(`${trans_prefix}${item.label}`)}${
                item.amount ? ` (${item.amount})` : ''
            }`;
        }
        return `${item.label}${item.amount ? ` (${item.amount})` : ''}`;
    }
};
