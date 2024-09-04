import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { StatusChip } from '@/@core/theme/chip';
import { TRAILER_STATUS_COLORS } from '@/@core/theme/entities/trailer/status';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRAILER_STATUS_GRPC } from '@/models/fleet/trailers/trailers-mappings';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { type Option } from '../ChipAutocomplete';

const TrailerOption: Option<TrailerModel_Trailer> = ({ option }) => {
    const trailerTypesMap = useTrailersTypesMap();
    const trailerType = trailerTypesMap[option.trailerTypeId];
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
        >
            <Stack direction="column">
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    {getTrailerTypeIcon(trailerType?.icon || 0)}
                    <Typography
                        variant="body1"
                        fontWeight={500}
                    >
                        #{option.referenceId}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    gap={1}
                >
                    <Typography
                        color="sematic.foreground.text.secondary"
                        fontSize="12px"
                        variant="body1"
                        sx={{
                            color: ({ palette }) => palette.semantic.text.secondary
                        }}
                    >
                        Year: {option.year} | Model: {option.model}
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
            >
                <StatusChip
                    color={TRAILER_STATUS_COLORS[TRAILER_STATUS_GRPC[option.status]]}
                    status={t(`state_info:trailers.status.${TRAILER_STATUS_GRPC[option.status]}`)}
                />
            </Stack>
        </Stack>
    );
};

export default TrailerOption;
