import { useTrucksManifests } from '@/store/dispatch/scheduling/hooks';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';

const SwitchOnline = () => {
    const {
        filter_id,
        selected_filters
    } = useTrucksManifests();

    return (
        <SwitchFilter
            label="schedule:header.buttons.only_online"
            filterId={filter_id}
            selectedFilters={selected_filters}
            filterType="online"
            isLocalFilter
        />
    );
};

export default SwitchOnline;
