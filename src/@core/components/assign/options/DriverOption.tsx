import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Stack, Avatar, Typography } from '@mui/material';
import { StatusChip } from '@/@core/theme/chip';
import { DRIVER_STATUS_COLORS } from '@/@core/theme/entities/driver/status';
import ListItem from '@mui/material/ListItem';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { DRIVER_STATUS_TO_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import type DriversTypes from '@/store/fleet/drivers/types';
import { memo } from 'react';
import type AssignTypes from '@/@core/components/assign/types';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';

type Props = AssignTypes.OptionProps<DriversTypes.ConvertedDriverRow>;

const DriverOption = ({
    option,
    onClickOption,
    selectedOptionId,
    setOptionRef,
    onKeyDown
}: Props) => {
    const driverType = useDriverTypesMap(option.driverType?.driverTypeId);
    const { t } = useAppTranslation();
    const { url } = usePrivateFileUrl(option.selfieThumbUrl);

    return (
        <ListItem
            tabIndex={0}
            onKeyDown={onKeyDown}
            ref={setOptionRef}
            onClick={() => onClickOption(option)}
            disabled={selectedOptionId === option.driverId}
            selected={selectedOptionId === option.driverId}
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
                    <Avatar
                        alt={`${option.firstName} ${option.lastName || ''}`}
                        src={url}
                        sx={{ width: 40, height: 40, marginRight: '10px', fontSize: '12px' }}
                    >
                        {option.firstName?.charAt(0).toUpperCase()}
                        {option.lastName?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Stack direction="column">
                        <Typography fontWeight={500}>
                            {`${option.firstName} ${option.lastName || ''}`}
                        </Typography>

                        <Stack
                            direction="row"
                            gap="4px"
                            alignItems="center"
                        >
                            {option.phoneNumber && (
                                <Typography variant="caption">
                                    {t('core:assign_menu.phone_number', {
                                        phoneNumber: option.phoneNumber
                                    })}
                                </Typography>
                            )}

                            {option.phoneNumber && driverType && (
                                <Typography variant="caption">l</Typography>
                            )}

                            {driverType && driverType.icon in DRIVER_TYPE_ICONS ? (
                                <Stack
                                    direction="row"
                                    gap="4px"
                                    sx={{
                                        svg: {
                                            height: '16px',
                                            width : '16px'
                                        }
                                    }}
                                >
                                    {DRIVER_TYPE_ICONS[driverType.icon]}

                                    <Typography variant="caption">{driverType.name}</Typography>
                                </Stack>
                            ) : (
                                '-'
                            )}
                        </Stack>
                    </Stack>
                </Stack>

                <StatusChip
                    color={DRIVER_STATUS_COLORS[DRIVER_STATUS_TO_GRPC_ENUM[option.status]]}
                    status={t(`state_info:drivers.status.${option.status}`)}
                />
            </Stack>
        </ListItem>
    );
};

export default memo(DriverOption);
