/* eslint-disable max-len */
import DialogComponents from '@/@core/ui-kits/common-dialog';
import VehicleWarrantyGrpcService from '@/@grpcServices/services/vehicle-warranty.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    DefaultWarrantyValues,
    warrantySchema,
    kindOfWarrantyPeriod
} from '@/@core/ui-kits/profiles/components/tabs/warranty/utils';
import WarrantyFields from '../../reusable/WarrantyFields';

type Props = {
    vehicleType: VehicleMaintenanceModel_VehicleType;
    vehicleId: string;
};

export const useCreateWarrantyDialog = hookFabric(CreateWarranty);

function CreateWarranty({
    vehicleId,
    vehicleType
}: Props) {
    const [trigger, mutationState] = VehicleWarrantyGrpcService.useWarrantyCreateMutation();
    const dialog = useCreateWarrantyDialog(true);

    const {
        control,
        formState: {
            errors,
            isDirty
        },
        handleSubmit
    } = useForm<DefaultWarrantyValues>({
        defaultValues: {
            startedAt    : '',
            distanceMiles: 0,
            period       : 0,
            periodUnits  : kindOfWarrantyPeriod.WARRANTY_PERIOD_UNITS_UNSPECIFIED
        },
        resolver: yupResolver(warrantySchema)
    });

    const submit = async (data: DefaultWarrantyValues) => {
        await trigger({
            vehicleType,
            ...(vehicleType === VehicleMaintenanceModel_VehicleType.TRUCK && {
                truckId: vehicleId
            }),
            ...(vehicleType === VehicleMaintenanceModel_VehicleType.TRAILER && {
                trailerId: vehicleId
            }),
            ...(data.periodUnits && {
                periodUnits: data.periodUnits
            }),
            ...(data.startedAt && {
                startedAt: data.startedAt
            }),
            ...(data.distanceMiles && {
                distanceMiles: data.distanceMiles
            }),
            ...(data.period && {
                period: data.period
            })
        });
        dialog.close();
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="common:profile.center.warranty.modals.create_warranty.header" />

            <WarrantyFields
                control={control}
                errors={errors}
            />

            <DialogComponents.DefaultActions
                type="create"
                onCancel={dialog.close}
                submitLoading={mutationState.isLoading}
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
