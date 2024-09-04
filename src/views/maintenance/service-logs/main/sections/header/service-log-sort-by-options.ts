import type { SortByOption } from '@/@core/components/sort-by-menu/SortByMenu';
import { ServiceLogGetRequest_SortType } from '@proto/service_log';

const SERVICE_LOGS_SORT_BY_OPTIONS: SortByOption[] = [
    {
        id         : ServiceLogGetRequest_SortType.LATEST,
        title      : 'maintenance:service_logs.header.sort_by.latest.title',
        description: 'maintenance:service_logs.header.sort_by.latest.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.OLDEST,
        title      : 'maintenance:service_logs.header.sort_by.oldest.title',
        description: 'maintenance:service_logs.header.sort_by.oldest.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.START_DATE_DESC,
        title      : 'maintenance:service_logs.header.sort_by.date_desc.title',
        description: 'maintenance:service_logs.header.sort_by.date_desc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.START_DATE_ASC,
        title      : 'maintenance:service_logs.header.sort_by.date_asc.title',
        description: 'maintenance:service_logs.header.sort_by.date_asc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.ORDER_NUMBER_DESC,
        title      : 'maintenance:service_logs.header.sort_by.order_number_desc.title',
        description: 'maintenance:service_logs.header.sort_by.order_number_desc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.ORDER_NUMBER_ASC,
        title      : 'maintenance:service_logs.header.sort_by.order_number_asc.title',
        description: 'maintenance:service_logs.header.sort_by.order_number_asc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.TOTAL_AMOUNT_DESC,
        title      : 'maintenance:service_logs.header.sort_by.total_amount_desc.title',
        description: 'maintenance:service_logs.header.sort_by.total_amount_desc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.TOTAL_AMOUNT_ASC,
        title      : 'maintenance:service_logs.header.sort_by.total_amount_asc.title',
        description: 'maintenance:service_logs.header.sort_by.total_amount_asc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.ODOMETER_MIlES_DESC,
        title      : 'maintenance:service_logs.header.sort_by.odometer_miles_desc.title',
        description: 'maintenance:service_logs.header.sort_by.odometer_miles_desc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.ODOMETER_MIlES_ASC,
        title      : 'maintenance:service_logs.header.sort_by.odometer_miles_asc.title',
        description: 'maintenance:service_logs.header.sort_by.odometer_miles_asc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.ENGINE_HOURS_DESC,
        title      : 'maintenance:service_logs.header.sort_by.engine_hours_desc.title',
        description: 'maintenance:service_logs.header.sort_by.engine_hours_desc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.ENGINE_HOURS_ASC,
        title      : 'maintenance:service_logs.header.sort_by.engine_hours_asc.title',
        description: 'maintenance:service_logs.header.sort_by.engine_hours_asc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.LOG_TYPE_DESC,
        title      : 'maintenance:service_logs.header.sort_by.type_desc.title',
        description: 'maintenance:service_logs.header.sort_by.type_desc.description'
    },
    {
        id         : ServiceLogGetRequest_SortType.LOG_TYPE_ASC,
        title      : 'maintenance:service_logs.header.sort_by.type_asc.title',
        description: 'maintenance:service_logs.header.sort_by.type_asc.description'
    }
];

export default SERVICE_LOGS_SORT_BY_OPTIONS;
