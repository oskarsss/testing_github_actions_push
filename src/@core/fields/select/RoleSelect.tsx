import SelectInput from '@/@core/fields/inputs/SelectInput';
import { Control, ErrorOption, FieldValues, Path } from 'react-hook-form';
import { CSSProperties } from 'react';
import { useActiveMainRoles } from '@/store/settings/roles/hooks';
import type { IntlMessageKey } from '@/@types/next-intl';

interface RoleSelectProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    label?: IntlMessageKey;
    name: Path<TFieldValues>;
    width?: CSSProperties['width'];
    required?: boolean;
}

export default function RoleSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label = 'core:selects.role.label',
    name,
    width = '100%',
    required = false
}: RoleSelectProps<TFieldValues>) {
    const { roles } = useActiveMainRoles();

    const options = roles.map((role) => ({
        label: role.name,
        value: role.roleId
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
