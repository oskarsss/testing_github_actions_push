import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { ComponentProps } from 'react';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';

type Props = {
    trailerId: string;
    badgeProps?: Partial<ComponentProps<typeof Badge>>;
};

export default function TrailerBadge({
    trailerId = '',
    badgeProps
}: Props) {
    const trailersMap = useTrailersMap();
    const trailerTypesMap = useTrailersTypesMap();

    const trailer = trailersMap[trailerId];
    const trailerType = trailerTypesMap[trailer?.trailerTypeId || ''];

    if (!trailer) return null;
    return (
        <Badge
            variant="filled"
            backgroundColor={(theme) => theme.palette.semantic.foreground.secondary}
            textColor={(theme) => theme.palette.semantic.text.primary}
            icon={getTrailerTypeIcon(trailerType?.icon || 0)}
            text={trailer.referenceId}
            {...(badgeProps || {})}
        />
    );
}
