import { useWatch } from 'react-hook-form';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { DriverTypeModel } from '@proto/models/model_driver_type';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { useBatchSendSettlementsForm } from '../../BatchSendSettlements';

export function DriverInfo({
    driverType,
    fullName,
    selfieUrl
}: {
    driverType: DriverTypeModel;
    fullName: string;
    selfieUrl?: string;
}) {
    const { url } = usePrivateFileUrl(selfieUrl);

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
        >
            <Avatar
                src={url}
                sx={{
                    width : '20px',
                    height: '20px'
                }}
            />
            <Typography
                fontSize="14px"
                variant="body1"
                noWrap
                textOverflow="ellipsis"
                maxWidth={150}
                fontWeight={500}
            >
                {fullName}
            </Typography>
            {driverType && (
                <Tooltip
                    title={driverType?.name}
                    placement="top"
                >
                    <span style={{ height: '24px' }}>{DRIVER_TYPE_ICONS[driverType.icon]}</span>
                </Tooltip>
            )}
        </Stack>
    );
}

export default function DriverCell({
    driverId,
    rowIndex
}: { driverId: string; rowIndex: number }) {
    const { control } = useBatchSendSettlementsForm();
    const recipient = useWatch({ control, exact: true, name: `sends.${rowIndex}.recipient` });

    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();
    const driver = driversMap[driverId];
    const driverType = driverTypesMap[driver?.driverTypeId];

    const isDel = recipient === 'vendor';
    if (!driver) {
        return null;
    }

    if (isDel) {
        return (
            <del>
                <DriverInfo
                    driverType={driverType}
                    fullName={`${driver.firstName} ${driver.lastName}`}
                    selfieUrl={driver?.selfieThumbUrl}
                />
            </del>
        );
    }

    return (
        <DriverInfo
            driverType={driverType}
            fullName={`${driver.firstName} ${driver.lastName}`}
            selfieUrl={driver?.selfieThumbUrl}
        />
    );
}
