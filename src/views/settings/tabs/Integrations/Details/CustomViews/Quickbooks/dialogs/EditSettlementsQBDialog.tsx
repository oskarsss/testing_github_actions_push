import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import { get_accounts_quickbooks_default_query } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Settlements/hook';
import createMap from '@/utils/create-map';
import InactiveItem from './InactiveItem';

export const useEditSettlementsQBDialog = hookFabric(EditSettlementsQBDialog);

type Props = {
    quickbooksId: string;
    transactionCategoryId: string;
    transactionCategoryName: string;
};

type DefaultValues = {
    quickbooks_id: string;
};

function EditSettlementsQBDialog({
    quickbooksId,
    transactionCategoryId,
    transactionCategoryName
}: Props) {
    const dialog = useEditSettlementsQBDialog(true);

    const [updateSettlementTransactionCategoryQuickbooks, { isLoading }] =
        // eslint-disable-next-line max-len
        IntegrationQuickbooksGrpcService.useUpdateAccountSettlementTransactionCategoryQuickbooksMutation();

    const { data: quickbooksItems } =
        IntegrationQuickbooksGrpcService.useGetAccountsQuickbooksQuery(
            get_accounts_quickbooks_default_query
        );

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
        updateSettlementTransactionCategoryQuickbooks({
            quickbooksExpenseAccountId           : body.quickbooks_id,
            systemSettlementTransactionCategoryId: transactionCategoryId
        })
            .unwrap()
            .then(dialog.close);
    };

    const options: Option[] =
        quickbooksItems?.accounts?.map((item) => ({
            name         : item.name,
            id           : item.quickbooksAccountId,
            optionContent: !item.active ? <InactiveItem displayName={item.name} /> : null
        })) || [];

    const entities_by_id = createMap(options, 'id');

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                translationOptions={{
                    name: transactionCategoryName
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
