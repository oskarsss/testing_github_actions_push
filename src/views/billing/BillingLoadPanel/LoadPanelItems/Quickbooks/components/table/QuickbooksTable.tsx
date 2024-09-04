import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import React, { useMemo } from 'react';
import QuickbooksColumns from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/components/table/columns';
import { IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice } from '@proto/integration_provider_quickbooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const defaultValue: IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice = {
    quickbooksInvoiceId         : '',
    balance                     : '',
    totalAmount                 : '',
    invoicePdfPath              : '',
    emailStatus                 : '',
    allowOnlineAchPayment       : false,
    docNumber                   : '',
    invoiceLink                 : '',
    updatedAt                   : '',
    printStatus                 : '',
    allowOnlineCreditCardPayment: false
};

type Props = {
    quickbooksInvoiceItems?: IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice[];
};

export default function QuickbooksTable({ quickbooksInvoiceItems }: Props) {
    const { t } = useAppTranslation();

    const items = useMemo(() => {
        if (!quickbooksInvoiceItems || quickbooksInvoiceItems.length === 0) return [defaultValue];
        return quickbooksInvoiceItems;
    }, [quickbooksInvoiceItems]);

    return (
        <MiniTableStyled.Container>
            <MiniTableStyled.CommonTable without_border>
                <MiniTableStyled.HeaderRow without_border>
                    {QuickbooksColumns.map((col) => (
                        <MiniTableStyled.HeaderCell
                            key={col.field}
                            width={col.minWidth}
                            sx={{
                                fontSize  : '12px !important',
                                fontWeight: 700,
                                ...col?.styles
                            }}
                        >
                            {typeof col.headerName === 'string'
                                ? t(col.headerName)
                                : col.headerName}
                        </MiniTableStyled.HeaderCell>
                    ))}
                </MiniTableStyled.HeaderRow>
                {items.map((data) => (
                    <MiniTableStyled.Row
                        tabIndex={-1}
                        shadow={false}
                        key={data.quickbooksInvoiceId ?? 'default'}
                    >
                        {QuickbooksColumns.map((col) => (
                            <MiniTableStyled.Cell
                                key={col.field}
                                width={col.minWidth}
                                style={{
                                    fontSize  : '14px',
                                    fontWeight: 500,
                                    ...col?.styles
                                }}
                                sx={col.getCellStyle?.(data)}
                                color="theme.palette.semantic.text.secondary"
                                height="34px"
                            >
                                {col.renderCell(data, t)}
                            </MiniTableStyled.Cell>
                        ))}
                    </MiniTableStyled.Row>
                ))}
            </MiniTableStyled.CommonTable>
        </MiniTableStyled.Container>
    );
}
