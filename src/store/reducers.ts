import { combineReducers } from 'redux';

// import reducers
import { SchedulingReducer as scheduling } from '@/store/dispatch/scheduling/slice';
import { IftaReducer as ifta } from '@/store/ifta/slice';
import { trailersReducer } from '@/store/fleet/trailers/slice';
import { RolesReducer as roles } from '@/store/settings/roles/slice';
import { trucksReducer } from '@/store/fleet/trucks/slice';
import { ServiceProvidersReducer as serviceProviders } from '@/store/maitenance/service-providers/slice';
import { ServiceLogsReducer as serviceLogs } from '@/store/maitenance/service-logs/slice';
import { LoadsReducer as loads } from './dispatch/loads/slice';
import { ManifestsReducer as manifests } from './dispatch/manifests/slice';
import { DispatchersReducer as dispatch } from './accounting/dispatchers/slice';
import { ImportReducer as importFiles } from './import/slice';
import { filtersReducer as filters } from './filters/slice';
import map from './map/slice';
import pages from './pages/slice';
import { AppReducer as app } from './app/slice';
import { LoginReducer as login } from './auth/login/slice';
import { TableReducer as table } from './table/slice';
import { DraftsReducer as drafts } from './drafts/slice';
import { DriversReducer as drivers } from './fleet/drivers/slice';
import { DocumentsReducer as documents } from './documents/slice';
import { SettlementsReducer as settlements } from './accounting/settlements/slice';
import { AnalyticsReducer as analytics } from './analytics/slice';
import { HomeReducer as home } from './home/slice';
import { EventsReducer as events } from './streams/events/slice';
import { NotesReducer as notes } from './notes/slice';
import { TrackingReducer as tracking } from './dispatch/tracking/slice';
import { LoadboardReducer as loadboard } from './loadboard/slice';
import { filesReducer as files } from './files/slice';
import { MapControllersReducer as mapsControllers } from './map-controllers/slice';
import { BillingReducer as billing } from './billing/slice';
import { NotificationsReducer as notifications } from './notifications/slice';
import { OrdersDataReducer as ordersData } from './storage/orders/slice';
import { TrucksDataReducer as trucksData } from './storage/trucks/slice';
import { TrailersDataReducer as trailersData } from './storage/trailers/slice';
import { DriversDataReducer as driversData } from './storage/drivers/slice';
import { brokersReducer as brokers } from './dispatch/brokers/slice';
import { customersReducer as customers } from './dispatch/customers/slice';

// NEW API
import { api } from './api';
import hash_maps_reducer from './hash_maps/slice';

const getRootReducer = () => {
    const reducers = {
        [api.reducerPath]: api.reducer,

        app,
        billing,
        notifications,
        files,
        dispatch,
        drafts,
        drivers,
        documents,
        manifests,
        filters,
        analytics,
        home,
        ifta,
        import   : importFiles,
        loads,
        tracking,
        login,
        map,
        pages,
        roles,
        scheduling,
        settlements,
        table,
        trailers : trailersReducer,
        trucks   : trucksReducer,
        events,
        notes,
        loadboard,
        hash_maps: hash_maps_reducer,
        mapsControllers,
        serviceProviders,
        serviceLogs,
        ordersData,
        trucksData,
        trailersData,
        driversData,
        brokers,
        customers
    };
    return combineReducers(reducers);
};

export default getRootReducer;
