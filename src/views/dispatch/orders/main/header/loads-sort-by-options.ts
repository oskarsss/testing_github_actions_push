import { GetLoadsRequest_SortBy } from '@proto/loads';
import { SortByOption } from '@/@core/components/sort-by-menu/SortByMenu';

const LOAD_SORT_BY_OPTIONS: SortByOption[] = [
    {
        id         : GetLoadsRequest_SortBy.LATEST,
        title      : 'loads:sort_by.latest.title',
        description: 'loads:sort_by.latest.description'
    },
    {
        id         : GetLoadsRequest_SortBy.OLDEST,
        title      : 'loads:sort_by.oldest.title',
        description: 'loads:sort_by.oldest.description'
    },
    {
        id         : GetLoadsRequest_SortBy.SMART_DISPATCH,
        title      : 'loads:sort_by.smart_dispatch.title',
        description: 'loads:sort_by.smart_dispatch.description'
    },
    {
        id         : GetLoadsRequest_SortBy.GROSS_AMOUNT_ASC,
        title      : 'loads:sort_by.gross_amount_asc.title',
        description: 'loads:sort_by.gross_amount_asc.description'
    },
    {
        id         : GetLoadsRequest_SortBy.GROSS_AMOUNT_DESC,
        title      : 'loads:sort_by.gross_amount_desc.title',
        description: 'loads:sort_by.gross_amount_desc.description'
    },
    {
        id         : GetLoadsRequest_SortBy.TRUCK_NUMBER_ASC,
        title      : 'loads:sort_by.truck_number_asc.title',
        description: 'loads:sort_by.truck_number_asc.description'
    },
    {
        id         : GetLoadsRequest_SortBy.TRUCK_NUMBER_DESC,
        title      : 'loads:sort_by.truck_number_desc.title',
        description: 'loads:sort_by.truck_number_desc.description'
    },
    {
        id         : GetLoadsRequest_SortBy.LOADED_MILES_ASC,
        title      : 'loads:sort_by.loaded_miles_asc.title',
        description: 'loads:sort_by.loaded_miles_asc.description'
    },
    {
        id         : GetLoadsRequest_SortBy.LOADED_MILES_DESC,
        title      : 'loads:sort_by.loaded_miles_desc.title',
        description: 'loads:sort_by.loaded_miles_desc.description'
    }
];

export default LOAD_SORT_BY_OPTIONS;
