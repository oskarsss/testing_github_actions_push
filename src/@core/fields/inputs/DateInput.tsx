/* eslint-disable newline-destructuring/newline */

import FormControl from '@mui/material/FormControl';
import {
    type Control,
    type ErrorOption,
    type Path,
    type FieldValues,
    Controller
} from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment';
import { applyTestId } from '@/configs/tests';
import moment from 'moment-timezone';
import { DateOrTimeView } from '@mui/x-date-pickers/models/views';
import React, { KeyboardEventHandler, useCallback, useState } from 'react';
import { IconButton, styled } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import DateInputShortCuts from '@/@core/fields/inputs/date-input-shorcuts/DateInputShortCuts';

type InputType = 'date' | 'datetime' | 'time';

interface DateInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors?: { [P in keyof TFieldValues]?: ErrorOption }; // TODO: Delete props
    label: IntlMessageKey;
    name: Path<TFieldValues>;
    width?: string;
    size?: 'small' | 'medium';
    variant?: 'filled' | 'outlined' | 'standard';
    type?: InputType;
    minDate?: string;
    AMPMTime?: boolean;
    testID?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    onResetValue?: () => void;
    showShortcuts?: boolean;
    customError?: string;
}

export const DAY_OF_WEEK_FORMAT = 'dd';

const viewsMap: Record<InputType, DateOrTimeView[]> = {
    date    : ['year', 'month', 'day'],
    datetime: ['year', 'month', 'day', 'hours', 'minutes'],
    time    : ['hours', 'minutes']
};

const formatedTimeMap: Record<InputType, string> = {
    date    : 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    time    : 'HH:mm:ss'
};

const StyledIconButton = styled(IconButton)`
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
`;

function DateInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    width = '50%',
    size = 'small',
    variant = 'filled',
    type = 'datetime',
    minDate = '',
    AMPMTime = true,
    testID = '',
    required = false,
    disabled = false,
    readonly = false,
    onResetValue,
    showShortcuts
}: DateInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const [selectedSections, setSelectedSections] = useState<number | null | 'all'>(null);

    const views = viewsMap[type] || viewsMap.datetime;

    const AmPmTime = type === 'date' ? false : AMPMTime;

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.stopPropagation();
            const lastIndex = views.length - Number(!AmPmTime);
            if (event.shiftKey && event.key === 'Tab') {
                if (selectedSections === null || selectedSections === 0) {
                    return;
                }
                event.preventDefault();
                setSelectedSections((prev) => (typeof prev === 'number' ? prev - 1 : lastIndex));
                return;
            }
            if (event.key === 'Tab') {
                if (selectedSections === lastIndex) {
                    return;
                }
                event.preventDefault();
                setSelectedSections((prev) => (typeof prev === 'number' ? prev + 1 : 0));
            }
        },
        [AmPmTime, selectedSections, views]
    );

    const shortcuts = (value: string, onChange: (event: React.ChangeEvent<any>) => void) => (
        <DateInputShortCuts
            selectedDate={value}
            onChange={(newValue) => {
                const event = {
                    target: {
                        value: newValue ? newValue.format(formatedTimeMap[type]) : '',
                        name
                    }
                };
                onChange(event as React.ChangeEvent<any>);
            }}
        />
    );

    return (
        <FormControl style={{ width }}>
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            selectedSections={selectedSections}
                            onSelectedSectionsChange={(newSelectedSections) => {
                                setSelectedSections(newSelectedSections as number | null | 'all');
                            }}
                            dayOfWeekFormatter={(day, date) =>
                                moment(date).format(DAY_OF_WEEK_FORMAT)}
                            ampm={AMPMTime}
                            minDateTime={moment(minDate)}
                            disabled={disabled}
                            readOnly={readonly}
                            slotProps={{
                                textField: {
                                    InputLabelProps: {
                                        shrink: true
                                    },
                                    inputProps: {
                                        ...applyTestId(testID)
                                    },
                                    variant,
                                    required,
                                    size,
                                    name,
                                    sx: {
                                        '.MuiIconButton-edgeEnd .MuiSvgIcon-root': {
                                            color: (theme) =>
                                                theme.palette.semantic.foreground.primary
                                        }
                                    },
                                    error    : !!error,
                                    onBlur   : () => setSelectedSections(null),
                                    onKeyDown: handleKeyDown
                                }
                            }}
                            slots={{
                                shortcuts: showShortcuts
                                    ? () => shortcuts(value, onChange)
                                    : undefined
                            }}
                            label={t(label)}
                            views={views}
                            value={value ? moment.utc(value) : null}
                            onChange={(newValue) => {
                                const event = {
                                    target: {
                                        value: newValue
                                            ? newValue.format(formatedTimeMap[type])
                                            : '',
                                        name
                                    }
                                };
                                onChange(event as React.ChangeEvent<any>);
                            }}
                            {...rest}
                        />

                        {onResetValue && (
                            <StyledIconButton onClick={onResetValue}>
                                <ClearIcon />
                            </StyledIconButton>
                        )}
                        {error && (
                            <FormHelperText
                                error
                                sx={{ color: 'error.main' }}
                                id={`stepper-linear-${name}`}
                            >
                                {error?.message}
                            </FormHelperText>
                        )}
                    </LocalizationProvider>
                )}
            />
        </FormControl>
    );
}
export default DateInput;
