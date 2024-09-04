import { useDriverTypesMap } from '@/store/hash_maps/hooks';
import { Stack } from '@mui/material';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { DriverInfo } from '../../send-table/custom-cells/DriverCell';
import VendorCell from '../../send-table/custom-cells/VendorCell';

type Props = {
    recipient: 'driver' | 'vendor';
    driverId: string;
    vendorId: string;
};

export default function Recipient({
    recipient,
    driverId,
    vendorId
}: Props) {
    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();

    const driver = driversMap[driverId];
    const driverType = driverTypesMap[driver?.driverTypeId];

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
        >
            {recipient === 'driver' ? (
                <DriverInfo
                    driverType={driverType}
                    fullName={`${driver?.firstName || ''} ${driver?.lastName || ''}` || ''}
                    selfieUrl={driver?.selfieThumbUrl}
                />
            ) : (
                <VendorCell vendorId={vendorId} />
            )}
        </Stack>
    );
}
