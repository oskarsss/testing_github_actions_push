import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import { useFormContext } from 'react-hook-form';
import VectorIcons from '@/@core/icons/vector_icons';
import type { DefaultValues } from '@/views/dispatch/customers/dialogs/EditCustomer/edit-customer-utils';

export default function EditCustomerAddressFields() {
    const {
        control,
        formState: { errors }
    } = useFormContext<DefaultValues>();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.AddressInfo />}
                title="modals:customers.edit.fields.group_title.address_info"
            />

            <FullDialog.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="addressLine1"
                    label="fields:address_line_1.label"
                    placeholder="fields:address_line_1.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="addressLine2"
                    placeholder="fields:address_line_2.placeholder"
                    label="fields:address_line_2.label"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={4.5}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="addressCity"
                    placeholder="fields:city.placeholder"
                    label="fields:city.label"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4.5}>
                <StateSelect
                    width="100%"
                    control={control}
                    errors={errors}
                    name="addressState"
                    placeholder="fields:state.placeholder"
                    label="fields:state.label"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={3}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="addressPostalCode"
                    placeholder="fields:postal_code.placeholder"
                    label="fields:postal_code.label"
                    type="number"
                />
            </FullDialog.Field>
        </>
    );
}
