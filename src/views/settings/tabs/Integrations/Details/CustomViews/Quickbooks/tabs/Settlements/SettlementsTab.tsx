import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { Stack } from '@mui/material';
import { useEditSettlementsQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditSettlementsQBDialog';
import { RowClickAction } from '@/views/settings/components/Table/types';
import {
    SettlementRevenueTabData,
    SettlementTabData
} from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import {
    columns,
    revenueColumns
} from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Settlements/columns';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import React from 'react';
import { useEditSettlementRevenueTypesQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditSettlementRevenueTypesQBDialog';

export type SettlementTableProps = {
    debit: SettlementTabData[];
    credit: SettlementTabData[];
    revenue: SettlementRevenueTabData[];
};

export default function SettlementsTab({
    debit,
    credit,
    revenue
}: SettlementTableProps) {
    const editDialog = useEditSettlementsQBDialog();
    const editRevenueType = useEditSettlementRevenueTypesQBDialog();

    const onClickRow: RowClickAction<SettlementTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editDialog.open({
            quickbooksId           : row.quickbooks_id,
            transactionCategoryId  : row.transactionCategoryId,
            transactionCategoryName: row.name
        });
    };

    const onClickRevenueRow: RowClickAction<SettlementRevenueTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editRevenueType.open({
            revenueTypeId               : row.revenueTypeId,
            revenueTypeName             : row.name,
            linkedToTotalLoadsAmountQBId: row.linkedToTotalLoadsAmount?.quickbooks_id,
            linkedToFuelAmountQBId      : row.linkedToFuelAmount?.quickbooks_id,
            linkedToTollsAmountQBId     : row.linkedToTollsAmount?.quickbooks_id
        });
    };

    return (
        <>
            <Stack
                gap="inherit"
                maxHeight="37%"
                overflow="hidden"
            >
                <IntegrationDetailsComponents.Right.Title>
                    Debit Categories
                </IntegrationDetailsComponents.Right.Title>
                <IntegrationDetailsTable
                    onClickRow={onClickRow}
                    items={debit}
                    keyField="transactionCategoryId"
                    loading={false}
                    columns={columns}
                />
            </Stack>

            <Stack
                gap="inherit"
                maxHeight="37%"
                overflow="hidden"
            >
                <IntegrationDetailsComponents.Right.Title>
                    Credit Categories
                </IntegrationDetailsComponents.Right.Title>
                <IntegrationDetailsTable
                    onClickRow={onClickRow}
                    items={credit}
                    keyField="transactionCategoryId"
                    loading={false}
                    columns={columns}
                />
            </Stack>

            <Stack
                gap="inherit"
                maxHeight="25%"
                overflow="hidden"
            >
                <IntegrationDetailsComponents.Right.Title>
                    Revenue Types
                </IntegrationDetailsComponents.Right.Title>
                <IntegrationDetailsTable
                    onClickRow={onClickRevenueRow}
                    items={revenue}
                    keyField="revenueTypeId"
                    loading={false}
                    columns={revenueColumns}
                />
            </Stack>
        </>
    );
}
