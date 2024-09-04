import { styled } from '@mui/material';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FieldValues, Path, useController } from 'react-hook-form';
import type { TFunction } from '@/@types/next-intl';
import CustomEffectAutocomplete, {
    OptionObjects
} from '@/@core/fields/select/components/CustomEffectAutocomplete';
import { CustomInputProps } from '@/@core/fields/select/ColorSelect';
import createMap from '@/utils/create-map';

const Span = styled('span')(({ color }) => ({
    width          : 20,
    height         : 20,
    backgroundColor: color,
    marginRight    : 6,
    marginLeft     : 6,
    display        : 'inline-block'
}));

export function tableColorOptions(t: TFunction) {
    return [
        {
            id    : '',
            name  : 'default',
            label : t('core:selects.table_color.colors.default'),
            marker: () => <Span color="#F0F0F0" />
        },

        {
            id    : '1',
            name  : 'slate_gray',
            label : t('core:selects.table_color.colors.slate_gray'),
            marker: () => <Span color="#6B8E8D" />
        },
        {
            id    : '2',
            name  : 'steel_blue',
            label : t('core:selects.table_color.colors.steel_blue'),
            marker: () => <Span color="#4682B4" />
        },
        {
            id    : '3',
            name  : 'cadet_blue',
            label : t('core:selects.table_color.colors.cadet_blue'),
            marker: () => <Span color="#5F9EA0" />
        },
        {
            id    : '4',
            name  : 'dark_sea_green',
            label : t('core:selects.table_color.colors.dark_sea_green'),
            marker: () => <Span color="#8FBC8F" />
        },
        {
            id    : '5',
            name  : 'medium_turquoise',
            label : t('core:selects.table_color.colors.medium_turquoise'),
            marker: () => <Span color="#48D1CC" />
        },
        {
            id    : '6',
            name  : 'thistle',
            label : t('core:selects.table_color.colors.thistle'),
            marker: () => <Span color="#D8BFD8" />
        },
        {
            id    : '7',
            name  : 'light_steel_blue',
            label : t('core:selects.table_color.colors.light_steel_blue'),
            marker: () => <Span color="#B0C4DE" />
        },
        {
            id    : '8',
            name  : 'powder_blue',
            label : t('core:selects.table_color.colors.powder_blue'),
            marker: () => <Span color="#B0E0E6" />
        },
        {
            id    : '9',
            name  : 'pale_goldenrod',
            label : t('core:selects.table_color.colors.pale_goldenrod'),
            marker: () => <Span color="#EEE8AA" />
        },
        {
            id    : '10',
            name  : 'khaki',
            label : t('core:selects.table_color.colors.khaki'),
            marker: () => <Span color="#F0E68C" />
        },
        {
            id    : '11',
            name  : 'rosy_brown',
            label : t('core:selects.table_color.colors.rosy_brown'),
            marker: () => <Span color="#BC8F8F" />
        },
        {
            id    : '12',
            name  : 'indian_red',
            label : t('core:selects.table_color.colors.indian_red'),
            marker: () => <Span color="#CD5C5C" />
        },
        {
            id    : '13',
            name  : 'salmon',
            label : t('core:selects.table_color.colors.salmon'),
            marker: () => <Span color="#FA8072" />
        },
        {
            id    : '14',
            name  : 'dark_khaki',
            label : t('core:selects.table_color.colors.dark_khaki'),
            marker: () => <Span color="#BDB76B" />
        },
        {
            id    : '15',
            name  : 'tan',
            label : t('core:selects.table_color.colors.tan'),
            marker: () => <Span color="#D2B48C" />
        },
        {
            id    : '16',
            name  : 'burlywood',
            label : t('core:selects.table_color.colors.burlywood'),
            marker: () => <Span color="#DEB887" />
        },
        {
            id    : '17',
            name  : 'sandy_brown',
            label : t('core:selects.table_color.colors.sandy_brown'),
            marker: () => <Span color="#F4A460" />
        },
        {
            id    : '18',
            name  : 'dark_salmon',
            label : t('core:selects.table_color.colors.dark_salmon'),
            marker: () => <Span color="#E9967A" />
        },
        {
            id    : '19',
            name  : 'light_coral',
            label : t('core:selects.table_color.colors.light_coral'),
            marker: () => <Span color="#F08080" />
        },
        {
            id    : '20',
            name  : 'peach_puff',
            label : t('core:selects.table_color.colors.peach_puff'),
            marker: () => <Span color="#FFDAB9" />
        }
    ];
}

export function TableColorSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    required = false
}: CustomInputProps<TFieldValues>) {
    const {
        field: { value }
    } = useController({
        name: 'color' as Path<TFieldValues>,
        control
    });
    const { t } = useAppTranslation();
    const options = tableColorOptions(t);

    const colors_by_id = useMemo(() => createMap(options, 'name'), [options]);

    const selected_color = colors_by_id[value];

    return (
        <CustomEffectAutocomplete
            control={control}
            required={required}
            name={'color' as Path<TFieldValues>}
            options={options}
            label="core:selects.table_color.label"
            entities_by_id={colors_by_id}
            inputProps={{
                startAdornment:
                    selected_color && selected_color.marker ? selected_color.marker() : ''
            }}
        />
    );
}
