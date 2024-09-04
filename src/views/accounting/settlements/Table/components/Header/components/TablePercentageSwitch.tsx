import { FILTER_SWITCH_KEY } from '@/@core/components/filters/constants';
import AeroSwitch, { AeroSwitchChangeType } from '@/@core/ui-kits/basic/aero-switch/AeroSwitch';
import { useSettlementsSwitchFilters } from '@/store/accounting/settlements/hooks/settlements';
import { updateFilters } from '@/store/filters/actions';
import { useAppDispatch } from '@/store/hooks';
import React from 'react';

type Props = {
    filter_id: string;
};

function TablePercentageSwitch({ filter_id }: Props) {
    const isChecked = useSettlementsSwitchFilters()?.percentage;

    const dispatch = useAppDispatch();

    const handleChange: AeroSwitchChangeType = (event, checked) => {
        dispatch(updateFilters(filter_id, { [FILTER_SWITCH_KEY]: { percentage: checked } }));
    };

    return (
        <AeroSwitch
            isChecked={!!isChecked}
            label="settlements:header.filters.labels.show_percentages"
            onChange={handleChange}
        />
    );
}

export default TablePercentageSwitch;
