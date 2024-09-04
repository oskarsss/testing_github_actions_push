import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettingIcons from '@/views/settings/icons/icons';
import TextInput from '@/@core/fields/inputs/TextInput';
import PercentageInput from '@/@core/fields/inputs/PercentageInput';
import DateInput from '@/@core/fields/inputs/DateInput';
import { ButtonName } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/Details/components/UploadLogo/UploadButton';
import UploadLogo from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/Details/components/UploadLogo/UploadLogo';
import { useFactoringCompanyFormContext } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/FactoringCompanyForm';
import SectionHeader from '../SectionHeader';

export default function Details() {
    const {
        control,
        formState: { errors }
    } = useFactoringCompanyFormContext();

    return (
        <>
            <SectionHeader
                startIcon={(
                    <SettingIcons.FactoringCompanies
                        sx={{
                            svg: {
                                fill: (theme) => theme.palette.semantic.foreground.brand.primary
                            }
                        }}
                    />
                )}
                title="modals:settings.invoicing.factoring_companies.sections.details"
            />

            <DialogComponents.Field xs={12}>
                <TextInput
                    label="fields:name.label"
                    placeholder="fields:name.placeholder"
                    name="name"
                    width="100%"
                    errors={errors}
                    control={control}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={4}>
                <PercentageInput
                    control={control}
                    errors={errors}
                    name="feePercentage"
                    label="modals:settings.invoicing.factoring_companies.fields.feePercentage.label"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={4}>
                <DateInput
                    label="modals:settings.invoicing.factoring_companies.fields.contractEndAt.label"
                    name="contractEndAt"
                    type="date"
                    width="100%"
                    errors={errors}
                    control={control}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={4}>
                <TextInput
                    label="modals:settings.invoicing.factoring_companies.fields.cutoffTime.label"
                    placeholder="modals:settings.invoicing.factoring_companies.fields.cutoffTime.placeholder"
                    name="cutoffTime"
                    width="100%"
                    type="time"
                    errors={errors}
                    control={control}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <UploadLogo
                    isPrivate={false}
                    title="modals:settings.invoicing.factoring_companies.upload_logo.logoFileId.label"
                    name={ButtonName.LOGO_FILE_ID}
                    uploadType="image"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <UploadLogo
                    isPrivate
                    title="modals:settings.invoicing.factoring_companies.upload_logo.noaFileId.label"
                    name={ButtonName.NOA_FILE_ID}
                    uploadType="noa"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <TextInput
                    multiline
                    label="fields:note.label"
                    placeholder="fields:note.placeholder"
                    name="note"
                    width="100%"
                    errors={errors}
                    control={control}
                />
            </DialogComponents.Field>
        </>
    );
}
