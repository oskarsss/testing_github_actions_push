import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import { useQbBankAccountFiltered } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/BankAccounts/hook';
import FormHelperText from '@mui/material/FormHelperText';
import { renderError } from '@/utils/render-error';
import createMap from '@/utils/create-map';
import InactiveItem from './InactiveItem';

export const useEditBankAccountQBDialog = hookFabric(EditBankAccountQBDialog);

type Props = {
    quickbooksId: string;
    bankAccountId: string;
    bankAccountName: string;
};

type DefaultValues = {
    quickbooks_id: string;
};

function EditBankAccountQBDialog({
    quickbooksId,
    bankAccountId,
    bankAccountName
}: Props) {
    const dialog = useEditBankAccountQBDialog(true);
    const [update, {
        isLoading,
        error
    }] =
        IntegrationQuickbooksGrpcService.useUpdateBankAccountQuickbooksMutation();

    const { accountsFilter } = useQbBankAccountFiltered();

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
        update({
            systemBankAccountId: bankAccountId,
            quickbooksAccountId: body.quickbooks_id
        })
            .unwrap()
            .then(dialog.close);
    };

    const options: Option[] = accountsFilter.map((item) => ({
        name         : item.name,
        id           : item.quickbooksAccountId,
        optionContent: !item.active ? <InactiveItem displayName={item.name} /> : null
    }));

    const entities_by_id = createMap(options, 'id');

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                translationOptions={{
                    name: bankAccountName
                }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        label="modals:settings.integrations.edit.fields.quickbooks.bank_account"
                        labelOption={{ name: 'QuickBooks' }}
                        control={control}
                        name="quickbooks_id"
                        options={options}
                        entities_by_id={entities_by_id}
                    />
                    {error && (
                        <FormHelperText sx={{ color: 'error.main' }}>
                            <span>{renderError(error)}</span>
                        </FormHelperText>
                    )}
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
