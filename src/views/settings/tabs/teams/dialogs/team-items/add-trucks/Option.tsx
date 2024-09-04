import React from 'react';
import { Stack, Typography } from '@mui/material';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { StatusChip } from '@/@core/theme/chip';
import { TRUCK_STATUS_COLORS } from '@/@core/theme/entities/truck/status';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import {
    TRUCK_STATUS_TO_LOCALE,
    TRUCK_TYPE_TO_GRPC_REVERSE_ENUM
} from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { Option } from '../ChipAutocomplete';

const TruckOption: Option<TruckModel_Truck> = ({ option }) => {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
        >
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <span>{TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[option.type]]}</span>
                <Stack direction="column">
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ width: '100%' }}
                    >
                        <Typography variant="body1">#{option.referenceId}</Typography>
                        {/* {option.trailerType && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                >
                                    ({getTrailerTypeIcon(option.trailerType.icon || 0)}
                                    <Typography variant="body1">
                                        {option.trailerType.name})
                                    </Typography>
                                </Stack>
                            )} */}
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <Typography variant="body2">{option.year}</Typography>
                        <Typography variant="body2">
                            {option.model.charAt(0).toUpperCase() + option.model.slice(1)}
                        </Typography>
                        <Typography variant="body2">
                            {option.make.charAt(0).toUpperCase() + option.make.slice(1)}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <StatusChip
                color={TRUCK_STATUS_COLORS[TRUCK_STATUS_TO_LOCALE[option.status]]}
                status={t(`state_info:trucks.status.${TRUCK_STATUS_TO_LOCALE[option.status]}`)}
            />
        </Stack>
    );
};

export default TruckOption;
