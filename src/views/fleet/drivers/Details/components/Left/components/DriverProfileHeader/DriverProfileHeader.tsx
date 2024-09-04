import Typography from '@mui/material/Typography';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import DriverStatusChipSelect from '@/@core/fields/chip-select/DriverStatusChipSelect';
import { TestIDs } from '@/configs/tests';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { DRIVER_STATUS_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import DriverTripInformation from './DriverTripInformation';
import DriverProfileHeaderTopContent from './DriverProfileHeaderTopContent';

type Props = {
    driver: DriverModel_Driver;
};

export default function DriverProfileHeader({ driver }: Props) {
    const convertedStatus = DRIVER_STATUS_GRPC_ENUM[driver.status];
    return (
        <LeftStyled.CardContentHeader>
            <DriverProfileHeaderTopContent driver={driver} />

            <Typography
                variant="h5"
                marginBottom={2}
                textAlign="center"
                width="100%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {driver.firstName} {driver.middleName} {driver.lastName}
            </Typography>

            <DriverStatusChipSelect
                buttonTestId={TestIDs.pages.editDriver.fields.status}
                optionTestId={TestIDs.components.select.status.optionPrefix}
                driver_id={driver.driverId}
                driver_status={convertedStatus}
            />

            <DriverTripInformation driver={driver} />
        </LeftStyled.CardContentHeader>
    );
}
