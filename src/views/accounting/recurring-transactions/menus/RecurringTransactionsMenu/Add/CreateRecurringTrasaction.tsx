import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SyntheticEvent, useMemo } from 'react';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import { Stack } from '@mui/material';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import moment from 'moment-timezone';
import RecurringTransactionFields from '../components/Fields';

type DefaultValues = {
    amount: number;
    max_total_amount: number;
    note: string;
    start_date: string;
    transaction_category_id: string;
    type: 'debit' | 'credit';
    driver_id: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    transaction_category_id: yup.string().required(),
    amount                 : yup.number().min(0).required(),
    max_total_amount       : yup.number().min(0).required(),
    note                   : yup.string().defined(),
    start_date             : yup.string().required(),
    type                   : yup.string<'debit' | 'credit'>().required(),
    driver_id              : yup.string().required()
});

export const useAddRecurringTransactionsMenu = menuHookFabric(RecurringTransactionsMenu, {
    keepMounted: false
});

export const useCreateRecurringTransactionDialog = hookFabric(
    RecurringTransactionsMenu,
    (props) => (
        <DialogComponents.DialogWrapper
            maxWidth="max-content"
            turnOffCloseButton
            {...props}
        />
    )
);

type Props = {
    driver?: {
        id: string;
        name: string;
    };
    category_id: string;
    category_type: 'debit' | 'credit';
    setDialogStyled?: boolean;
    settlement_id?: string;
    setDriverInvalidate?: boolean;
    enableChangeType?: boolean;
    setUpDriverSelect?: boolean;
    readOnlyCategoryField?: boolean;
    onSuccessfulCreate?: () => void;
    settlementsParams?: {
        cycleId: string;
        periodId: string;
        settlementId: string;
    };
};

function RecurringTransactionsMenu({
    driver,
    category_id,
    category_type,
    setDialogStyled = false,
    settlement_id,
    enableChangeType,
    setUpDriverSelect,
    readOnlyCategoryField,
    onSuccessfulCreate,
    settlementsParams
}: Props) {
    const [createRecurringTransaction, { isLoading }] =
        SettlementRecurringTransactionGrpcService.useCreateRecurringTransactionMutation();
    const [syncSettlement] = SettlementsGrpcService.useLazySyncSettlementTurnOffToastQuery();
    const addRecurringTransactionsMenu = useAddRecurringTransactionsMenu(true);
    const addRecurringTransactionsDialog = useCreateRecurringTransactionDialog(true);

    const onClose = () => {
        addRecurringTransactionsMenu.close();
        addRecurringTransactionsDialog.close();
    };

    const default_values = useMemo<DefaultValues>(
        () => ({
            amount                 : 0,
            max_total_amount       : 0,
            note                   : '',
            start_date             : moment().format('YYYY-MM-DD'),
            transaction_category_id: category_id,
            type                   : category_type,
            driver_id              : driver?.id ?? ''
        }),
        [category_id, category_type, driver?.id]
    );

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<DefaultValues>({
        values  : default_values,
        resolver: yupResolver(schema)
    });

    const typeValue = useWatch({
        control,
        name: 'type'
    });

    const driverIdValue = useWatch({
        control,
        name: 'driver_id'
    });

    const handleTypeChange = (_: SyntheticEvent, newValue: 'debit' | 'credit') => {
        setValue('type', newValue);
        setValue('transaction_category_id', '');
    };

    const submit = (data: DefaultValues) => {
        createRecurringTransaction({
            driverId    : data.driver_id,
            amount      : data.amount,
            startDate   : data.start_date,
            categoryId  : data.transaction_category_id,
            note        : data.note,
            settlementId: settlement_id,
            categoryType:
                data.type === 'credit'
                    ? SettlementTransactionCategoryModel_Type.CREDIT
                    : SettlementTransactionCategoryModel_Type.DEBIT,
            ...(data.max_total_amount ? { maxTotalAmount: data.max_total_amount } : {})
        })
            .unwrap()
            .then(() => {
                onSuccessfulCreate?.();
                if (settlementsParams) {
                    syncSettlement({
                        cycleId     : settlementsParams.cycleId,
                        periodId    : settlementsParams.periodId,
                        settlementId: settlementsParams.settlementId
                    });
                }
                onClose();
            });
    };

    return (
        <MenuComponents.Form
            width={480}
            onSubmit={handleSubmit(submit)}
            {...(setDialogStyled ? { padding: 0 } : {})}
        >
            <MenuComponents.FormHeader
                text="modals:recurring_transactions.create.header.title"
                translateOptions={{ name: driver?.name ?? '' }}
            />
            <RecurringTransactionFields
                enableChangeType={enableChangeType}
                setUpDriverSelect={setUpDriverSelect}
                handleChangeType={handleTypeChange}
                typeValue={typeValue}
                readOnlyChangeCategory={readOnlyCategoryField}
                disableChangeCategory={readOnlyCategoryField || !driverIdValue}
                control={control}
                errors={errors}
            />
            <Stack
                mt="24px"
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <MenuComponents.CancelButton onCancel={onClose} />
                <MenuComponents.SubmitButton
                    loading={isLoading}
                    type="create"
                />
            </Stack>
        </MenuComponents.Form>
    );
}
