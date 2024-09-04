import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import InactiveItem from './InactiveItem';

export const useEditInvoiceItemCategoryQBDialog = hookFabric(EditInvoiceItemCategoryQBDialog);

type Props = {
    invoiceItemCategoryId: string;
    invoiceItemCategoryName: string;
    quickbooksId: string;
};

type DefaultValues = {
    quickbooks_id: string;
};

function EditInvoiceItemCategoryQBDialog({
    invoiceItemCategoryName,
    invoiceItemCategoryId,
    quickbooksId
}: Props) {
    const dialog = useEditInvoiceItemCategoryQBDialog(true);
    const [updateQuickbooksItemInvoiceItemCategory, { isLoading }] =
        IntegrationQuickbooksGrpcService.useUpdateQuickbooksItemInvoiceItemCategoryMutation({});

    const { data: quickbooksItems } =
        IntegrationQuickbooksGrpcService.useGetIntegrationQuickbooksItemsQuery({});

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
        updateQuickbooksItemInvoiceItemCategory({
            quickbooksItemId               : body.quickbooks_id,
            systemLoadInvoiceItemCategoryId: invoiceItemCategoryId
        })
            .unwrap()
            .then(dialog.close);
    };

    const options: Option[] =
        quickbooksItems?.items?.map((item) => ({
            name         : item.name,
            id           : item.quickbooksItemId,
            optionContent: !item.active ? <InactiveItem displayName={item.name} /> : null
        })) || [];

    const entities_by_id = createMap(options, 'id');

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                translationOptions={{
                    name: invoiceItemCategoryName
                }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        label="modals:settings.integrations.edit.fields.quickbooks.item"
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
