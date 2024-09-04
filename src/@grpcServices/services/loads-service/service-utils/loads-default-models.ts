import { $Filter } from '@/@core/components/filters/utils';
import LoadsTypes from '@/store/dispatch/loads/types';
import { uuidv4 } from '@/utils/uuidv4';
import { LoadStatuses } from '@/models/loads/load';
import { ReactNode } from 'react';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';

enum DEFAULT_LOADS_VIEW_NAMES {
    DEFAULT = 'Default',
    ACTIVE = 'Active'
}

export enum DEFAULT_LOADS_VIEW_IDS {
    DEFAULT = 'default',
    DEFAULT_ACTIVE = 'default_active'
}

export enum LOADS_VIEW_TYPES {
    TRUCK = 'truck',
    BROKER = 'broker',
    CUSTOMER = 'customer',
    DEFAULT = 'default',
    DEFAULT_ACTIVE = 'default_active',
    COMMON = 'common'
}

export const default_loads_filters = PAGES_FILTERS_CONFIG.DISPATCH.LOADS.defaultFilters;

export const loads_filter_order = $Filter.order(default_loads_filters)(
    'load_status',
    'load_invoice_status',
    'user',
    'broker',
    'driver',
    'truck'
);

export const defaultViewFilters = {
    start_at           : default_loads_filters.start_at,
    end_at             : default_loads_filters.end_at,
    driver             : default_loads_filters.driver,
    broker             : default_loads_filters.broker,
    user               : default_loads_filters.user,
    load_invoice_status: default_loads_filters.load_invoice_status,
    load_status        : default_loads_filters.load_status,
    truck              : default_loads_filters.truck
};

export type LoadsView = {
    view_id: string;
    name: string;
    filters: Record<string, (string | number)[] | string>;
    icon?: ReactNode;
    type: LOADS_VIEW_TYPES;
};

export const defaultView: LoadsView = {
    view_id: DEFAULT_LOADS_VIEW_IDS.DEFAULT,
    type   : LOADS_VIEW_TYPES.DEFAULT,
    name   : DEFAULT_LOADS_VIEW_NAMES.DEFAULT,
    filters: defaultViewFilters
};

export const defaultActiveView: LoadsView = {
    view_id: DEFAULT_LOADS_VIEW_IDS.DEFAULT_ACTIVE,
    type   : LOADS_VIEW_TYPES.DEFAULT_ACTIVE,
    name   : DEFAULT_LOADS_VIEW_NAMES.ACTIVE,
    filters: {
        ...defaultViewFilters,
        load_status: [LoadStatuses.PENDING, LoadStatuses.ASSIGNED, LoadStatuses.IN_PROGRESS]
    }
};

export const loadsDefaultViews: LoadsView[] = [defaultView, defaultActiveView];
