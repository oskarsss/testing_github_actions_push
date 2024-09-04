import { useAppTranslation } from '@/hooks/useAppTranslation';
import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import VectorIcons from '@/@core/icons/vector_icons';
import { TestIDs } from '@/configs/tests';
import SYSTEM from '@/@system';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useEditVendorForm } from '../../EditVendorForm';
import vendor_type_options from '../../../vendor_type_options';

export default function EditVendorBasicDetails() {
    const { t } = useAppTranslation();
    const {
        control,
        formState: { errors }
    } = useEditVendorForm();
    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.Invoice />}
                title="modals:vendors.edit.block_title.basic_details"
            />

            <FullDialog.Field xs={6}>
                <TextInput
                    name="name"
                    label="fields:name.label"
                    testID={TestIDs.pages.editVendor.fields.name}
                    control={control}
                    errors={errors}
                    placeholder="fields:name.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    name="friendlyName"
                    label="fields:friendly_name.label"
                    testID={TestIDs.pages.editVendor.fields.friendlyName}
                    control={control}
                    errors={errors}
                    placeholder="fields:friendly_name.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <SelectInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editVendor.fields.vendorsType}
                    label="fields:type.label"
                    name="type"
                    width="100%"
                    options={vendor_type_options(t)}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    name="email"
                    label="fields:email.label"
                    testID={TestIDs.pages.editVendor.fields.email}
                    control={control}
                    errors={errors}
                    placeholder=""
                    placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                    width="100%"
                />
            </FullDialog.Field>
        </>
    );
}
