import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ManifestDriverPayService from '@/@grpcServices/services/manifests-service/manifest-driver-pay.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import DriverPayFields, {
    DriverPayFieldsDefaultValues,
    DriverPayFieldsType,
    schema
} from './DriverPayFields';

type Props = {
    driverId: string;
    manifestId: string;
};

export const useAddDriverPayItemDialog = hookFabric(AddDriverPayItem);

export default function AddDriverPayItem({
    driverId,
    manifestId
}: Props) {
    const menu = useAddDriverPayItemDialog(true);
    const [trigger, { isLoading }] = ManifestDriverPayService.useAddManifestDriverPayItemMutation();

    const methods = useForm<DriverPayFieldsType>({
        defaultValues: DriverPayFieldsDefaultValues,
        resolver     : yupResolver<DriverPayFieldsType>(schema),
        mode         : 'onChange'
    });

    const submit = async (data: DriverPayFieldsType) => {
        await trigger({
            amountPerUnit          : data.amount_per_unit,
            description            : data.description,
            driverId,
            driverPayItemCategoryId: data.category_id,
            manifestId,
            units                  : data.units.toString()
        }).unwrap();

        menu.close();
    };

    return (
        <DriverPayFields
            submit={submit}
            methods={methods}
            title="modals:manifests.driver_pay_item.titles.add"
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={menu.close} />
                <DialogComponents.SubmitButton
                    disabled={!methods.formState.isDirty}
                    loading={isLoading}
                    text="common:button.add"
                />
            </DialogComponents.ActionsWrapper>
        </DriverPayFields>
    );
}
