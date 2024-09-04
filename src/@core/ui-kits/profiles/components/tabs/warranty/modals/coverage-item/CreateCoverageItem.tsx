/* eslint-disable max-len */
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    DefaultCoverageItemValues,
    coverageItemSchema,
    defaultValues
} from '@/@core/ui-kits/profiles/components/tabs/warranty/modals/coverage-item/utils';
import VehicleWarrantyCoverageItemGrpcService from '@/@grpcServices/services/vehicle-warranty-coverage-items.service';
import WarrantyItemFields from './CoverageItemFields';

type Props = {
    vehicleWarrantyId: string;
};

export const useCreateCoverageItemDialog = hookFabric(CreateCoverageItem);

function CreateCoverageItem({ vehicleWarrantyId }: Props) {
    const [warrantyItemCreate, { isLoading }] =
        VehicleWarrantyCoverageItemGrpcService.useWarrantyItemCreateMutation();
    const dialog = useCreateCoverageItemDialog(true);

    const {
        control,
        formState: {
            errors,
            isDirty
        },
        handleSubmit
    } = useForm<DefaultCoverageItemValues>({
        defaultValues,
        resolver: yupResolver(coverageItemSchema)
    });

    const submit = (data: DefaultCoverageItemValues) => {
        warrantyItemCreate({
            vehicleWarrantyId,
            baseItem: {
                name: data.name,
                ...(data.distanceMilesRange && {
                    distanceMilesRange: data.distanceMilesRange
                }),
                ...(data.periodMonthsRange && {
                    periodMonthsRange: data.periodMonthsRange
                })
            }
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="common:profile.center.warranty.modals.coverage_item.create.title" />

            <WarrantyItemFields
                control={control}
                errors={errors}
            />

            <DialogComponents.DefaultActions
                type="create"
                onCancel={dialog.close}
                submitLoading={isLoading}
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
