// import analytics from 'public/locales/en/analytics.json';
// import app_version_alert from 'public/locales/en/app_version_alert.json';
// import auth from 'public/locales/en/auth.json';
// import billing from 'public/locales/en/billing.json';
// import brokers from 'public/locales/en/brokers.json';
// import columns from 'public/locales/en/columns.json';
// import common from 'public/locales/en/common.json';
// import core from 'public/locales/en/core.json';
// import customers from 'public/locales/en/customers.json';
// import dispatchers from 'public/locales/en/dispatchers.json';
// import drivers from 'public/locales/en/drivers.json';
// import entity from 'public/locales/en/entity.json';
// import error from 'public/locales/en/error.json';
// import fields from 'public/locales/en/fields.json';
// import fuels from 'public/locales/en/fuels.json';
// import ifta from 'public/locales/en/ifta.json';
// import loadboard from 'public/locales/en/loadboard.json';
// import loads from 'public/locales/en/loads.json';
// import maintenance from 'public/locales/en/maintenance.json';
// import manifest from 'public/locales/en/manifest.json';
// import map from 'public/locales/en/map.json';
// import modals from 'public/locales/en/modals.json';
// import navigation from 'public/locales/en/navigation.json';
// import new_loads from 'public/locales/en/new_loads.json';
// import onboarding from 'public/locales/en/onboarding.json';
// import pages from 'public/locales/en/pages.json';
// import payouts from 'public/locales/en/payouts.json';
// import plates from 'public/locales/en/plates.json';
// import recurring_transactions from 'public/locales/en/recurring_transactions.json';
// import reminder from 'public/locales/en/reminder.json';
// import schedule from 'public/locales/en/schedule.json';
// import settings from 'public/locales/en/settings.json';
// import settlements from 'public/locales/en/settlements.json';
// import state_info from 'public/locales/en/state_info.json';
// import tolls from 'public/locales/en/tolls.json';
// import tracking from 'public/locales/en/tracking.json';
// import trailers from 'public/locales/en/trailers.json';
// import trucks from 'public/locales/en/trucks.json';
// import vendors from 'public/locales/en/vendors.json';
// import notifications from 'public/locales/en/notifications.json';

type Messages = {
    '': '';
    '-': '-';
    common: typeof import('public/locales/en/common.json');
    core: typeof import('public/locales/en/core.json');
    entity: typeof import('public/locales/en/entity.json');
    fields: typeof import('public/locales/en/fields.json');
    analytics: typeof import('public/locales/en/analytics.json');
    app_version_alert: typeof import('public/locales/en/app_version_alert.json');
    auth: typeof import('public/locales/en/auth.json');
    billing: typeof import('public/locales/en/billing.json');
    brokers: typeof import('public/locales/en/brokers.json');
    columns: typeof import('public/locales/en/columns.json');
    customers: typeof import('public/locales/en/customers.json');
    dispatchers: typeof import('public/locales/en/dispatchers.json');
    drivers: typeof import('public/locales/en/drivers.json');
    error: typeof import('public/locales/en/error.json');
    fuels: typeof import('public/locales/en/fuels.json');
    ifta: typeof import('public/locales/en/ifta.json');
    loadboard: typeof import('public/locales/en/loadboard.json');
    loads: typeof import('public/locales/en/loads.json');
    maintenance: typeof import('public/locales/en/maintenance.json');
    manifest: typeof import('public/locales/en/manifest.json');
    map: typeof import('public/locales/en/map.json');
    modals: typeof import('public/locales/en/modals.json');
    navigation: typeof import('public/locales/en/navigation.json');
    new_loads: typeof import('public/locales/en/new_loads.json');
    onboarding: typeof import('public/locales/en/onboarding.json');
    pages: typeof import('public/locales/en/pages.json');
    payouts: typeof import('public/locales/en/payouts.json');
    plates: typeof import('public/locales/en/plates.json');
    recurring_transactions: typeof import('public/locales/en/recurring_transactions.json');
    reminder: typeof import('public/locales/en/reminder.json');
    schedule: typeof import('public/locales/en/schedule.json');
    settings: typeof import('public/locales/en/settings.json');
    settlements: typeof import('public/locales/en/settlements.json');
    state_info: typeof import('public/locales/en/state_info.json');
    tolls: typeof import('public/locales/en/tolls.json');
    tracking: typeof import('public/locales/en/tracking.json');
    trailers: typeof import('public/locales/en/trailers.json');
    trucks: typeof import('public/locales/en/trucks.json');
    vendors: typeof import('public/locales/en/vendors.json');
    notifications: typeof import('public/locales/en/notifications.json');
};

type Paths<Schema, Path extends string = '', IsFirst extends boolean = true> = Schema extends string
    ? Path
    : Schema extends object
    ? {
          [K in keyof Schema & string]: Paths<
              Schema[K],
              `${Path}${Path extends '' ? '' : IsFirst extends true ? ':' : '.'}${K}`,
              Path extends '' ? true : false
          >;
      }[keyof Schema & string]
    : never;

type ObjectPaths<
    Schema,
    Path extends string = '',
    IsFirst extends boolean = true
> = Schema extends object
    ?
          | Path
          | {
                [K in keyof Schema & string]: ObjectPaths<
                    Schema[K],
                    `${Path}${Path extends '' ? '' : IsFirst extends true ? ':' : '.'}${K}`,
                    Path extends '' ? true : false
                >;
            }[keyof Schema & string]
    : never;

export type IntlMessage = ObjectPaths<IntlMessages>;
export type IntlMessageKey = Paths<IntlMessages>;
export type IntlOptions = Record<string, string | number>;
export type TFunction = (key: IntlMessageKey, options?: IntlOptions) => string;
export type IntlNamespaces = keyof Messages;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntlMessages extends Messages {}
}
