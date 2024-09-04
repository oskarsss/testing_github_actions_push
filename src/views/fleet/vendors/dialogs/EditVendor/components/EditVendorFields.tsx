import FullDialog from '@/@core/ui-kits/full-dialog';
import EditVendorBasicDetails from './FieldsGroups/EditVendorBasicDetails';
import EditVendorAddress from './FieldsGroups/EditVendorAddress';
import EditVendorTaxSettings from './FieldsGroups/EditVendorTaxSettings';
import EditVendorContactDetails from './FieldsGroups/EditVendorContactDetails';

export default function EditVendorFields() {
    return (
        <FullDialog.Fields>
            <EditVendorBasicDetails />
            <EditVendorAddress />
            <EditVendorTaxSettings />
            <EditVendorContactDetails />
        </FullDialog.Fields>
    );
}
