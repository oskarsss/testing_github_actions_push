import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import BankAccountsGrpcService from '@/@grpcServices/services/bank-accounts.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BankAccountModel_Entity_Type } from '@proto/models/model_bank_account';
import React from 'react';
import PositiveIntegerFormat from '@/@core/fields/inputs/number-format/PositiveIntegerFormat';
import { defaultValues, type DefaultValues, schema } from './constants';

export const useAddBankAccountDialog = hookFabric(AddBankAccountDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="350px"
        {...props}
    />
));

type Props = {
    entityType: BankAccountModel_Entity_Type;
    entityId: string;
    onSuccessfulAdd?: (bankAccountId: string) => void;
};

export function AddBankAccountDialog({
    entityType,
    entityId,
    onSuccessfulAdd
}: Props) {
    const { close } = useAddBankAccountDialog(true);

    const [addBankAccount, { isLoading }] =
        BankAccountsGrpcService.endpoints.addBankAccount.useMutation();

    const {
        handleSubmit,
        control,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    const handleCloseDialog = () => close();

    const create = (data: DefaultValues) => {
        addBankAccount({ ...data, entityType, entityId })
            .unwrap()
            .then((res) => {
                if (onSuccessfulAdd && res.bankAccount) {
                    onSuccessfulAdd(res.bankAccount.bankAccountId);
                }
                close();
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(create)}>
            <DialogComponents.Header title="modals:settings.bank_accounts.create.header.title" />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:settings.bank_accounts.create.fields.name_on_account.label"
                        name="accountHolderName"
                        placeholder="modals:settings.bank_accounts.create.fields.name_on_account.placeholder"
                        width="100%"
                        required
                        autoFocus
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:settings.bank_accounts.create.fields.routing_number.label"
                        name="routingNumber"
                        placeholder="modals:settings.bank_accounts.create.fields.routing_number.placeholder"
                        width="100%"
                        inputProps={{
                            inputComponent: PositiveIntegerFormat
                        }}
                        required
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:settings.bank_accounts.create.fields.account_number.label"
                        name="accountNumber"
                        placeholder="modals:settings.bank_accounts.create.fields.account_number.placeholder"
                        width="100%"
                        inputProps={{
                            inputComponent: PositiveIntegerFormat
                        }}
                        required
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={handleCloseDialog} />

                <DialogComponents.SubmitButton
                    loading={isLoading}
                    disabled={isLoading || !isDirty}
                    type="create"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
