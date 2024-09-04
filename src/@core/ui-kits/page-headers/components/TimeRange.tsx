import { useCallback, useState, KeyboardEvent, useEffect } from 'react';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { updateFilters as _updateFilters } from '@/store/filters/actions';
import { useAppDispatch } from '@/store/hooks';
import { DateRange } from '@mui/x-date-pickers-pro';
import { styled } from '@mui/material/styles';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const DateWrapper = styled('div')(() => ({
    width     : 135,
    flexShrink: 0
}));

type Props = {
    filter_id: string;
    year: number[];
    field?: string;
};

/**
 * TimeRange with format="yyyy".
 */
const DateRangePicker = ({
    filter_id,
    year,
    field = 'year'
}: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const [value, setValue] = useState<DateRange<Date>>([null, null]);

    useEffect(() => {
        setValue([
            year[0] ? new Date(year[0], 0, 1) : null,
            year[1] ? new Date(year[1], 0, 1) : null
        ]);
    }, [year]);

    const handleChange = useCallback(
        ([startDate, endDate]: DateRange<Date>) => {
            setValue([startDate, endDate]);
            const start = new Date(startDate as Date).getFullYear();
            const end = new Date(endDate as Date).getFullYear();
            if ((!startDate && !endDate) || (startDate && start > 1970 && endDate && end > 1970)) {
                dispatch(
                    _updateFilters(filter_id, {
                        [field]: [start, end]
                    })
                );
            }
        },
        [filter_id, field, dispatch]
    );

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Backspace') {
            return;
        }
        dispatch(
            _updateFilters(filter_id, {
                [field]: [null, null]
            })
        );
    };

    return (
        <DateWrapper>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SingleInputDateRangeField
                    label={t('core:basic.page_headers.time_range.label')}
                    value={value}
                    size="small"
                    format="yyyy"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </LocalizationProvider>
        </DateWrapper>
    );
};

export default DateRangePicker;
