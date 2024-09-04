export const PERMISSIONS = Object.freeze({
    // PAGES
    HOME_PAGE                   : 'home.view',
    LOADS_PAGE                  : 'loads.view',
    SCHEDULING_PAGE             : 'scheduling.view',
    STATS_PAGE                  : 'stats.view',
    DISPATCHERS_SETTLEMENTS_VIEW: 'dispatcher_settlements.view',
    BROKERS_PAGE                : 'brokers.view',
    CUSTOMERS_PAGE              : 'customers.view',
    PLATES_PAGE                 : 'plates.view',
    TRUCKS_PAGE                 : 'trucks.view',
    TRAILERS_PAGE               : 'trailers.view',
    DRIVERS_PAGE                : 'drivers.view',
    VENDORS_PAGE                : 'vendors.view',
    INVOICES_PAGE               : 'invoices.view',
    SETTLEMENTS_PAGE            : 'settlements.view',
    RECURRING_TRANSACTIONS_PAGE : 'recurring_transactions.view',
    TOLLS_PAGE                  : 'tolls.view',
    FUEL_PAGE                   : 'fuel.view',
    IFTA_PAGE                   : 'ifta.view',
    SETTINGS_PAGE               : 'settings.view',
    SETTINGS_BILLING_PAGE       : 'settings.billing',

    // LOADS PERMISSIONS
    EDIT_LOAD_DISTANCE        : 'loads.edit_load_distance',
    EDIT_LOAD_INVOICE_STATUS  : 'loads.edit_invoice_status',
    EDIT_LOAD_INVOICING       : 'loads.edit_load_invoicing',
    EDIT_LOAD_DRIVER_PAY      : 'loads.edit_load_driver_pay',
    EDIT_LOAD_INVOICE_PAYMENTS: 'loads.edit_load_invoice_payments',
    EDIT_LOAD_OVERRIDE_GROSS  : 'loads.overrride_driver_gross_amount',

    // NOTES PERMISSIONS

    EDIT_NOTES  : 'notes.edit',
    DELETE_NOTES: 'notes.delete'
});
