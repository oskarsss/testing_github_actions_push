/* eslint-disable max-len */

import React, { useMemo } from 'react';
import { useAllCategories } from '@/store/accounting/settlements/hooks/recurring-transactions';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import { TRANSACTION_CATEGORIES_TYPE } from '@/models/settlements/settlements-mappings';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import VectorIcons from '@/@core/icons/vector_icons';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import { Stack } from '@mui/material';
import {
    useEditRecurringTransactionDialog,
    useEditRecurringTransactionsMenu
} from '@/views/accounting/recurring-transactions/menus/RecurringTransactionsMenu/Edit/hooks';
import MenuComponents from '@/@core/ui-kits/menus';
import EditRecurringTransactions from './EditRecurringTransaction';
import RecurringTransactionsSkeleton from '../components/RecurringTransactionsSkeleton';

type Props = {
    id: string;
    category_id: string;
    setDialogStyled?: boolean;
    settlement_id?: string;
    driver_id?: string;
    readOnlyCategoryField?: boolean;
    settlementsParams?: {
        cycleId: string;
        periodId: string;
        settlementId: string;
    };
};
export default function EditRecurringTransactionContainer({
    id,
    category_id,
    setDialogStyled = false,
    settlement_id,
    driver_id,
    readOnlyCategoryField = false,
    settlementsParams
}: Props) {
    const { categories } = useAllCategories();
    const editRecurringTransactionsMenu = useEditRecurringTransactionsMenu(true);
    const editRecurringTransactionDialog = useEditRecurringTransactionDialog(true);
    const {
        data,
        isSuccess,
        isLoading,
        isFetching,
        isError,
        currentData
    } =
        SettlementRecurringTransactionGrpcService.useRetrieveRecurringTransactionQuery(
            {
                recurringTransactionId: id
            },
            {
                skip                     : !id,
                refetchOnMountOrArgChange: true
            }
        );

    const category_info: { type: 'credit' | 'debit'; name: string } = useMemo(() => {
        if (data) {
            const category = categories.find(
                (category) => category.transactionCategoryId === category_id
            );
            return {
                type: TRANSACTION_CATEGORIES_TYPE[
                    category?.type || SettlementTransactionCategoryModel_Type.DEBIT
                ],
                name: category?.name || ''
            };
        }
        return {
            type: 'debit',
            name: ''
        };
    }, [category_id, categories, data?.recurringTransaction]);

    if (isError) {
        const onClose = () => {
            editRecurringTransactionsMenu.close();
            editRecurringTransactionDialog.close();
        };

        return (
            <Stack
                width="480px"
                height="570px"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
                <FallbackContent
                    icon={<VectorIcons.Cone />}
                    firstText="common:error"
                />
                <MenuComponents.CancelButton onCancel={onClose} />
            </Stack>
        );
    }

    if ((isFetching && !currentData) || !isSuccess || isLoading) {
        return <RecurringTransactionsSkeleton />;
    }

    return (
        <EditRecurringTransactions
            data={data}
            readOnlyCategoryField={readOnlyCategoryField}
            driver_id={driver_id}
            settlement_id={settlement_id}
            category_id={category_id}
            category_name={category_info.name}
            category_type={category_info.type}
            setDialogStyled={setDialogStyled}
            settlementsParams={settlementsParams}
        />
    );
}
