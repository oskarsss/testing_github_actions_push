import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import DateInput from '@/@core/fields/inputs/DateInput';
import VectorIcons from '@/@core/icons/vector_icons';
import { TestIDs } from '@/configs/tests';
import SYSTEM from '@/@system';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useEditDriverForm } from '../../EditDriverForm';

export default function EditDriverPersonalFields() {
    const {
        control,
        formState: { errors }
    } = useEditDriverForm();
    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.PersonalInfo />}
                title="modals:drivers.edit.block_title.personal"
            />
            <FullDialog.Field xs={4}>
                <TextInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.firstName}
                    name="firstName"
                    required
                    placeholder="fields:first_name.placeholder"
                    label="fields:first_name.label"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4}>
                <TextInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.middleName}
                    name="middleName"
                    placeholder="modals:drivers.edit.fields.middle_name.placeholder"
                    label="modals:drivers.edit.fields.middle_name.label"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4}>
                <TextInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.lastName}
                    name="lastName"
                    placeholder="fields:last_name.placeholder"
                    label="fields:last_name.label"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <DateInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.birthDate}
                    name="dobDate"
                    type="date"
                    label="modals:drivers.edit.fields.date_of_birth.label"
                    width="100%"
                    size="small"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.phoneNumber}
                    name="phoneNumber"
                    placeholder="fields:phone_number.placeholder"
                    label="fields:phone_number.label"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.email}
                    name="email"
                    placeholder=""
                    placeholderWithoutTranslate={SYSTEM.SUPPORT_EMAIL}
                    label="fields:email.label"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editDriver.fields.friendly_name}
                    name="friendlyName"
                    label="fields:friendly_name.label"
                    placeholder="fields:friendly_name.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
        </>
    );
}
