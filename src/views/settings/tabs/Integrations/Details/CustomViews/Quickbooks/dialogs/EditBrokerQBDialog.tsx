import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import CustomAutocomplete from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import InactiveItem from './InactiveItem';

export const useEditBrokerQBDialog = hookFabric(EditBrokerQBDialog);

type Props = {
    brokerId: string;
    brokerName: string;
    quickbooksId: string;
};

type DefaultValues = {
    quickbooks_id: string;
};

function EditBrokerQBDialog({
    brokerId,
    brokerName,
    quickbooksId
}: Props) {
    const dialog = useEditBrokerQBDialog(true);
    const [updateSystemBrokerIDQuickbooks, { isLoading }] =
        IntegrationQuickbooksGrpcService.useUpdateSystemBrokerIDQuickbooksMutation();

    const { data: customersQuickbooks } =
        IntegrationQuickbooksGrpcService.useGetCustomersQuickbooksQuery({});

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
        updateSystemBrokerIDQuickbooks({
            quickbooksCustomerId: body.quickbooks_id,
            systemBrokerId      : brokerId
        })
            .unwrap()
            .then(dialog.close);
    };

    const options =
        customersQuickbooks?.customers?.map((item) => ({
            name         : item.displayName,
            id           : item.quickbooksCustomerId,
            optionContent: !item.active ? <InactiveItem displayName={item.displayName} /> : null
        })) || [];

    const entities_by_id = createMap(options, 'id');

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                textVariant="h6"
                translationOptions={{
                    name: brokerName
                }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        label="modals:settings.integrations.edit.fields.quickbooks.customer"
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
