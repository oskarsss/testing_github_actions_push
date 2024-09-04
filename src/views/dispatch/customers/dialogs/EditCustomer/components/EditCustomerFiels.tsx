import FullDialog from '@/@core/ui-kits/full-dialog';
import EditCustomerPersonalFields from '@/views/dispatch/customers/dialogs/EditCustomer/components/FieldsGroups/EditCustomerPersonalFields';
import EditCustomerAddressFields from '@/views/dispatch/customers/dialogs/EditCustomer/components/FieldsGroups/EditCustomerAddressFields';

export default function EditCustomerFields() {
    return (
        <FullDialog.Fields rowSpacing={5}>
            <EditCustomerPersonalFields />
            <EditCustomerAddressFields />
        </FullDialog.Fields>
    );
}
