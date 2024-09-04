import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateRange as DateRangeType } from '@mui/lab';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import moment, { Moment } from 'moment-timezone';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DAY_OF_WEEK_FORMAT } from '@/@core/fields/inputs/DateInput';

type Props<T extends FieldValues = FieldValues> = {
    control: Control<T>;
    variant: 'filled' | 'outlined';
    startName: Path<T>;
    endName: Path<T>;
};

function LoadboardDateRange<T extends FieldValues = FieldValues>({
    control,
    variant = 'filled',
    startName,
    endName
}: Props<T>) {
    const { t } = useAppTranslation();
    const endAtControl = useController({
        name: endName,
        control
    });
    const startAtControl = useController({
        name: startName,
        control
    });

    const value: [Moment | null, Moment | null] = useMemo(
        () => [
            startAtControl.field.value ? moment(startAtControl.field.value) : null,
            endAtControl.field.value ? moment(endAtControl.field.value) : null
        ],
        [startAtControl.field.value, endAtControl.field.value]
    );

    const onChange = (value: DateRangeType<moment.Moment>) => {
        const transformedValue = {
            start_date: value[0]?.format('YYYY-MM-DD') || '',
            end_date  : value[1]?.format('YYYY-MM-DD') || ''
        };
        startAtControl.field.onChange(transformedValue.start_date as PathValue<T, Path<T>>);
        endAtControl.field.onChange(transformedValue.end_date as PathValue<T, Path<T>>);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
                dayOfWeekFormatter={(day, date) => moment(date).format(DAY_OF_WEEK_FORMAT)}
                localeText={{
                    start: t('loadboard:fields.date_range.start'),
                    end  : t('loadboard:fields.date_range.end')
                }}
                sx={{
                    '&.MuiMultiInputDateRangeField-root': {
                        alignItems: 'center'
                    }
                }}
                slotProps={{
                    textField: {
                        variant,
                        size           : 'small',
                        InputLabelProps: {
                            size: 'small'
                        },
                        required: true
                    },

                    fieldSeparator: {
                        sx(theme) {
                            return {
                                color: theme.palette.semantic.border.secondary
                            };
                        }
                    }
                }}
                value={value}
                onChange={(value) => {
                    onChange(value);
                }}
            />
        </LocalizationProvider>
    );
}

export default LoadboardDateRange;
