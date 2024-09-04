/* eslint-disable react/no-unused-prop-types */
import { useMemo } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { color_options } from '@/views/fleet/trucks/dialogs/EditTruck/edit_truck_options';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import CustomEffectAutocomplete, {
    OptionObjects
} from '@/@core/fields/select/components/CustomEffectAutocomplete';
import { TestIDs } from '@/configs/tests';

export interface CustomInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    required?: boolean;
    testID?: string;
    name?: Path<TFieldValues>;
}

export default function ColorSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    testID,
    required = false
}: CustomInputProps<TFieldValues>) {
    const {
        field: { value }
    } = useController({
        name: 'color' as Path<TFieldValues>,
        control
    });
    const { t } = useAppTranslation();
    const options = color_options(t);

    const colors_by_id = useMemo(() => {
        const colors_object: OptionObjects = {};

        options.forEach((color) => {
            colors_object[color.name] = color;
        });

        return colors_object;
    }, []);

    const selected_color = colors_by_id[value];

    return (
        <CustomEffectAutocomplete
            control={control}
            required={required}
            name={'color' as Path<TFieldValues>}
            options={options}
            label="core:selects.color.label"
            inputTestID={testID}
            optionTestId={TestIDs.components.select.color.optionPrefix}
            entities_by_id={colors_by_id}
            inputProps={{
                startAdornment:
                    selected_color && selected_color.marker ? selected_color.marker() : ''
            }}
        />
    );
}
