import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { UseFormReturn } from 'react-hook-form';
import { CreateNewCompanyDefaultValues } from '@/layouts/UserLayout/Navigation/dialogs/CreateNewCompany/helpers';
import StateSelect from '@/@core/fields/select/StateSelect';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import SYSTEM from '@/@system';
import CreateNewCompanyDotField from '@/layouts/UserLayout/Navigation/dialogs/CreateNewCompany/components/CreateNewCompanyDotField';
import VectorIcons from '@/@core/icons/vector_icons';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    methods: UseFormReturn<CreateNewCompanyDefaultValues>;
};

export default function CreateNewCompanyFields({ methods }: Props) {
    const {
        control,
        formState: { errors }
    } = methods;

    return (
        <DialogComponents.Fields
            rowSpacing={3}
            columnSpacing={0}
        >
            <DialogComponents.Field xs={12}>
                <CreateNewCompanyDotField methods={methods} />
            </DialogComponents.Field>

            <DialogComponents.SectionTitle
                title="navigation:menu.create.new_company.sections.details"
                sx={{ mt: '4px' }}
                startIcon={(
                    <VectorIcons.FullDialogIcons.DetailsIcon
                        color="primary"
                        sx={{ fontSize: '24px' }}
                    />
                )}
            />
            <DialogComponents.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:company_name.label"
                    name="company_name"
                    placeholder="fields:company_name.placeholder"
                    width="100%"
                    required
                />
            </DialogComponents.Field>

            <DialogComponents.SectionTitle
                title="navigation:menu.create.new_company.sections.contact_info"
                sx={{ mt: '4px' }}
                startIcon={(
                    <VectorIcons.FullDialogIcons.ContactInfoIcon
                        color="primary"
                        sx={{ fontSize: '24px' }}
                    />
                )}
            />
            <DialogComponents.Field xs={6}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    name="phone_number"
                    placeholder="fields:phone_number.placeholder"
                    label="fields:phone_number.label"
                    width="100%"
                    required
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:email.label"
                    name="email"
                    placeholder=""
                    placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                    width="100%"
                    required
                />
            </DialogComponents.Field>

            <DialogComponents.SectionTitle
                title="navigation:menu.create.new_company.sections.address_info"
                sx={{ mt: '4px' }}
                startIcon={<VectorIcons.FullDialogIcons.AddressInfo size={22} />}
            />
            <DialogComponents.Field xs={6}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="location_id_line1"
                    label="fields:address_line_1.label"
                    placeholder="fields:address_line_1.placeholder"
                    required
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="location_id_line2"
                    label="fields:address_line_2.label"
                    placeholder="fields:address_line_2.placeholder"
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={4}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="location_id_city"
                    label="fields:city.label"
                    placeholder="fields:city.placeholder"
                    required
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={4}>
                <StateSelect
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:state.label"
                    name="location_id_state"
                    required
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={4}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:postal_code.label"
                    name="location_id_postal_code"
                    placeholder="fields:postal_code.placeholder"
                    required
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}
