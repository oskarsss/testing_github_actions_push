import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import { useServiceProvidersMap } from '@/store/hash_maps/hooks';
import { useMemo } from 'react';
import CustomAutocomplete, {
    type Option
} from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useCreateServiceProvider } from '@/views/maintenance/service-providers/modals/CreateServiceProvider';
import SelectOption from './SelectOption';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    required?: boolean;
}

export default function ServiceProviderSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    required = false
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const providers = useServiceProvidersMap();
    const createServiceProviderDialog = useCreateServiceProvider();

    const {
        field: { onChange }
    } = useController({
        name,
        control
    });

    const openCreateServiceProvider = () => {
        createServiceProviderDialog.open({
            onSuccessfulCreate: (providerId) => onChange(providerId)
        });
    };

    const {
        options,
        providersById
    } = useMemo(() => {
        const options: Option[] = Object.values(providers)
            .filter((provider) => !provider.deleted)
            .map((provider) => ({
                id           : provider.serviceProviderId,
                name         : provider.name,
                optionContent: <SelectOption provider={provider} />
            }));

        return { options, providersById: createMap(options, 'id') };
    }, [providers]);

    return (
        <CustomAutocomplete
            control={control}
            name={name}
            label="common:provider"
            options={options}
            entities_by_id={providersById}
            required={required}
            inputProps={{
                placeholder: t('common:provider')
            }}
            onAdd={openCreateServiceProvider}
        />
    );
}
