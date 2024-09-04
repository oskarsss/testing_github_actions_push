import SelectInput from '@/@core/fields/inputs/SelectInput';
import { Control, ErrorOption, FieldValues, Path } from 'react-hook-form';
import { CSSProperties } from 'react';
import { Countries } from '@/models/country/country';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

interface CountySelectProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    label?: IntlMessageKey;
    name: Path<TFieldValues>;
    width?: CSSProperties['width'];
    required?: boolean;
}

export default function CountrySelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label = 'core:selects.country.label',
    name,
    width = '100%',
    required = false
}: CountySelectProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const options = Object.values(Countries).map((country) => ({
        label: t(`common:country.${country}`),
        value: country
    }));

    return (
        <SelectInput
            control={control}
            errors={errors}
            label={label}
            name={name}
            width={width}
            required={required}
            options={options}
        />
    );
}
