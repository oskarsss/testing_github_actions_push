import { SortByOption } from '@/@core/components/sort-by-menu/SortByMenu';
import { ManifestGetRequest_SortType } from '@proto/manifests';

const MANIFEST_SORT_BY_OPTIONS: SortByOption[] = [
    {
        id         : ManifestGetRequest_SortType.SMART_DISPATCH,
        title      : 'manifest:sort_by.smart_dispatch.title',
        description: 'manifest:sort_by.smart_dispatch.description'
    },
    {
        id         : ManifestGetRequest_SortType.DISTANCE_ASC,
        title      : 'manifest:sort_by.distance_asc.title',
        description: 'manifest:sort_by.distance_asc.description'
    },
    {
        id         : ManifestGetRequest_SortType.DISTANCE_DESC,
        title      : 'manifest:sort_by.distance_desc.title',
        description: 'manifest:sort_by.distance_desc.description'
    },
    {
        id         : ManifestGetRequest_SortType.FIRST_STOP_APPOINTMENT_START_AT_ASC,
        title      : 'manifest:sort_by.oldest.title',
        description: 'manifest:sort_by.oldest.description'
    },
    {
        id         : ManifestGetRequest_SortType.FIRST_STOP_APPOINTMENT_START_AT_DESC,
        title      : 'manifest:sort_by.latest.title',
        description: 'manifest:sort_by.latest.description'
    },
    {
        id         : ManifestGetRequest_SortType.GROSS_AMOUNT_ASC,
        title      : 'manifest:sort_by.gross_amount_asc.title',
        description: 'manifest:sort_by.gross_amount_asc.description'
    },
    {
        id         : ManifestGetRequest_SortType.GROSS_AMOUNT_DESC,
        title      : 'manifest:sort_by.gross_amount_desc.title',
        description: 'manifest:sort_by.gross_amount_desc.description'
    }
];

export default MANIFEST_SORT_BY_OPTIONS;
