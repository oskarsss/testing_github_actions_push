import FullDialog from '@/@core/ui-kits/full-dialog';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import VectorIcons from '@/@core/icons/vector_icons';
import { TestIDs } from '@/configs/tests';
import { useEditVendorForm } from '../../EditVendorForm';

export default function EditVendorTaxSettings() {
    const {
        control,
        formState: { errors }
    } = useEditVendorForm();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.Broker />}
                title="modals:vendors.edit.block_title.tax_settings"
            />

            <FullDialog.Field xs={12}>
                <NumberInput
                    control={control}
                    errors={errors}
                    name="taxId"
                    label="modals:vendors.edit.fields.tax_id.label"
                    testID={TestIDs.pages.editVendor.fields.taxID}
                    placeholder="modals:vendors.edit.fields.tax_id.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
        </>
    );
}
