import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useAllTrailersTypes } from '@/store/fleet/trailers/hooks';
import { CSSProperties, useMemo } from 'react';
import CustomAutocomplete, {
    OptionObjects
} from '@/@core/fields/select/components/CustomAutocomplete';
import { TestIDs } from '@/configs/tests';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    width?: CSSProperties['width'];
    required?: boolean;
    testID?: string;
}

export default function TrailerTypesSelect<TFieldsValues extends FieldValues = FieldValues>({
    control,
    width = '100%',
    required = true,
    testID
}: Props<TFieldsValues>) {
    const {
        field: { value }
    } = useController({
        name: 'trailer_type_id' as Path<TFieldsValues>,
        control
    });
    const { types } = useAllTrailersTypes();

    const types_options = useMemo(
        () =>
            types.map((type) => ({
                id    : type.trailerTypeId,
                name  : type.name,
                marker: getTrailerTypeIcon(type.icon)
            })),
        [types]
    );

    const types_by_id = useMemo(() => {
        const types_object: OptionObjects = {};

        types_options.forEach((type) => {
            types_object[type.id] = type;
        });

        return types_object;
    }, [types]);

    const selected_type_icon = types_by_id[value];

    return (
        <CustomAutocomplete
            required={required}
            control={control}
            name={'trailer_type_id' as Path<TFieldsValues>}
            label="core:selects.trailer_type.label"
            options={types_options}
            entities_by_id={types_by_id}
            width={width}
            inputProps={{
                startAdornment: selected_type_icon?.marker || ''
            }}
            testOptions={{
                inputTestID : testID,
                optionTestId: TestIDs.components.select.trailerType.optionPrefix
            }}
        />
    );
}
