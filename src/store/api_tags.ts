const API_TAGS = Object.freeze({
    // domains
    domains                : 'domains',
    customer_portal_domains: 'customer_portal_domains',

    // customer portal
    customer_portal: 'customer_portal',

    // invoites
    invites: 'invites',

    // NOTIFICATIONS
    SettingsNotification: 'settings_notifications',

    // INVOICE_ITEMS
    load_invoice_items   : 'load_invoice_items',
    load_invoice_payments: 'load_invoice_payments',

    // == Maintenance ==
    // Warranty
    warranties    : 'warranties',
    warranty_items: 'warranty_items',

    // Service Providers
    service_providers: 'service_providers',
    service_provider : 'service_provider',

    // Service Logs
    service_logs      : 'service_logs',
    service_log       : 'service_log',
    service_logs_stats: 'service_logs_stats',

    // Service Log Items
    service_log_items: 'service_log_items',
    service_log_item : 'service_log_item',

    // Service Log Item Types
    service_log_item_types: 'service_log_item_types',
    service_log_item_type : 'service_log_item_type',

    // document_entity
    document_entity: 'document_entity',

    // auth
    auth: 'auth',
    dot : 'dot',

    // companies config key
    companies_config_key: 'companies_config_key',

    // teams
    teams: 'teams',
    team : 'team',

    // manifests
    manifests           : 'manifests',
    manifest            : 'manifest',
    manifest_stats      : 'manifest_stats',
    manifest_truck_route: 'manifest_truck_route',
    manifests_drivers   : 'manifests_drivers',
    manifest_loads      : 'manifest_loads',

    // loan
    loan: 'loan',

    // trucks availability
    cap_list_share_link: 'cap_list_share_link',

    trucks_availability: 'trucks_availability',

    // settings.integrations
    integrations: 'integrations',
    integration : 'integration',

    // quikbooks
    integration_quickbooks_items       : 'integration.quickbooks.items',
    integration_quickbooks_invoice     : 'integration.quickbooks.invoice',
    integration_quickbooks_customers   : 'integration.quickbooks.customers',
    integration_quickbooks_vendors     : 'integration.quickbooks.vendors',
    integration_quickbooks_accounts    : 'integration.quickbooks.accounts',
    integration_quickbooks_bill        : 'integration.quickbooks.bill',
    integration_quickbooks_bill_payment: 'integration.quickbooks.bill.payment',
    integration_quickbooks_classes     : 'integration.quickbooks.classes',

    // apexcapital
    integration_apexcapital_items     : 'integration.apexcapital.items',
    integration_apexcapital_equipments: 'integration.apexcapital.equipments',
    integration_apexcapital_preview   : 'integration.apexcapital.preview',

    // tru fund
    integration_trufund_preview: 'integration.trufund.preview',

    // wex
    integration_wex_transactionTypes: 'integration.wex.transactionTypes',

    // loadboard
    loadboard_search               : 'loadboard.search',
    loadboard_search_results       : 'loadboard.search.results',
    loadboard_search_viewed_results: 'loadboard.search.viewed.results',

    account     : 'account',
    trackingLink: 'trackingLink',

    // billing
    billing_all_invoices      : 'billing.all',
    billing_all_invoices_stats: 'billing.all.stats',

    billing_amazon_invoices      : 'billing.amazon',
    billing_amazon_invoices_stats: 'billing.amazon.stats',

    billing_direct_invoices      : 'billing.direct',
    billing_direct_invoices_stats: 'billing.direct.stats',

    billing_factoring_invoices: 'billing.factoring',
    billing_factoring_stats   : 'billing.factoring.stats',

    // brokers
    brokers    : 'brokers',
    brokerUsers: 'brokerUsers',
    broker     : 'broker',

    // charts
    chart: 'chart',

    // customers
    customers    : 'customers',
    customer     : 'customer',
    customerUsers: 'customerUsers',

    // dispatch
    dispatchers: 'dispatchers',

    // documents
    documents        : 'documents',
    document         : 'document',
    document_types   : 'document_types',
    document_versions: 'document_versions',

    // drafts
    drafts   : 'drafts',
    draft    : 'draft',
    waypoints: 'waypoints',

    // drivers
    drivers               : 'drivers',
    driver                : 'driver',
    drivers_types         : 'driver_types',
    critical_notifications: 'critical_notifications',
    devices               : 'devices',

    equipment_types          : 'equipment_types',
    factoring_companies      : 'factoring_companies',
    factoring_companies_stats: 'factoring_companies_stats',

    // fuel
    fuel: 'fuel',

    // home
    home: 'home',

    // ifta
    periods: 'periods',
    period : 'period',

    // import
    processors: 'processors',

    // loads
    loads           : 'loads',
    load            : 'load',
    load_types      : 'load_types',
    load_commodity  : 'load_commodity',
    load_truck_route: 'load_truck_route',

    invoice_item_categories   : 'invoice_item_categories',
    driver_pay_item_categories: 'driver_pay_item_categories',

    // map
    map_entity: 'map_entity',

    // notes
    notes: 'notes',
    note : 'note',

    page_data: 'page_data',

    // plates
    plates         : 'plates',
    plate          : 'plate',
    plate_companies: 'plate_companies',

    // settings
    settings         : 'settings',
    providers        : 'providers',
    users            : 'users',
    user             : 'user',
    billing          : 'billing',
    payment_method   : 'payment_method',
    subscription     : 'subscription',
    roles            : 'roles',
    permission_groups: 'permission_groups',
    bank_accounts    : 'bank_accounts',

    invoices: 'invoices',

    // settlement
    settlements                     : 'settlements',
    settlement                      : 'settlement',
    settlement_sync                 : 'settlement_sync',
    recurring_transactions          : 'recurring_transactions',
    recurring_transaction           : 'recurring_transaction',
    settlement_periods              : 'settlement_periods',
    recurring_transaction_categories: 'recurring_transaction_categories',
    recurring_transaction_category  : 'recurring_transaction_category',
    cycles                          : 'cycles',
    revenue_types                   : 'revenue_types',
    revenue_type                    : 'revenue_type',

    // payouts
    payouts: 'payouts',
    payout : 'payout',

    // tags
    tags: 'tags',
    tag : 'tag',

    scheduling: 'scheduling', // ????

    export_config: 'export_config',

    tickets: 'tickets',

    tolls: 'tolls',
    toll : 'toll',

    // trailers
    trailers         : 'trailers',
    trailer          : 'trailer',
    trailer_companies: 'trailer_companies',
    trailer_types    : 'trailer_types',

    // trucks
    trucks: 'trucks',
    truck : 'truck',

    // vendors
    vendors: 'vendors',
    vendor : 'vendor',

    company: 'company',
    fields : 'fields',

    order_users      : 'order_users',
    invoicing_company: 'invoicing_company',

    settlement_transactions_history: 'settlement_transactions_history'
});

export default API_TAGS;

export type ProvideTagsType = (typeof API_TAGS)[keyof typeof API_TAGS];
