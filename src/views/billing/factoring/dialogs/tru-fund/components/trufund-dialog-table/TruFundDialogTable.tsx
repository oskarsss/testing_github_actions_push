/* eslint-disable no-nested-ternary */

import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import TableBody from '@mui/material/TableBody';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import { IP_TruFund_Invoices_PreviewReply } from '@proto/integration_provider_trufund';
import { Fade } from '@mui/material';
import { useBrokersMap, useCustomersMap } from '@/store/hash_maps/hooks';
import { TruFundInvoice } from '@/views/billing/factoring/dialogs/tru-fund/helpers';
import TruFundDialogTableBodyRows from './TruFundDialogTableBodyRows';
import TruFundDialogTableHeader from './TruFundDialogTableHeader';
import columns from './columns';

const columnCheckbox: MiniTableColumnType<TruFundInvoice> = {
    minWidth  : 40,
    headerName: '',
    field     : 'checkbox',
    renderCell: () => null
};

type Props = {
    data?: IP_TruFund_Invoices_PreviewReply;
    selected: TruFundInvoice[];
    setSelected: Dispatch<SetStateAction<TruFundInvoice[]>>;
    executeAction: MiniTableExecuteActionType<TruFundInvoice>;
    errorText?: string;
};

export default function TruFundDialogTable({
    data,
    executeAction,
    selected,
    setSelected,
    errorText
}: Props) {
    const brokersMap = useBrokersMap();
    const customersMap = useCustomersMap();

    const invoices: TruFundInvoice[] = useMemo(() => {
        if (!data?.invoices) return [];
        return [...data.invoices]
            .map((invoice) => {
                if (invoice.brokerId) {
                    const broker = brokersMap[invoice.brokerId];
                    return {
                        ...invoice,
                        clientName: broker ? `${broker.name || 'N/A'} (${broker.mc})` : ''
                    };
                }
                const customer = customersMap[invoice.customerId];
                return {
                    ...invoice,
                    clientName: customer?.name || ''
                };
            })
            .sort((a, b) => (a.hasErrors ? 1 : b.hasErrors ? -1 : 0));
    }, [data?.invoices, brokersMap, customersMap]);

    return (
        <Fade in>
            <MiniTableStyled.Container sx={{ overflow: 'auto' }}>
                <MiniTableStyled.CommonTable
                    sx={{ borderCollapse: 'separate' }}
                    stickyHeader
                    size="small"
                    width="100%"
                >
                    <TruFundDialogTableHeader
                        selected={selected}
                        invoices={invoices.filter(
                            (invoice) => !invoice.hasErrors && invoice.brokerId
                        )}
                        setSelected={setSelected}
                    />

                    <TableBody>
                        {!invoices.length ? (
                            <MiniTableNoItems
                                colSpan={columns.length + 1}
                                text={
                                    errorText ? (
                                        <span>{errorText}</span>
                                    ) : (
                                        'billing:dialogs.apex.no_invoices'
                                    )
                                }
                            />
                        ) : (
                            <>
                                <TruFundDialogTableBodyRows
                                    invoices={invoices}
                                    selected={selected}
                                    setSelected={setSelected}
                                    executeAction={executeAction}
                                />
                                <TotalsRow
                                    without_border
                                    fontSize="large"
                                    columns={[columnCheckbox, ...columns]}
                                    info_config={{
                                        amount         : data?.totalAmount,
                                        factoringAmount: data?.totalFactoringAmount,
                                        companyNet     : data?.totalCompanyNet
                                    }}
                                />
                            </>
                        )}
                    </TableBody>
                </MiniTableStyled.CommonTable>
            </MiniTableStyled.Container>
        </Fade>
    );
}
