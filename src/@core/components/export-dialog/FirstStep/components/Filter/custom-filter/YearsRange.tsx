import { useEffect } from 'react';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import FiltersItem from '@/@core/components/filters/selects-filters-group/FiltersItem';

const rangeOptions = [
    { label: '18 - 22', value: '18-22', searchValue: '18, 19, 20, 21, 22' },
    { label: '23 - 27', value: '23-27', searchValue: '23, 24, 25, 26, 27' },
    { label: '28 - 32', value: '28-32', searchValue: '28, 29, 30, 31, 32' },
    { label: '33 - 37', value: '33-37', searchValue: '33, 34, 35, 36, 37' },
    { label: '38 - 42', value: '38-42', searchValue: '38, 39, 40, 41, 42' },
    { label: '43 - 47', value: '43-47', searchValue: '43, 44, 45, 46, 47' },
    { label: '48 - 52', value: '48-52', searchValue: '48, 49, 50, 51, 52' }
];

const YearsRange: EntityFilters.FilterComponent = ({
    filter_id,
    value,
    onChange
}) => {
    useEffect(() => {
        if (value && Array.isArray(value) && value.length === 2) {
            onChange([value.join('-')], filter_id);
        }
    }, [!!value]);

    const handleRangeChange = (new_selected: string[]) => {
        onChange(new_selected, filter_id);
    };

    const formattingValue: string[] = Array.isArray(value) && value?.[0] ? [value.join('-')] : [];

    return (
        <FiltersItem
            filter_type="driver_age"
            label="Age"
            value={formattingValue}
            getFilterConfig={() => ({ filterItems: rangeOptions })}
            onChange={handleRangeChange}
        />
    );
};

export default YearsRange;
