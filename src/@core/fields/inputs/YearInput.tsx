import { applyTestId } from '@/configs/tests';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment-timezone';
import { Control, Controller, ErrorOption, FieldValues, Path } from 'react-hook-form';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

interface YearInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    label: IntlMessageKey;
    name: Path<TFieldValues>;
    width?: string;
    size?: 'small' | 'medium';
    variant?: 'filled' | 'outlined' | 'standard';
    minDate?: string | Date | moment.Moment;
    maxDate?: string | Date | moment.Moment;
    testID?: string;
    required?: boolean;
}

function YearInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    width = '50%',
    size = 'small',
    variant = 'filled',
    minDate = '',
    maxDate,
    testID = '',
    required = false
}: YearInputProps<TFieldValues>) {
    const { t } = useAppTranslation();

    return (
        <FormControl style={{ width }}>
            <Controller
                name={name}
                control={control}
                render={({ field: {
                    value,
                    onChange,
                    ...rest
                } }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            minDate={minDate ? moment(minDate) : null}
                            maxDate={maxDate ? moment(maxDate) : null}
                            slotProps={{
                                textField: {
                                    inputProps: {
                                        ...applyTestId(testID)
                                    },
                                    variant,
                                    required,
                                    size,
                                    name,
                                    error: !!errors[name]
                                }
                            }}
                            label={t(label)}
                            views={['year']}
                            value={
                                value
                                    ? moment(typeof value === 'number' ? value.toString() : value)
                                    : null
                            }
                            onChange={(newValue) => {
                                onChange({
                                    target: {
                                        value: newValue?.format('YYYY'),
                                        name
                                    }
                                });
                            }}
                            {...rest}
                        />
                    </LocalizationProvider>
                )}
            />
            {errors[name] && (
                <FormHelperText
                    sx={{ color: 'error.main' }}
                    error
                    id={`stepper-linear-${name}`}
                >
                    {errors[name]?.message}
                </FormHelperText>
            )}
        </FormControl>
    );
}
export default YearInput;
