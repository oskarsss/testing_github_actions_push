/* eslint-disable max-len */

import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SyntheticEvent } from 'react';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useConfirm } from '@/@core/components/confirm-dialog';
import MenuComponents from '@/@core/ui-kits/menus';
import { Stack } from '@mui/material';

import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useAppDispatch } from '@/store/hooks';
import grpcAPI from '@/@grpcServices/api';
import { SettlementRecurringTransactionRetrieveReply } from '@proto/settlement.recurring_transaction';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import SettlementRecurringTransactionStatusChipSelect from '@/@core/fields/chip-select/SettlementRecurringTransactionStatusChipSelect';
import { useDriverById } from '@/store/storage/drivers/hooks/common';
import RecurringTransactionFields from '../components/Fields';
import { useEditRecurringTransactionDialog, useEditRecurringTransactionsMenu } from './hooks';

type DefaultValues = {
    amount: number;
    max_total_amount: number;
    note: string;
    start_date: string;
    transaction_category_id: string;
    type: 'debit' | 'credit';
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    transaction_category_id: yup.string().required('Field is required'),
    amount                 : yup.number().min(0).required('Field is required'),
    max_total_amount       : yup.number().min(0).required('Field is required'),
    note                   : yup.string().defined(),
    start_date             : yup.string().required('Field is required'),
    type                   : yup.string<'debit' | 'credit'>().required('Field is required')
});

type Props = {
    data?: SettlementRecurringTransactionRetrieveReply;
    category_id: string;
    category_type: 'debit' | 'credit';
    category_name: string;
    setDialogStyled?: boolean;
    settlement_id?: string;
    driver_id?: string;
    readOnlyCategoryField: boolean;
    settlementsParams?: {
        cycleId: string;
        periodId: string;
        settlementId: string;
    };
};
export default function EditRecurringTransactions({
    data,
    category_id,
    category_type,
    setDialogStyled = false,
    settlement_id,
    category_name,
    driver_id,
    readOnlyCategoryField: disableChangeCategory,
    settlementsParams
}: Props) {
    const confirm = useConfirm();
    const editRecurringTransactionsMenu = useEditRecurringTransactionsMenu(true);
    const editRecurringTransactionDialog = useEditRecurringTransactionDialog(true);
    const [syncSettlement] = SettlementsGrpcService.useLazySyncSettlementTurnOffToastQuery();
    const driver = useDriverById(data?.recurringTransaction?.driverId || '');

    const dispatch = useAppDispatch();

    const [updateRecurringTransaction, { isLoading: isUpdateTransaction }] =
        SettlementRecurringTransactionGrpcService.useUpdateRecurringTransactionMutation();
    const [deleteRecurringTransaction, { isLoading: isDeleteLoading }] =
        SettlementRecurringTransactionGrpcService.useDeleteRecurringTransactionMutation();

    const onClose = () => {
        editRecurringTransactionsMenu.close();
        editRecurringTransactionDialog.close();
    };

    const {
        control,
        handleSubmit,
        setValue,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        values: data?.recurringTransaction
            ? {
                amount                 : data.recurringTransaction.amount,
                max_total_amount       : data.recurringTransaction.maxTotalAmount,
                note                   : data.recurringTransaction.note,
                start_date             : data.recurringTransaction.startDate,
                transaction_category_id: category_id,
                type                   : category_type
            }
            : undefined,
        resolver: yupResolver(schema)
    });

    const deleteRT = () => {
        const recurringTransactionId = data?.recurringTransaction?.recurringTransactionId;
        if (!recurringTransactionId) return;
        deleteRecurringTransaction({
            recurringTransactionId,
            settlementId: settlement_id,
            driverId    : driver_id
        })
            .unwrap()
            .then(() => {
                if (settlementsParams) {
                    dispatch(grpcAPI.util.invalidateTags(['settlements']));
                }
                onClose();
            });
    };

    const onDelete = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:recurring_transactions.edit.confirm_dialog.title',
            body              : 'modals:recurring_transactions.edit.confirm_dialog.body',
            confirm_text      : 'common:button.delete',
            onConfirm         : () => deleteRT(),
            translationOptions: {
                title: {
                    categoryName: category_name
                }
            }
        });
    };

    const onSuccessfulUpdate = () => {
        if (settlementsParams) {
            syncSettlement({
                cycleId     : settlementsParams.cycleId,
                periodId    : settlementsParams.periodId,
                settlementId: settlementsParams.settlementId
            });
        }
    };

    const submit = (formData: DefaultValues) => {
        if (!data?.recurringTransaction) return;
        updateRecurringTransaction({
            recurringTransactionId: data.recurringTransaction.recurringTransactionId,
            amount                : formData.amount,
            startDate             : formData.start_date,
            categoryId            : formData.transaction_category_id,
            maxTotalAmount        : formData.max_total_amount,
            note                  : formData.note,
            settlementId          : settlement_id,
            driverId              : driver_id
        })
            .unwrap()
            .then(() => {
                onSuccessfulUpdate();
                onClose();
            });
    };
    const typeValue = useWatch({
        control,
        name: 'type'
    });

    const handleTypeChange = (_: SyntheticEvent, newValue: 'debit' | 'credit') => {
        setValue('type', newValue);
        setValue('transaction_category_id', '');
    };

    return (
        <MenuComponents.Form
            width={480}
            onSubmit={handleSubmit(submit)}
            {...(setDialogStyled ? { padding: 0 } : {})}
        >
            <Stack
                flexDirection="row"
                alignItems="flex-start"
                gap="4px"
            >
                <MenuComponents.FormHeader
                    text="modals:recurring_transactions.edit.header.title"
                    translateOptions={{
                        categoryName: category_name,
                        driverName  : driver ? `${driver.firstName} ${driver.lastName}` : ''
                    }}
                />

                {data?.recurringTransaction && (
                    <SettlementRecurringTransactionStatusChipSelect
                        recurringTransactionId={data.recurringTransaction.recurringTransactionId}
                        recurringTransactionStatus={data.recurringTransaction.status}
                        onSuccessfulUpdate={onSuccessfulUpdate}
                    />
                )}
            </Stack>

            <RecurringTransactionFields
                handleChangeType={handleTypeChange}
                typeValue={typeValue}
                control={control}
                errors={errors}
                transactions={data?.transactions}
                totalChargedFormatting={data?.totalChargedFormatted}
                disableChangeCategory={disableChangeCategory}
                readOnlyChangeCategory={disableChangeCategory}
            />
            <Stack
                mt="24px"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <MenuComponents.DeleteButton
                    loading={isDeleteLoading}
                    disabled={isUpdateTransaction}
                    onClick={onDelete}
                />
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <MenuComponents.CancelButton onCancel={onClose} />
                    <MenuComponents.SubmitButton
                        loading={isUpdateTransaction}
                        type="update"
                        disabled={!isDirty || isDeleteLoading}
                    />
                </Stack>
            </Stack>
        </MenuComponents.Form>
    );
}
