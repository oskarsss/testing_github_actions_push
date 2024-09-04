import VectorIcons from '@/@core/icons/vector_icons';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { memo } from 'react';
import TextInput from '@/@core/fields/inputs/TextInput';
import { useServiceLogForm } from '@/views/maintenance/service-logs/details/form';
import DateInput from '@/@core/fields/inputs/DateInput';
import ServiceLogTypeSelect from '@/views/maintenance/service-logs/ui-elements/selects/ServiceLogTypeSelect';

function ServiceDetails() {
    const {
        control,
        formState: { errors }
    } = useServiceLogForm();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={(
                    <VectorIcons.FullDialogIcons.ContactInfoIcon
                        sx={{
                            fontSize: '32px',

                            color: ({ palette }) => palette.semantic.foreground.brand.primary
                        }}
                    />
                )}
                title="maintenance:service_logs.modals.form.sections.service_details.title"
            />

            <FullDialog.Field xs={4}>
                <DateInput
                    control={control}
                    errors={errors}
                    name="startDate"
                    type="date"
                    label="maintenance:service_logs.modals.form.sections.service_details.fields.date_in.label"
                    width="100%"
                    required
                />
            </FullDialog.Field>

            <FullDialog.Field xs={4}>
                <DateInput
                    control={control}
                    errors={errors}
                    name="endDate"
                    type="date"
                    label="maintenance:service_logs.modals.form.sections.service_details.fields.date_out.label"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={4}>
                <ServiceLogTypeSelect control={control} />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="description"
                    placeholder="maintenance:service_logs.modals.form.sections.service_details.fields.service_description.placeholder"
                    label="maintenance:service_logs.modals.form.sections.service_details.fields.service_description.label"
                    width="100%"
                />
            </FullDialog.Field>
        </>
    );
}

export default memo(ServiceDetails);
