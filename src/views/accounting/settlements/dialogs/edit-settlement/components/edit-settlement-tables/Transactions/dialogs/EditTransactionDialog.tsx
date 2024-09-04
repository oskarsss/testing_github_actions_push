/* eslint-disable max-len */
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TransactionsCategoriesAutocomplete from '@/@core/fields/select/TransactionsCategoriesAutocomplete';
import TextInput from '@/@core/fields/inputs/TextInput';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import SettlementTransactionsGrpcService from '@/@grpcServices/services/settlements-service/settlement-transactions.service';
import { formatAmountFormattingToNumber } from '@/utils/formatting';
import {
    TRANSACTION_TYPE_GRPC_ENUM,
    TRANSACTION_CATEGORIES_TYPE_TO_ENUM
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

type Props = {
    settlement_id: string;
    item: SettlementsTypes.CycleSettlementDetails.Transaction;
    cycle_id: string;
    period_id: string;
};

export const useEditTransactionDialog = hookFabric(
    EditTransactionDialog,
    DialogComponents.DialogWrapper
);

export default function EditTransactionDialog({
    settlement_id,
    item,
    cycle_id,
    period_id
}: Props) {
    const transactionDialog = useEditTransactionDialog(true);

    const [updateTransaction, { isLoading: updateLoading }] =
        SettlementTransactionsGrpcService.useSettlementTransactionUpdateMutation();

    const [deleteTransaction, { isLoading: deleteLoading }] =
        SettlementTransactionsGrpcService.useSettlementTransactionDeleteMutation();
    const [syncSettlement] = SettlementsGrpcService.useLazySyncSettlementTurnOffToastQuery();
    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        values: {
            transaction_category_id: item.categoryId,
            amount                 : formatAmountFormattingToNumber(item.amount),
            description            : item.description,
            transactionDate        : item.transactionDate
        },
        resolver: yupResolver(schema)
    });

    const edit = (body: DefaultValues) => {
        updateTransaction({
            cycleId              : cycle_id,
            periodId             : period_id,
            settlementId         : settlement_id,
            transactionId        : item.transactionId,
            transactionCategoryId: body.transaction_category_id,
            amount               : body.amount,
            description          : body.description,
            transactionDate      : body.transactionDate
        })
            .unwrap()
            .then(() => {
                syncSettlement({
                    cycleId     : cycle_id,
                    periodId    : period_id,
                    settlementId: settlement_id
                });
                transactionDialog.close();
            });
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit((data: DefaultValues) => edit(data))(e);
    };

    const deleteItem = () => {
        deleteTransaction({
            transactionId: item.transactionId,
            settlementId : settlement_id,
            cycleId      : cycle_id,
            periodId     : period_id
        })
            .unwrap()
            .then(() => {
                transactionDialog.close();
            });
    };

    const type = TRANSACTION_TYPE_GRPC_ENUM[item.type];

    return (
        <DialogComponents.Form onSubmit={submit}>
            <DialogComponents.Header
                title={`modals:settlements.edit_settlement.tabs.transactions.dialogs.titles.${
                    type === 'debit' ? 'update_debit' : 'update_credit'
                }`}
            />
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
                <DialogComponents.CancelButton onCancel={transactionDialog.close} />
                <DialogComponents.DeleteButton
                    loading={deleteLoading}
                    onClick={deleteItem}
                />
                <DialogComponents.SubmitButton
                    loading={updateLoading}
                    disabled={!isDirty}
                    type="update"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
