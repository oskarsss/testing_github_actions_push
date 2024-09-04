import { SyntheticEvent, useMemo } from 'react';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import type { IntlMessageKey } from '@/@types/next-intl';
import AeroSwitch from '../../../ui-kits/basic/aero-switch/AeroSwitch';
import { FILTER_SWITCH_KEY } from '../constants';

export type ChangeType = (event: SyntheticEvent<Element, Event>, checked: boolean) => void;

type Props = {
    label?: IntlMessageKey;
    filterId: string;
    selectedFilters: any;
    filterType: string;
    isLocalFilter?: boolean;
    isNegative?: boolean;
};

/**
 *
 * MUST HAVE!!!!!
 * Set up default value for switch filter in DEFAULT_FILTERS_VALUE
 */
export default function SwitchFilter({
    label = '',
    filterId,
    selectedFilters,
    filterType,
    isLocalFilter = false,
    isNegative = false
}: Props) {
    const updateFilters = useAdvancedUpdateFilters({ filter_id: filterId });

    const isChecked = useMemo(() => {
        if (isLocalFilter) {
            return selectedFilters[FILTER_SWITCH_KEY]?.[filterType] ?? false;
        }
        return selectedFilters[filterType];
    }, [selectedFilters, isLocalFilter, filterType]);

    const handleChangeFilters = (filters: object) => {
        updateFilters(filters);
    };

    const onChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        if (isLocalFilter) {
            handleChangeFilters({
                ...selectedFilters,
                [FILTER_SWITCH_KEY]: {
                    ...selectedFilters[FILTER_SWITCH_KEY],
                    [filterType]: checked
                }
            });
        } else if (checked) {
            handleChangeFilters({
                [filterType]: isNegative ? !checked : checked
            });
        } else {
            handleChangeFilters({
                [filterType]: isNegative ? !checked : checked
            });
        }
    };

    return (
        <AeroSwitch
            isChecked={isChecked}
            label={label}
            onChange={onChange}
        />
    );
}
