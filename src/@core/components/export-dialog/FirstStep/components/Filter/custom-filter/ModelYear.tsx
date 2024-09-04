import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import { useEffect, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';

const ModelYear: EntityFilters.FilterComponent = ({
    value: defaultValue,
    filter_id,
    onChange
}) => {
    const [value, setValue] = useState<DateRange<Date>>([null, null]);

    useEffect(() => {
        if (!Array.isArray(defaultValue)) return;
        if (defaultValue?.[0] && typeof defaultValue?.[1]) {
            const [start, end] = defaultValue;
            const startDate = new Date();
            const endDate = new Date();
            startDate.setFullYear(Number(start));
            endDate.setFullYear(Number(end));
            setValue([startDate, endDate]);
            onChange([`${start}-${end}`], filter_id);
        }
    }, [!!defaultValue]);

    const handleChange = ([startDate, endDate]: DateRange<Date>) => {
        setValue([startDate, endDate]);
        const start = new Date(startDate as Date).getFullYear();
        const end = new Date(endDate as Date).getFullYear();
        if (startDate && start > 1970 && endDate && end > 1970) {
            onChange([`${start}-${end}`], filter_id);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SingleInputDateRangeField
                label="Model Year"
                value={value}
                size="small"
                format="yyyy"
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true
                }}
            />
        </LocalizationProvider>
    );
};

export default ModelYear;
