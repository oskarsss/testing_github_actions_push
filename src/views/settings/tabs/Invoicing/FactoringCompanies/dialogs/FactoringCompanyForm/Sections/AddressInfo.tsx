import DialogComponents from '@/@core/ui-kits/common-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import TextInput from '@/@core/fields/inputs/TextInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import { useFactoringCompanyFormContext } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/FactoringCompanyForm';
import SectionHeader from './SectionHeader';

export default function AddressInfo() {
    const {
        control,
        formState: { errors }
    } = useFactoringCompanyFormContext();

    return (
        <>
            <SectionHeader
                startIcon={<VectorIcons.FullDialogIcons.AddressInfo />}
                title="modals:settings.invoicing.factoring_companies.sections.address_info"
            />

            <DialogComponents.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="address.line1"
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
                    name="address.line2"
                    placeholder="fields:address_line_2.placeholder"
                    label="fields:address_line_2.label"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={4}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="address.city"
                    placeholder="fields:city.placeholder"
                    label="fields:city.label"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={5}>
                <StateSelect
                    width="100%"
                    control={control}
                    errors={errors}
                    name="address.state"
                    placeholder="fields:state.placeholder"
                    label="fields:state.label"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={3}>
                <NumberInput
                    control={control}
                    errors={errors}
                    name="address.postalCode"
                    placeholder="fields:postal_code.placeholder"
                    label="fields:postal_code.label"
                    width="100%"
                    inputProps={{
                        inputProps: {
                            min: '0'
                        }
                    }}
                />
            </DialogComponents.Field>
        </>
    );
}
