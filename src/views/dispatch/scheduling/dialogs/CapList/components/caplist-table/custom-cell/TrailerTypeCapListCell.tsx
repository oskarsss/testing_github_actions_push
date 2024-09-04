import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import React from 'react';
import TypeCell from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/custom-cell/TypeCell';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    trailerTypeId: string;
};

export default function TrailerTypeCapListCell({ trailerTypeId }: Props) {
    const trailersTypeMap = useTrailersTypesMap();
    const trailerType = trailersTypeMap[trailerTypeId];
    const { t } = useAppTranslation('state_info');

    const sliceName = (str?: string | null) => {
        if (!str) return '';
        const arr = str.split(' ');
        if (arr.length > 1) {
            return `${arr[0]} ${arr[1]}`;
        }
        return str;
    };

    return (
        <TypeCell
            icon={getTrailerTypeIcon(trailerType?.icon || 0)}
            name={sliceName(trailerType?.name) || t('trailers.po')}
        />
    );
}
