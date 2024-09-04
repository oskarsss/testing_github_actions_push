import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import VehicleWarrantyGrpcService from '@/@grpcServices/services/vehicle-warranty.service';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import { Stack } from '@mui/material';
import { memo } from 'react';
import TabContentWrapper from '@/@core/ui-kits/profiles/components/tabs/reusable/TabContentWrapper';
import WarrantyHeader from './header/WarrantyHeader';
import WarrantyForm from './sections/warranty-form/WarrantyForm';
import WarrantyDetails from './sections/warranty-details/WarrantyDetails';
import { useCreateWarrantyDialog } from './modals/create-warranty';

type Props = {
    vehicleType: VehicleMaintenanceModel_VehicleType;
    vehicleId: string;
};

function Warranty({
    vehicleType,
    vehicleId
}: Props) {
    const createWarrantyDialog = useCreateWarrantyDialog();
    const handleOpenDialog = () => {
        createWarrantyDialog.open({
            vehicleId,
            vehicleType
        });
    };
    const {
        data,
        isLoading,
        isError
    } = VehicleWarrantyGrpcService.useWarrantyRetrieveQuery({
        vehicleId,
        vehicleType
    });

    if (isLoading) {
        return <Preloader />;
    }

    if (!data?.warranty || data.warranty.deleted || isError) {
        return (
            <ErrorScreen
                configType={ErrorScreenType.WARRANTY}
                onClick={handleOpenDialog}
            />
        );
    }

    return (
        <TabContentWrapper>
            <WarrantyHeader vehicleWarrantyId={data.warranty.vehicleWarrantyId} />

            <Stack
                direction="row"
                gap="16px"
                justifyContent="space-between"
                height="100%"
                overflow="hidden"
            >
                <WarrantyForm vehicleWarranty={data.warranty} />

                <WarrantyDetails vehicleWarrantyId={data.warranty.vehicleWarrantyId} />
            </Stack>
        </TabContentWrapper>
    );
}

export default memo(Warranty);
