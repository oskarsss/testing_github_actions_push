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
import { ConvertCoveredItem } from '@/@core/ui-kits/profiles/components/tabs/warranty/sections/warranty-details/coverage-items/coverage-items-table/columns';
import { useMemo } from 'react';
import WarrantyItemFields from './CoverageItemFields';

type Props = {
    vehicleWarrantyId: string;
    coverageItem: ConvertCoveredItem;
};

export const useUpdateCoverageItemDialog = hookFabric(UpdateCoverageItem);

function UpdateCoverageItem({
    vehicleWarrantyId,
    coverageItem
}: Props) {
    const [warrantyItemUpdate, { isLoading }] =
        VehicleWarrantyCoverageItemGrpcService.useWarrantyItemUpdateMutation();
    const dialog = useUpdateCoverageItemDialog(true);

    const values: DefaultCoverageItemValues = useMemo(
        () => ({
            name              : coverageItem.name,
            distanceMilesRange: coverageItem.distanceMilesRange,
            periodMonthsRange : coverageItem.periodMonthsRange
        }),
        [coverageItem]
    );

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultCoverageItemValues>({
        defaultValues,
        values,
        resolver: yupResolver(coverageItemSchema)
    });

    const submit = (data: DefaultCoverageItemValues) => {
        warrantyItemUpdate({
            vehicleWarrantyId,
            warrantyItemId: coverageItem.warrantyItemId,
            baseItem      : {
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
            <DialogComponents.Header title="common:profile.center.warranty.modals.coverage_item.update.title" />

            <WarrantyItemFields
                control={control}
                errors={errors}
            />

            <DialogComponents.DefaultActions
                type="update"
                onCancel={dialog.close}
                submitLoading={isLoading}
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
