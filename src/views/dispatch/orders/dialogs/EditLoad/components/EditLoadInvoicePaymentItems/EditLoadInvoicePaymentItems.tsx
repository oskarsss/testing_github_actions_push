import CustomEditLoadHeader from '@/views/dispatch/orders/dialogs/EditLoad/components/reusable_components/CustomEditLoadHeader';
import VectorIcons from '@/@core/icons/vector_icons';
import LoadsTypes from '@/store/dispatch/loads/types';
import { useAddInvoicePaymentMenu } from '@/views/dispatch/orders/menus/invoice-payment/AddInvoicePaymentMenu';
import InvoicingPaymentsTable from '@/@core/ui-kits/loads/invoicing-payments-table/InvoicingPaymentsTable';

type Props = {
    load: LoadsTypes.Load.Load;
    invalidateSettlement: () => void;
};

export default function EditLoadInvoicePaymentItems({
    load,
    invalidateSettlement
}: Props) {
    const addInvoicePaymentMenu = useAddInvoicePaymentMenu();

    return (
        <>
            <CustomEditLoadHeader
                icon={<VectorIcons.FullDialogIcons.Invoice />}
                title="modals:loads.edit_load.titles.invoicing_payments"
                add={addInvoicePaymentMenu.open({ load_id: load.loadId, invalidateSettlement })}
            />

            <InvoicingPaymentsTable
                loadId={load.loadId}
                invalidateSettlement={invalidateSettlement}
            />
        </>
    );
}
