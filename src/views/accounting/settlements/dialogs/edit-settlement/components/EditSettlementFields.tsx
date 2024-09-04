import { Stack } from '@mui/material';
import DateInput from './edit-settlement-fields/DateInput';
import TruckField from './edit-settlement-fields/TruckField';
import TrailerField from './edit-settlement-fields/TrailerField';
import DriverField from './edit-settlement-fields/DriverField';
import VendorField from './edit-settlement-fields/VendorField';

export default function EditSettlementFields() {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={3}
        >
            <TruckField />
            <TrailerField />
            <DriverField />
            <VendorField />
            <DateInput />
        </Stack>
    );
}
