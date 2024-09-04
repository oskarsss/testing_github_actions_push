import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import SYSTEM from '@/@system';
import FullDialog from '@/@core/ui-kits/full-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import StateSelect from '@/@core/fields/select/StateSelect';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import { Control, FieldErrors } from 'react-hook-form';
import { memo } from 'react';
import { DefaultValues } from '@/views/maintenance/service-providers/modals/service-providers-modals-utils';

type Props = {
    control: Control<DefaultValues>;
    errors: FieldErrors<DefaultValues>;
};

function Form({
    control,
    errors
}: Props) {
    return (
        <DialogComponents.Fields
            columnSpacing={0}
            rowSpacing={3}
        >
            <DialogComponents.SectionTitle
                startIcon={(
                    <VectorIcons.Maintenance.ServiceProviders
                        sx={{ fill: ({ palette }) => palette.semantic.foreground.brand.primary }}
                    />
                )}
                title="maintenance:service_providers.modals.form.sections.contact_info"
            />

            <DialogComponents.Field xs={12}>
                <TextInput
                    required
                    label="fields:name.label"
                    control={control}
                    errors={errors}
                    name="name"
                    placeholder="fields:name.placeholder"
                    width="100%"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <TextInput
                    label="fields:contact_name.label"
                    control={control}
                    errors={errors}
                    name="contactName"
                    placeholder="fields:contact_name.placeholder"
                    width="100%"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    name="phone"
                    placeholder="fields:phone_number.placeholder"
                    label="fields:phone_number.label"
                    width="100%"
                />
            </DialogComponents.Field>

            <FullDialog.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="email"
                    placeholder=""
                    placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                    label="fields:email.label"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    name="fax"
                    placeholder="fields:fax.placeholder"
                    label="fields:fax.label"
                    width="100%"
                    hideCountrySelect
                />
            </FullDialog.Field>

            <DialogComponents.SectionTitle
                startIcon={<VectorIcons.FullDialogIcons.AddressInfo />}
                title="maintenance:service_providers.modals.form.sections.address_info"
            />

            <FullDialog.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
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
                    name="addressState"
                    placeholder="fields:state.placeholder"
                    label="fields:state.label"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={3}>
                <NumberInput
                    control={control}
                    errors={errors}
                    name="addressPostalCode"
                    placeholder="fields:postal_code.placeholder"
                    label="fields:postal_code.zip_label"
                    width="100%"
                    inputProps={{
                        inputProps: {
                            min: '0'
                        }
                    }}
                />
            </FullDialog.Field>
        </DialogComponents.Fields>
    );
}

export default memo(Form);
