import { useAddInvoiceItemMenu } from '@/views/dispatch/orders/menus/invoice-item/AddInvoiceItemMenu';
import VectorIcons from '@/@core/icons/vector_icons';
import CustomEditLoadHeader from '@/views/dispatch/orders/dialogs/EditLoad/components/reusable_components/CustomEditLoadHeader';
import React from 'react';
import LoadFactoringCompanyField from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-invoice-factoring-company/LoadFactoringCompanyField';
import InvoiceItemsTable from '@/@core/ui-kits/loads/invoice-items-table/InvoiceItemsTable';
import { LoadData_Load } from '@proto/loads';
import LoadInvoicingCompanyField from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-invoicing-company-select/LoadInvoicingCompanyField';

type Props = {
    load: LoadData_Load;
    invalidateSettlement: () => void;
};
export default function EditLoadInvoiceItems({
    load,
    invalidateSettlement
}: Props) {
    const addInvoiceItemMenu = useAddInvoiceItemMenu();

    return (
        <>
            <CustomEditLoadHeader
                icon={<VectorIcons.FullDialogIcons.Invoice />}
                title="common:invoicing"
                add={addInvoiceItemMenu.open({ load_id: load.loadId, invalidateSettlement })}
            >
                <LoadInvoicingCompanyField
                    loadId={load.loadId}
                    invoicingCompanyId={load.invoicingCompanyId}
                />
                <LoadFactoringCompanyField
                    loadId={load.loadId}
                    invoiceFactoringCompanyId={load.invoiceFactoringCompanyId}
                />
            </CustomEditLoadHeader>

            <InvoiceItemsTable
                loadId={load.loadId}
                invoiceAmount={load.invoiceAmount}
                invalidateSettlement={invalidateSettlement}
            />
        </>
    );
}
