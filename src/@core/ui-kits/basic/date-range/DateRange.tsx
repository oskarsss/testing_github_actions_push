import React, { useState, useEffect } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import moment from 'moment-timezone';
import ListShortcuts from '@/@core/ui-kits/basic/date-range/Shortcuts/Shortcuts';
import { IShortcutsItem } from '@/@core/ui-kits/basic/date-range/Shortcuts/config';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DAY_OF_WEEK_FORMAT } from '@/@core/fields/inputs/DateInput';
import { ValueType, PeriodDateType } from './types';

type Props = {
    label?: IntlMessageKey;
    disabled?: boolean;
    width?: number | string;
    size?: 'small' | 'medium';
    variant?: 'filled' | 'outlined';
    customShortcuts?: IShortcutsItem[];
    date: PeriodDateType;
    onChange: (value: PeriodDateType) => void;
    required?: boolean;
};

export default function DateRange({
    date,
    label = '',
    width = 228,
    size = 'small',
    variant = 'outlined',
    customShortcuts,
    disabled = false,
    required = false,
    onChange
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [stateDate, setStatedDate] = useState<ValueType>([null, null]);
    const { t } = useAppTranslation();

    const handleChange = (value: ValueType) => {
        const start = value[0];
        const end = value[1] || value[0];
        setStatedDate([start, end]);
        if (start?.isValid() && end?.isValid()) {
            const start_date = moment(start).format('YYYY-MM-DD');
            const end_date = moment(end).format('YYYY-MM-DD');
            onChange({ start_date, end_date });
        } else {
            onChange({ start_date: '', end_date: '' });
        }
    };

    useEffect(() => {
        const {
            start_date,
            end_date
        } = date;
        const start = start_date ? moment(start_date) : null;
        const end = end_date ? moment(end_date) : null;
        setStatedDate((prev) => {
            if (start && end) {
                if (prev[0]?.isSame(start) && prev[1]?.isSame(end)) {
                    return prev;
                }
                return [start, end];
            }
            return [start, end];
        });
    }, [date.start_date, date.end_date]);

    const shortcuts = () => (
        <ListShortcuts
            setIsOpen={setIsOpen}
            selectedDate={stateDate}
            onChange={handleChange}
            customShortcuts={customShortcuts}
        />
    );

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsOpen(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <FormControl
                variant={variant}
                sx={{ width, flexShrink: 0 }}
            >
                <DateRangePicker
                    onChange={handleChange}
                    onAccept={handleChange}
                    desktopModeMediaQuery="@media (min-width: 900px)"
                    dayOfWeekFormatter={(day, date) => date.format(DAY_OF_WEEK_FORMAT)}
                    open={isOpen}
                    label={t(label)}
                    format="MM/DD/YYYY"
                    disabled={disabled}
                    value={stateDate}
                    onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                    calendars={2}
                    slotProps={{
                        textField: {
                            size,
                            variant,
                            onKeyDown,
                            InputLabelProps: {
                                shrink: true,
                                required
                            }
                        }
                    }}
                    slots={{
                        shortcuts,
                        field: SingleInputDateRangeField
                    }}
                />
            </FormControl>
        </LocalizationProvider>
    );
}
