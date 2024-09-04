import { useAppTranslation } from '@/hooks/useAppTranslation';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { StatusChip } from '@/@core/theme/chip';
import { TRUCK_STATUS_COLORS } from '@/@core/theme/entities/truck/status';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import TrucksTypes from '@/store/fleet/trucks/types';
import ListItem from '@mui/material/ListItem';
import { memo } from 'react';
import AssignTypes from '@/@core/components/assign/types';
import { TruckModel_Truck } from '@proto/models/model_truck';
import {
    TRUCK_STATUS_TO_LOCALE,
    TRUCK_TYPE_TO_GRPC_REVERSE_ENUM
} from '@/models/fleet/trucks/trucks-mappings';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';

type Props = AssignTypes.OptionProps<TruckModel_Truck>;

const TruckOption = ({
    onClickOption,
    option,
    selectedOptionId,
    onKeyDown,
    setOptionRef
}: Props) => {
    const { t } = useAppTranslation('state_info');
    const trailer = useTrailerById(option.trailerId);
    const trailerType = useTrailersTypesMap(trailer?.trailerTypeId || '');
    return (
        <ListItem
            tabIndex={0}
            onKeyDown={onKeyDown}
            ref={setOptionRef}
            onClick={() => onClickOption(option)}
            selected={selectedOptionId === option.truckId}
            disabled={selectedOptionId === option.truckId}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
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
                            width="100%"
                        >
                            <Typography variant="body1">#{option.referenceId}</Typography>

                            {trailerType && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                >
                                    ({getTrailerTypeIcon(trailerType?.icon || 0)}
                                    <Typography variant="body1">
                                        {trailerType.name || ''})
                                    </Typography>
                                </Stack>
                            )}
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
                    status={t(`trucks.status.${TRUCK_STATUS_TO_LOCALE[option.status]}`)}
                />
            </Stack>
        </ListItem>
    );
};

export default memo(TruckOption);
