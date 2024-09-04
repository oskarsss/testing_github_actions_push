import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import LoadsTypes from '@/store/dispatch/loads/types';
import { useEditInvoiceItemMenu } from '@/views/dispatch/orders/menus/invoice-item/EditInvoiceItemMenu';
import { useAddInvoiceItemMenu } from '@/views/dispatch/orders/menus/invoice-item/AddInvoiceItemMenu';
import { usePermissions } from '@/store/app/hooks';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { PERMISSIONS } from '@/models/permissions/permissions';
import LoadInvoiceItemsGrpcService from '@/@grpcServices/services/loads-service/load-invoice-items.service';
import { useLoadInvoiceCategoriesMap } from '@/store/hash_maps/hooks';
import React from 'react';
import AddItemButton from '../add-item-button/AddItemButton';
import columns from './columns';

type Props = {
    loadId: string;
    invoiceAmount: string;
    invalidateSettlement?: () => void;
    enableAddItem?: boolean;
    stickyHeader?: boolean;
};

function InvoiceItemsTable({
    loadId,
    invoiceAmount,
    invalidateSettlement,
    enableAddItem = false,
    stickyHeader
}: Props) {
    const { hasPermission } = usePermissions();
    const invoiceCategoriesMap = useLoadInvoiceCategoriesMap();

    const { invoiceItems } = LoadInvoiceItemsGrpcService.useGetInvoiceItemsForLoadQuery(
        {
            loadId
        },
        {
            selectFromResult: (result) => ({
                ...result,
                invoiceItems:
                    result.data?.invoiceItems.map((item): LoadsTypes.InvoiceItem => {
                        const category = invoiceCategoriesMap[item.categoryId];
                        return {
                            ...item,
                            categoryName        : category?.name || '',
                            includeInGrossAmount: category?.includeInGrossAmount || false
                        };
                    }) || []
            })
        }
    );

    const editInvoiceItemMenu = useEditInvoiceItemMenu();
    const addInvoiceItemMenu = useAddInvoiceItemMenu();

    const canEdit = hasPermission(PERMISSIONS.EDIT_LOAD_INVOICING);

    const executeAction: MiniTableExecuteActionType<LoadsTypes.InvoiceItem> = (name, props) => {
        if (canEdit) {
            editInvoiceItemMenu.open({
                load_id: loadId,
                item   : props.row,
                invalidateSettlement
            })(props.event);
        }
    };

    return (
        <MiniTable
            stickyHeader={stickyHeader}
            columns={columns}
            fontSize="large"
            turnOffBorder
            rows={invoiceItems}
            elementKey="invoiceItemId"
            executeAction={executeAction}
            ComponentAfterContent={(
                <TotalsRow
                    without_border
                    fontSize="large"
                    columns={columns}
                    info_config={{
                        total_amount: invoiceAmount,
                        ...(enableAddItem && {
                            category_name: (
                                <AddItemButton
                                    onClick={(e) => addInvoiceItemMenu.open({ load_id: loadId })(e)}
                                />
                            )
                        })
                    }}
                />
            )}
        />
    );
}

export default React.memo(InvoiceItemsTable);
