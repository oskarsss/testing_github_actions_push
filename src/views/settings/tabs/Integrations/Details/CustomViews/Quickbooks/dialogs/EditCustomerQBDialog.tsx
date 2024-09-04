import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import InactiveItem from './InactiveItem';

export const useEditCustomerQBDialog = hookFabric(EditCustomerQBDialog);

type Props = {
    customerId: string;
    customerName: string;
    quickbooksId: string;
};

type DefaultValues = {
    quickbooks_id: string;
};

function EditCustomerQBDialog({
    customerName,
    customerId,
    quickbooksId
}: Props) {
    const dialog = useEditCustomerQBDialog(true);
    const [updateSystemCustomerIDQuickbooks, { isLoading }] =
        IntegrationQuickbooksGrpcService.useUpdateSystemCustomerIDQuickbooksMutation();

    const { data: customersQuickbooks } =
        IntegrationQuickbooksGrpcService.useGetCustomersQuickbooksQuery({});

    const {
        control,
        formState: {
            errors,
            isDirty
        },
        handleSubmit
    } = useForm<DefaultValues>({
        values: {
            quickbooks_id: quickbooksId
        }
    });

    const submit = (body: DefaultValues) => {
        updateSystemCustomerIDQuickbooks({
            quickbooksCustomerId: body.quickbooks_id,
            systemCustomerId    : customerId
        })
            .unwrap()
            .then(dialog.close);
    };

    const options: Option[] =
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
                translationOptions={{
                    name: customerName
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
