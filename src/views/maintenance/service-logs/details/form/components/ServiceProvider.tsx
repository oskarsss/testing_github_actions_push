import FullDialog from '@/@core/ui-kits/full-dialog';
import { memo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { useServiceLogForm } from '@/views/maintenance/service-logs/details/form';
import ServiceProviderSelect from '@/views/maintenance/service-logs/ui-elements/selects/service-provider-select/ServiceProviderSelect';
import TextInput from '@/@core/fields/inputs/TextInput';

function ServiceProvider() {
    const {
        control,
        formState: { errors }
    } = useServiceLogForm();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={(
                    <VectorIcons.Maintenance.ServiceProviders
                        sx={{
                            fontSize: '32px',

                            fill: ({ palette }) => palette.semantic.foreground.brand.primary
                        }}
                    />
                )}
                title="maintenance:service_logs.modals.form.sections.service_provider.title"
            />

            <FullDialog.Field xs={8}>
                <ServiceProviderSelect
                    control={control}
                    name="serviceProviderId"
                    required
                />
            </FullDialog.Field>

            <FullDialog.Field xs={4}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="orderNumber"
                    required
                    placeholder="maintenance:service_logs.modals.form.sections.service_provider.fields.service_order.placeholder"
                    label="maintenance:service_logs.modals.form.sections.service_provider.fields.service_order.label"
                    width="100%"
                />
            </FullDialog.Field>
        </>
    );
}

export default memo(ServiceProvider);
