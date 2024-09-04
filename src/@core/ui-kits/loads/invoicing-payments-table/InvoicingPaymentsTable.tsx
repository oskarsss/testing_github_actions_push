import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { useEditInvoicePaymentMenu } from '@/views/dispatch/orders/menus/invoice-payment/EditInvoicePaymentMenu';
import { usePermissions } from '@/store/app/hooks';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { LoadInvoicePaymentItemGetForLoadReply_InvoicePaymentItem } from '@proto/load_invoice_payment_items';
import React from 'react';
import LoadInvoicePaymentsGrpcService from '@/@grpcServices/services/loads-service/load-invoice-payments.service';
import { useStableArray } from '@/hooks/useStable';
import columns from './columns';

type Props = {
    loadId: string;
    invalidateSettlement?: () => void;
};

function InvoicingPaymentsTable({
    loadId,
    invalidateSettlement
}: Props) {
    const { hasPermission } = usePermissions();

    const { data } = LoadInvoicePaymentsGrpcService.useGetInvoicePaymentItemsQuery({
        loadId
    });

    const invoiceItems = useStableArray(data?.invoicePaymentItems);

    const editInvoicePaymentMenu = useEditInvoicePaymentMenu();

    const canEdit = hasPermission(PERMISSIONS.EDIT_LOAD_INVOICE_PAYMENTS);

    const executeAction: MiniTableExecuteActionType<
        LoadInvoicePaymentItemGetForLoadReply_InvoicePaymentItem
    > = (name, props) => {
        if (canEdit) {
            editInvoicePaymentMenu.open({
                load_id: loadId,
                item   : props.row,
                invalidateSettlement
            })(props.event);
        }
    };

    return (
        <MiniTable
            columns={columns}
            fontSize="large"
            turnOffBorder
            rows={invoiceItems}
            elementKey="invoicePaymentItemId"
            executeAction={executeAction}
            ComponentAfterContent={(
                <TotalsRow
                    without_border
                    fontSize="large"
                    columns={columns}
                    info_config={{
                        amount: data?.invoicePaymentTotalAmountFormatted || '0'
                    }}
                />
            )}
        />
    );
}

export default React.memo(InvoicingPaymentsTable);
