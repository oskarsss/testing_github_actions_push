import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import InactiveItem from './InactiveItem';

export const useEditDriverQBDialog = hookFabric(EditDriverQBDialog);

type Props = {
    quickbooksId: string;
    driverId: string;
    driverFullName: string;
};

type DefaultValues = {
    quickbooks_id: string;
};

function EditDriverQBDialog({
    quickbooksId,
    driverId,
    driverFullName
}: Props) {
    const dialog = useEditDriverQBDialog(true);
    const [updateSystemDriverIDQuickbooks, { isLoading }] =
        IntegrationQuickbooksGrpcService.useUpdateSystemDriverIDQuickbooksMutation();

    const { data: vendorsQuickbooks } =
        IntegrationQuickbooksGrpcService.useGetVendorsQuickbooksQuery({});

    const {
        control,
        formState: { isDirty },
        handleSubmit
    } = useForm<DefaultValues>({
        values: {
            quickbooks_id: quickbooksId
        }
    });

    const submit = (body: DefaultValues) => {
        updateSystemDriverIDQuickbooks({
            quickbooksVendorId: body.quickbooks_id,
            systemDriverId    : driverId
        })
            .unwrap()
            .then(dialog.close);
    };

    const options: Option[] =
        vendorsQuickbooks?.vendors?.map((item) => ({
            name         : item.displayName,
            id           : item.quickbooksVendorId,
            optionContent: !item.active ? <InactiveItem displayName={item.displayName} /> : null
        })) || [];

    const entities_by_id = createMap(options, 'id');

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                translationOptions={{
                    name: driverFullName
                }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        label="modals:settings.integrations.edit.fields.quickbooks.vendor"
                        labelOption={{ name: 'QuickBooks' }}
                        control={control}
                        name="quickbooks_id"
                        options={options}
                        entities_by_id={entities_by_id}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
