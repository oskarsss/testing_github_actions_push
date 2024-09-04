import Import from '@/store/import/types';
import { ProcessorID } from '../../../proto_data/ts/v1/import';

export const IMPORT_PROCESSOR_ID_GRPC_ENUM: Record<ProcessorID, Import.CategoryId> = Object.freeze({
    [ProcessorID.PROCESSOR_UNKNOWN]       : 'loads',
    [ProcessorID.BROKERS_DEFAULT]         : 'brokers',
    [ProcessorID.DRIVERS_DEFAULT]         : 'drivers',
    [ProcessorID.FUEL_FLEET_ONE]          : 'fuel',
    [ProcessorID.FUEL_FLEETSMART]         : 'fuel',
    [ProcessorID.FUEL_LOAD_CONNEX]        : 'fuel',
    [ProcessorID.FUEL_LOVES]              : 'fuel',
    [ProcessorID.FUEL_PILOT]              : 'fuel',
    [ProcessorID.FUEL_FUELSMART]          : 'fuel',
    [ProcessorID.FUEL_TCS]                : 'fuel',
    [ProcessorID.FUEL_TCS_DRIVERS_SUMMARY]: 'fuel',
    [ProcessorID.LOADS_AMAZON]            : 'loads',
    [ProcessorID.TRUCKS_DEFAULT]          : 'trucks',
    [ProcessorID.TOLLS_BESTPASS]          : 'tolls',
    [ProcessorID.TOLLS_DEFAULT]           : 'tolls',
    [ProcessorID.TOLLS_PRE_PASS]          : 'tolls',
    [ProcessorID.TRAILERS_DEFAULT]        : 'trailers',
    [ProcessorID.CUSTOMERS_DEFAULT]       : 'customers'
});
