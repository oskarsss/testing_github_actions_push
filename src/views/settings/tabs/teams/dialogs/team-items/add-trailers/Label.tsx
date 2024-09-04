import React from 'react';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { Stack, Typography } from '@mui/material';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { type Label } from '../ChipAutocomplete';

const TrailerLabel: Label<TrailerModel_Trailer> = ({ option }) => {
    const trailerTypesMap = useTrailersTypesMap();
    const trailerType = trailerTypesMap[option.trailerTypeId];
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
        >
            {getTrailerTypeIcon(trailerType?.icon || 0)}

            <Typography
                fontSize="12px"
                variant="body1"
                fontWeight={400}
            >
                #{option.referenceId}
            </Typography>
        </Stack>
    );
};

export default TrailerLabel;
