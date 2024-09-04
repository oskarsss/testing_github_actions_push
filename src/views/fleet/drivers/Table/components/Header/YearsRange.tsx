import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import { useAppDispatch } from '@/store/hooks';
import { updateFilters } from '@/store/filters/actions';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    filter_id: string;
    age: string[];
    fieldKey?: string;
};

export default function YearsRange({
    filter_id,
    age,
    fieldKey = 'driver_age'
}: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const rangeOptions = [
        { label: t('common:all'), value: 'All' },
        { label: '18 - 22', value: '18-22' },
        { label: '23 - 27', value: '23-27' },
        { label: '28 - 32', value: '28-32' },
        { label: '33 - 37', value: '33-37' },
        { label: '38 - 42', value: '38-42' },
        { label: '43 - 47', value: '43-47' },
        { label: '48 - 52', value: '48-52' }
    ];

    const [selectedRange, setSelectedRange] = useState(rangeOptions[0].value);

    useEffect(() => {
        if (age && age.length === 0) {
            setSelectedRange(rangeOptions[0].value);
        }
    }, [age]);

    const handleRangeChange = (event: SelectChangeEvent<string>) => {
        setSelectedRange(event.target.value);
        const age = event.target.value === 'All' ? [] : event.target.value.split('-');
        dispatch(
            updateFilters(filter_id, {
                [fieldKey]: age
            })
        );
    };

    return (
        <FormControl
            sx={{
                width   : '100px',
                minWidth: '100px'
            }}
            size="small"
        >
            <InputLabel id="select-small-age-label">
                {t('drivers:header.filters.age.label')}
            </InputLabel>
            <Select
                labelId="select-small-age-label"
                id="select-small-age"
                value={selectedRange}
                label={t('drivers:header.filters.age.label')}
                onChange={handleRangeChange}
                defaultValue={rangeOptions[0].value}
            >
                {rangeOptions.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
