import DialogComponents from '@/@core/ui-kits/common-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import TextInput from '@/@core/fields/inputs/TextInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import { Control, FieldErrors } from 'react-hook-form';
import { InvoicingCompanyDefaultValue } from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/config';
import SectionHeader from './SectionHeader';

type Props = {
    control: Control<InvoicingCompanyDefaultValue>;
    errors: FieldErrors<InvoicingCompanyDefaultValue>;
};

export default function AddressInfo({
    control,
    errors
}: Props) {
    return (
        <>
            <SectionHeader
                startIcon={<VectorIcons.FullDialogIcons.AddressInfo />}
                title="modals:settings.invoicing.invoicing_companies.sections.address_info"
            />

            <DialogComponents.Field xs={6}>
                <TextInput
                    required
                    control={control}
                    errors={errors}
                    name="addressLine1"
                    placeholder="fields:address_line_1.placeholder"
                    label="fields:address_line_1.label"
                    width="100%"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="addressLine2"
                    placeholder="fields:address_line_2.placeholder"
                    label="fields:address_line_2.label"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={4}>
                <TextInput
                    required
                    width="100%"
                    control={control}
                    errors={errors}
                    name="addressCity"
                    placeholder="fields:city.placeholder"
                    label="fields:city.label"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={5}>
                <StateSelect
                    required
                    width="100%"
                    control={control}
                    errors={errors}
                    name="addressState"
                    placeholder="fields:state.placeholder"
                    label="fields:state.label"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={3}>
                <TextInput
                    required
                    control={control}
                    errors={errors}
                    name="addressPostalCode"
                    placeholder="fields:postal_code.placeholder"
                    label="fields:postal_code.label"
                    width="100%"
                />
            </DialogComponents.Field>
        </>
    );
}
