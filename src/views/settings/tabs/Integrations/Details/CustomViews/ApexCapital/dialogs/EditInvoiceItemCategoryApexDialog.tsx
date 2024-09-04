import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import { InvoiceTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/types';
import IntegrationApexCapitalGrpcService from '@/@grpcServices/services/integrations-apexcapital.service';

export const useEditInvoiceItemCategoryApexDialog = hookFabric(EditInvoiceItemCategoryApexDialog);

type Props = {
    row: InvoiceTabData;
};

type DefaultValues = {
    apexCapitalId: string;
};

function EditInvoiceItemCategoryApexDialog({ row }: Props) {
    const dialog = useEditInvoiceItemCategoryApexDialog(true);
    const [updateApexCapitalItemInvoiceItemCategory, { isLoading }] =
        IntegrationApexCapitalGrpcService.useUpdateApexCapitalLineItemCategoryMutation();

    const { data: apexCapitalItems } =
        IntegrationApexCapitalGrpcService.useGetApexCapitalLineItemsQuery({});

    const {
        control,
        formState: { isDirty },
        handleSubmit
    } = useForm<DefaultValues>({
        values: {
            apexCapitalId: row.apex_capital_id
        }
    });

    const submit = (body: DefaultValues) => {
        updateApexCapitalItemInvoiceItemCategory({
            apexLineItemId                 : body.apexCapitalId,
            systemLoadInvoiceItemCategoryId: row.invoiceItemCategoryId
        }).then(dialog.close);
    };

    const options: Option[] =
        apexCapitalItems?.lineItems?.map((item) => ({
            name: item.name,
            id  : item.apexLineItemId
        })) || [];

    const entities_by_id =
        apexCapitalItems?.lineItems?.reduce((acc, item) => {
            acc[item.apexLineItemId] = { name: item.name, id: item.apexLineItemId };
            return acc;
        }, {} as Record<string, Option>) || {};

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                translationOptions={{
                    name: row.name
                }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        label="modals:settings.integrations.edit.fields.apexCapitalId.label"
                        control={control}
                        name="apexCapitalId"
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
