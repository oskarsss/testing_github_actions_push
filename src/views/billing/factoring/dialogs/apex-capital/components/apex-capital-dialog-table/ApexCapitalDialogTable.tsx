/* eslint-disable no-nested-ternary */

import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import TableBody from '@mui/material/TableBody';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import columns from '@/views/billing/factoring/dialogs/apex-capital/components/apex-capital-dialog-table/columns';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import { IP_ApexCapital_Invoices_PreviewReply } from '@proto/integration_provider_apexcapital';
import ApexCapitalDialogTableHeader from '@/views/billing/factoring/dialogs/apex-capital/components/apex-capital-dialog-table/ApexCapitalDialogTableHeader';
import ApexCapitalDialogTableBodyRows from '@/views/billing/factoring/dialogs/apex-capital/components/apex-capital-dialog-table/ApexCapitalDialogTableBodyRows';
import { Fade } from '@mui/material';
import { useBrokersMap } from '@/store/hash_maps/hooks';
import { ApexCapitalInvoice } from '@/views/billing/factoring/dialogs/apex-capital/types';

const columnCheckbox: MiniTableColumnType<ApexCapitalInvoice> = {
    minWidth  : 40,
    headerName: '',
    field     : 'checkbox',
    renderCell: () => null
};

type Props = {
    data?: IP_ApexCapital_Invoices_PreviewReply;
    selected: ApexCapitalInvoice[];
    setSelected: Dispatch<SetStateAction<ApexCapitalInvoice[]>>;
    executeAction: MiniTableExecuteActionType<ApexCapitalInvoice>;
    errorText?: string;
};

export default function ApexCapitalDialogTable({
    data,
    executeAction,
    selected,
    setSelected,
    errorText
}: Props) {
    const brokersMap = useBrokersMap();
    const invoices: ApexCapitalInvoice[] = useMemo(() => {
        if (!data?.invoices) return [];
        return [...data.invoices]
            .map((invoice) => {
                const broker = brokersMap[invoice.brokerId];
                return {
                    ...invoice,
                    brokerId  : broker?.brokerId || '',
                    brokerName: broker?.name || '',
                    brokerMc  : broker?.mc || '-'
                };
            })
            .sort((a, b) => (a.hasErrors ? 1 : b.hasErrors ? -1 : 0));
    }, [data?.invoices, brokersMap]);

    return (
        <Fade in>
            <MiniTableStyled.Container sx={{ overflow: 'auto' }}>
                <MiniTableStyled.CommonTable
                    sx={{ borderCollapse: 'separate' }}
                    stickyHeader
                    size="small"
                    width="100%"
                >
                    <ApexCapitalDialogTableHeader
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
                                <ApexCapitalDialogTableBodyRows
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
