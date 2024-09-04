import { GetLoadsRequest_SortBy } from '@proto/loads';
import { SortByOption } from '@/@core/components/sort-by-menu/SortByMenu';

const TRACKING_SORT_BY_OPTIONS: SortByOption[] = [
    {
        id         : GetLoadsRequest_SortBy.LATEST,
        title      : 'tracking:sort_by.latest.title',
        description: 'tracking:sort_by.latest.description'
    },
    {
        id         : GetLoadsRequest_SortBy.OLDEST,
        title      : 'tracking:sort_by.oldest.title',
        description: 'tracking:sort_by.oldest.description'
    },
    {
        id         : GetLoadsRequest_SortBy.SMART_DISPATCH,
        title      : 'tracking:sort_by.smart_dispatch.title',
        description: 'tracking:sort_by.smart_dispatch.description'
    },
    {
        id         : GetLoadsRequest_SortBy.TRUCK_NUMBER_ASC,
        title      : 'tracking:sort_by.truck_number_asc.title',
        description: 'tracking:sort_by.truck_number_asc.description'
    },
    {
        id         : GetLoadsRequest_SortBy.TRUCK_NUMBER_DESC,
        title      : 'tracking:sort_by.truck_number_desc.title',
        description: 'tracking:sort_by.truck_number_desc.description'
    },
    {
        id         : GetLoadsRequest_SortBy.LOADED_MILES_ASC,
        title      : 'tracking:sort_by.loaded_miles_asc.title',
        description: 'tracking:sort_by.loaded_miles_asc.description'
    },
    {
        id         : GetLoadsRequest_SortBy.LOADED_MILES_DESC,
        title      : 'tracking:sort_by.loaded_miles_desc.title',
        description: 'tracking:sort_by.loaded_miles_desc.description'
    }
];

export default TRACKING_SORT_BY_OPTIONS;
