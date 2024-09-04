import ManifestDriverPayService from '@/@grpcServices/services/manifests-service/manifest-driver-pay.service';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ManifestModel_Driver_PayItem } from '@proto/models/model_manifest';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import DriverPayFields, {
    DriverPayFieldsDefaultValues,
    DriverPayFieldsType,
    schema
} from './DriverPayFields';

type Props = {
    item: ManifestModel_Driver_PayItem;
    driverId: string;
    manifestId: string;
    truckId: string;
};

export const useEditManifestDriverPayItemMenu = hookFabric(EditDriverPayItem);

export default function EditDriverPayItem({
    driverId,
    manifestId,
    truckId,
    item
}: Props) {
    const menu = useEditManifestDriverPayItemMenu(true);
    const [updateTrigger, updateState] =
        ManifestDriverPayService.useUpdateManifestDriverPayItemMutation();

    const [deleteTrigger, deleteState] =
        ManifestDriverPayService.useDeleteManifestDriverPayItemMutation();

    const values: DriverPayFieldsType = useMemo(
        () => ({
            amount_per_unit: item.amountPerUnit.toString(),
            category_id    : item.categoryId,
            description    : item.description,
            units          : item.units
        }),
        [item]
    );

    const methods = useForm<DriverPayFieldsType>({
        defaultValues: DriverPayFieldsDefaultValues,
        values,
        resolver     : yupResolver<DriverPayFieldsType>(schema),
        mode         : 'onChange'
    });

    const submit = async (data: DriverPayFieldsType) => {
        await updateTrigger({
            driverPayItemId        : item.driverPayItemId,
            amountPerUnit          : data.amount_per_unit,
            description            : data.description,
            driverId,
            driverPayItemCategoryId: data.category_id,
            manifestId,
            units                  : data.units.toString()
        }).unwrap();
        menu.close();
    };

    const onDelete = async () => {
        await deleteTrigger({
            driverPayItemId: item.driverPayItemId,
            driverId,
            manifestId,
            truckId
        }).unwrap();
        menu.close();
    };

    return (
        <DriverPayFields
            submit={submit}
            methods={methods}
            title="modals:manifests.driver_pay_item.titles.edit"
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.ActionsWrapper>
                    <DialogComponents.CancelButton onCancel={menu.close} />
                    <DialogComponents.DeleteButton
                        onClick={onDelete}
                        disabled={updateState.isLoading}
                        loading={deleteState.isLoading}
                    />
                    <DialogComponents.SubmitButton
                        loading={updateState.isLoading}
                        disabled={deleteState.isLoading || !methods.formState.isDirty}
                        text="common:button.update"
                    />
                </DialogComponents.ActionsWrapper>
            </DialogComponents.ActionsWrapper>
        </DriverPayFields>
    );
}
