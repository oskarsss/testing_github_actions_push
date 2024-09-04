import { useStopsPeriod, useTotalsPeriod, useTrucksPeriod } from '@/store/ifta/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';
import { IftaViewIdType } from '../../Details';

type Props = {
    periodId: string;
    type?: string;
    viewId: IftaViewIdType;
};

export default function Search({
    periodId,
    type = 'trucks',
    viewId
}: Props) {
    const { filter_id: trucks_filter_id } = useTrucksPeriod(periodId);
    const { filter_id: totals_filter_id } = useTotalsPeriod(periodId);
    const { filter_id: stops_filter_id } = useStopsPeriod(periodId);

    const filterIdsMap: Record<IftaViewIdType, string> = {
        trucks: trucks_filter_id,
        totals: totals_filter_id,
        stops : stops_filter_id
    };

    return (
        <SearchField
            isLoading={false}
            filter_id={filterIdsMap[viewId]}
            format_query_parameters={false}
            style={{ marginRight: '10px' }}
        />
    );
}
