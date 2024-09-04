import { memo } from 'react';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { Typography, Stack } from '@mui/material';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';

type Props = {
    trailerId: string;
};

function Trailer({ trailerId }: Props) {
    const trailer = useTrailerById(trailerId);
    const trailerType = useTrailersTypesMap(trailer?.trailerTypeId || '');

    if (!trailer) return null;

    return (
        <Stack
            direction="row"
            gap="4px"
            alignItems="center"
            sx={{
                svg: {
                    height: '16px',
                    width : '16px'
                }
            }}
        >
            <Typography
                noWrap
                fontSize="12px"
                fontWeight={500}
                color="semantic.text.secondary"
            >
                l
            </Typography>

            {getTrailerTypeIcon(trailerType?.icon || 0)}

            <Typography
                variant="body1"
                fontSize="12px"
                fontWeight={500}
            >
                {trailer.referenceId}
            </Typography>
        </Stack>
    );
}

export default memo(Trailer);
