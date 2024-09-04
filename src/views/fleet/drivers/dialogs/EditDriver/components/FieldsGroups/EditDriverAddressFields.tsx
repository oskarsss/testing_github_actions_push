import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import { TestIDs } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import VectorIcons from '@/@core/icons/vector_icons';
import { useEditDriverForm } from '../../EditDriverForm';

export default function EditDriverAddressFields() {
    const { t } = useAppTranslation();
    const {
        control,
        formState: { errors }
    } = useEditDriverForm();
    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.AddressInfo />}
                title="modals:drivers.edit.block_title.address"
            />

            <FullDialog.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.addressLine1}
                    name="addressLine1"
                    placeholder="fields:address_line_1.placeholder"
                    label="fields:address_line_1.label"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.addressLine2}
                    name="addressLine2"
                    placeholder="fields:address_line_2.placeholder"
                    label="fields:address_line_2.label"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={5}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.city}
                    name="addressCity"
                    placeholder="fields:city.placeholder"
                    label="fields:city.label"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4}>
                <StateSelect
                    width="100%"
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.state}
                    name="addressState"
                    placeholder="fields:state.placeholder"
                    label="fields:state.label"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={3}>
                <NumberInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.postalCode}
                    name="addressPostalCode"
                    placeholder="fields:postal_code.placeholder"
                    label="fields:postal_code.label"
                    width="100%"
                    inputProps={{
                        inputProps: {
                            min: '0'
                        }
                    }}
                />
            </FullDialog.Field>
        </>
    );
}
