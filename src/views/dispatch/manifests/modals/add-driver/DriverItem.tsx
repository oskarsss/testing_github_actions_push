import { useAppTranslation } from '@/hooks/useAppTranslation';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { StatusChip } from '@/@core/theme/chip';
import { DRIVER_STATUS_COLORS } from '@/@core/theme/entities/driver/status';
import { Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';

import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import type { DriverModel_Driver } from '@proto/models/model_driver';

import { DRIVER_STATUS_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';

interface DriverItemProps {
    item: DriverModel_Driver;
    onClick: () => void;
    selected_id?: string;
}

const DriverAvatar = ({ item }: { item: DriverModel_Driver }) => {
    const { url } = usePrivateFileUrl(item.selfieThumbUrl);
    return (
        <Avatar
            alt={`${item.firstName} ${item.lastName}`}
            src={url}
            sx={{ width: 40, height: 40, marginRight: '10px', fontSize: '12px' }}
        >
            {item.firstName?.charAt(0).toUpperCase()}
            {item.lastName?.charAt(0).toUpperCase()}
        </Avatar>
    );
};

const DriverItem = ({
    item,
    onClick,
    selected_id
}: DriverItemProps) => {
    const { t } = useAppTranslation();
    const driver_types = useDriverTypesMap();
    const driver_type = driver_types[item.driverTypeId];

    return (
        <ListItem
            onClick={onClick}
            key={item.driverId}
            selected={selected_id === item.driverId}
        >
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
                    <DriverAvatar item={item} />

                    <Stack direction="column">
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            sx={{ width: '100%' }}
                        >
                            {`${item.firstName} ${item.lastName}`}
                        </Stack>
                        {item.phoneNumber && (
                            <Typography variant="caption">
                                {t('common:phone')}: {item.phoneNumber}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Tooltip
                        disableInteractive
                        title={driver_type?.name}
                    >
                        <Stack
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            component="span"
                        >
                            {driver_type && DRIVER_TYPE_ICONS[driver_type.icon]}
                        </Stack>
                    </Tooltip>
                    <StatusChip
                        color={DRIVER_STATUS_COLORS[item.status]}
                        status={t(
                            `state_info:drivers.status.${DRIVER_STATUS_GRPC_ENUM[item.status]}`
                        )}
                    />
                </Stack>
            </Stack>
        </ListItem>
    );
};

export default DriverItem;
