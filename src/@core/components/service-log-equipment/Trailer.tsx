import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { Typography, Stack } from '@mui/material';
import { memo } from 'react';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';

type Props = {
    trailerId: string;
    fontSize: string;
};

function Trailer({
    trailerId,
    fontSize
}: Props) {
    const trailer = useTrailerById(trailerId);
    const trailerType = useTrailersTypesMap(trailer?.trailerTypeId || '');

    if (!trailer) {
        return '-';
    }

    return (
        <Stack
            direction="row"
            display="flex"
            alignItems="center"
            gap="4px"
        >
            {getTrailerTypeIcon(trailerType?.icon || 0)}

            <Typography
                variant="body1"
                fontSize={fontSize}
                fontWeight={500}
            >
                {trailer.referenceId}
            </Typography>

            <Typography
                variant="body2"
                fontSize="inherit"
                fontWeight="inherit"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                l {trailer.make} {trailer.model}
            </Typography>
        </Stack>
    );
}

export default memo(Trailer);
