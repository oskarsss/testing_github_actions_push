/* eslint-disable max-len */
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TransactionsCategoriesAutocomplete from '@/@core/fields/select/TransactionsCategoriesAutocomplete';
import TextInput from '@/@core/fields/inputs/TextInput';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettlementsTypes from '@/store/accounting/settlements/types';
import SettlementTransactionsGrpcService from '@/@grpcServices/services/settlements-service/settlement-transactions.service';

import {
    TRANSACTION_CATEGORIES_TYPE_TO_ENUM,
    TRANSACTION_TYPE_TO_GRPC_ENUM
} from '@/models/settlements/settlements-mappings';
import DateInput from '@/@core/fields/inputs/DateInput';

type DefaultValues = {
    transaction_category_id: string;
    amount: number;
    description: string;
    transactionDate: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    transaction_category_id: yup.string().required('Category is required'),
    amount                 : yup.number().min(0).required('Amount is required'),
    description            : yup.string().defined(),
    transactionDate        : yup.string().defined()
});

export const useCreateTransactionDialog = hookFabric(
    CreateTransactionDialog,
    DialogComponents.DialogWrapper
);

type Props = {
    settlement_id: string;
    type: SettlementsTypes.TransactionCategories.CategoryType;
    period_id: string;
    cycle_id: string;
};

export default function CreateTransactionDialog({
    type,
    settlement_id,
    cycle_id,
    period_id
}: Props) {
    const createTransactionDialog = useCreateTransactionDialog(true);

    const [addTransaction, { isLoading: addLoading }] =
        SettlementTransactionsGrpcService.useSettlementTransactionCreateMutation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: {
            transaction_category_id: '',
            amount                 : 0,
            description            : '',
            transactionDate        : ''
        },
        resolver: yupResolver(schema)
    });

    const add = (data: DefaultValues) => {
        addTransaction({
            transactionDate: data.transactionDate,
            amount         : data.amount,
            categoryId     : data.transaction_category_id,
            cycleId        : cycle_id,
            description    : data.description,
            periodId       : period_id,
            settlementId   : settlement_id,
            type           : TRANSACTION_TYPE_TO_GRPC_ENUM[type]
        })
            .unwrap()
            .then(createTransactionDialog.close);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit((data: DefaultValues) => add(data))(e);
    };

    return (
        <DialogComponents.Form onSubmit={submit}>
            <DialogComponents.Header title="modals:settlements.edit_settlement.tabs.transactions.dialogs.titles.add_transaction" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <AmountInput
                        control={control}
                        errors={errors}
                        label="fields:amount.label"
                        name="amount"
                        placeholder="fields:amount.placeholder"
                        width="100%"
                        autoFocus
                        required
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TransactionsCategoriesAutocomplete
                        required
                        control={control}
                        type={type}
                        label={`modals:settlements.edit_settlement.tabs.transactions.dialogs.fields.labels.${
                            type === 'debit' ? 'debit_category' : 'credit_category'
                        }`}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        name="description"
                        control={control}
                        errors={errors}
                        label="fields:description.label"
                        type="text"
                        width="100%"
                        placeholder="modals:settlements.edit_settlement.tabs.transactions.dialogs.fields.placeholders.description"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <DateInput
                        control={control}
                        width="100%"
                        name="transactionDate"
                        label="modals:settlements.edit_settlement.tabs.transactions.dialogs.fields.labels.transaction_date"
                        errors={errors}
                        AMPMTime={false}
                        type="date"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={createTransactionDialog.close} />

                <DialogComponents.SubmitButton
                    disabled={!isDirty}
                    loading={addLoading}
                    type="create"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
