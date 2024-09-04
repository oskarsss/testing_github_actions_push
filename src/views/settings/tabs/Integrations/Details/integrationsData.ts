/* eslint-disable max-len */

import SYSTEM from '@/@system';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';

type IntegrationsData = {
    title: string;
    link_href: string;
    link_text: string;
    description?: IntlMessageKey;
    rows?: {
        title: IntlMessageKey;
        description: IntlMessageKey;
        translateOptions?: {
            title?: IntlOptions;
            description?: IntlOptions;
        };
    }[];
    translateOptions?: {
        description?: IntlOptions;
    };
};

type Key = (typeof PROVIDER_ID)[keyof typeof PROVIDER_ID];

const integrationsData: Record<Key, IntegrationsData> = Object.freeze({
    [PROVIDER_ID.OPTIMA_ELD]: {
        title    : 'Optima ELD',
        link_href: 'https://optimaeld.com/',
        link_text: 'optimaeld.com'
    },
    [PROVIDER_ID.TRUCK_STOP]: {
        title    : 'Truckstop',
        link_href: 'https://truckstop.com/',
        link_text: 'truckstop.com'
    },
    [PROVIDER_ID.TRUFUNDING]: {
        title    : 'TruFund',
        link_href: 'https://www.trufunding.net/',
        link_text: 'trufunding.net'
    },
    [PROVIDER_ID.QUICKBOOKS]: {
        title           : 'QuickBooks',
        link_href       : 'https://quickbooks.intuit.com/',
        link_text       : 'quickbooks.intuit.com',
        description     : 'settings:integrations.details.left_side.quickbooks.description',
        translateOptions: {
            description: {
                friendlyName: SYSTEM.TMS_FRIENDLY_NAME
            }
        },
        rows: [
            {
                title: 'settings:integrations.details.left_side.quickbooks.rows.what_is_quickbooks.title',
                description:
                    'settings:integrations.details.left_side.quickbooks.rows.what_is_quickbooks.description'
            },
            {
                title: 'settings:integrations.details.left_side.quickbooks.rows.merge_with_quickbooks.title',
                description:
                    'settings:integrations.details.left_side.quickbooks.rows.merge_with_quickbooks.description',
                translateOptions: {
                    title: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    },
                    description: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    }
                }
            }
        ]
    },
    [PROVIDER_ID.TCS]: {
        title           : 'TSC Fuel',
        link_href       : 'https://www.tcsfuel.com/',
        link_text       : 'tcsfuel.com',
        description     : 'settings:integrations.details.left_side.tsc.description',
        translateOptions: {
            description: {
                friendlyName: SYSTEM.TMS_FRIENDLY_NAME
            }
        },
        rows: [
            {
                title: 'settings:integrations.details.left_side.tsc.rows.what_is_tsc.title',
                description:
                    'settings:integrations.details.left_side.tsc.rows.what_is_tsc.description'
            },
            {
                title: 'settings:integrations.details.left_side.tsc.rows.optimizes_tcs.title',
                description:
                    'settings:integrations.details.left_side.tsc.rows.optimizes_tcs.description',
                translateOptions: {
                    title: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    },
                    description: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    }
                }
            }
        ]
    },
    [PROVIDER_ID.FLEET_ONE_WEX]: {
        title           : 'Fleet One WEX',
        link_href       : 'https://www.fleetone.com/',
        link_text       : 'fleetone.com',
        description     : 'settings:integrations.details.left_side.fleet_one_wex.description',
        translateOptions: {
            description: {
                friendlyName: SYSTEM.TMS_FRIENDLY_NAME
            }
        },
        rows: [
            {
                title: 'settings:integrations.details.left_side.fleet_one_wex.rows.what_is_fleet_one_wex.title',
                description:
                    'settings:integrations.details.left_side.fleet_one_wex.rows.what_is_fleet_one_wex.description'
            },
            {
                title: 'settings:integrations.details.left_side.fleet_one_wex.rows.sync_with_fleet.title',
                description:
                    'settings:integrations.details.left_side.fleet_one_wex.rows.sync_with_fleet.description',
                translateOptions: {
                    title: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    },
                    description: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    }
                }
            }
        ]
    },
    [PROVIDER_ID.MOTIVE]: {
        title           : 'Motive',
        link_href       : 'https://gomotive.com/',
        link_text       : 'gomotive.com',
        description     : 'settings:integrations.details.left_side.motive.description',
        translateOptions: {
            description: {
                friendlyName: SYSTEM.TMS_FRIENDLY_NAME
            }
        },
        rows: [
            {
                title: 'settings:integrations.details.left_side.motive.rows.what_is_motive.title',
                description:
                    'settings:integrations.details.left_side.motive.rows.what_is_motive.description'
            },
            {
                title: 'settings:integrations.details.left_side.motive.rows.motive.title',
                description:
                    'settings:integrations.details.left_side.motive.rows.motive.description',
                translateOptions: {
                    title: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    },
                    description: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    }
                }
            }
        ]
    },
    [PROVIDER_ID.SAMSARA]: {
        title           : 'Samsara',
        link_href       : 'https://www.samsara.com/',
        link_text       : 'samsara.com',
        description     : 'settings:integrations.details.left_side.samsara.description',
        translateOptions: {
            description: {
                friendlyName: SYSTEM.TMS_FRIENDLY_NAME
            }
        },
        rows: [
            {
                title: 'settings:integrations.details.left_side.samsara.rows.what_is_samsara.title',
                description:
                    'settings:integrations.details.left_side.samsara.rows.what_is_samsara.description'
            },
            {
                title: 'settings:integrations.details.left_side.samsara.rows.enhances_samsara.title',
                description:
                    'settings:integrations.details.left_side.samsara.rows.enhances_samsara.description',
                translateOptions: {
                    title: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    },
                    description: {
                        friendlyName: SYSTEM.TMS_FRIENDLY_NAME
                    }
                }
            }
        ]
    },
    [PROVIDER_ID.UBER_FREIGHT]: {
        title    : 'Uber Freight',
        link_href: 'https://www.uberfreight.com/',
        link_text: 'uberfreight.com'
    },
    [PROVIDER_ID.LOADBOARD_123]: {
        title    : '123Loadboard',
        link_href: 'https://www.123loadboard.com/',
        link_text: '123loadboard.com'
    },
    [PROVIDER_ID.APEX_CAPITAL]: {
        title    : 'Apex Capital',
        link_href: 'https://www.apexcapitalcorp.com/',
        link_text: 'apexcapitalcorp.com'
    },
    [PROVIDER_ID.MACROPOINT]: {
        title    : 'Descrates MacroPoint',
        link_href: 'https://www.macropoint.com/',
        link_text: 'macropoint.com'
    },
    [PROVIDER_ID.ELD_ALFA]: {
        title    : 'Alfa ELD',
        link_href: 'https://alfaeld.com/',
        link_text: 'alfaeld.com'
    },
    [PROVIDER_ID.TRUCK_SMARTER]: {
        title    : 'TruckSmarter',
        link_href: 'https://www.trucksmarter.com/',
        link_text: 'trucksmarter.com'
    },
    [PROVIDER_ID.BEST_PASS]: {
        title    : 'BestPass',
        link_href: 'https://bestpass.com/',
        link_text: 'bestpass.com'
    },
    [PROVIDER_ID.PRE_PASS]: {
        title    : 'PrePass',
        link_href: 'https://prepass.com/',
        link_text: 'prepass.com'
    },
    [PROVIDER_ID.CH_ROBINSON]: {
        title    : 'CH Robinson',
        link_href: 'https://www.chrobinson.com/',
        link_text: 'chrobinson.com'
    },
    [PROVIDER_ID.ELD_RIDER]: {
        title      : 'ELD Rider',
        link_href  : 'https://eldrider.us/',
        link_text  : 'eldrider.us',
        description: 'settings:integrations.details.left_side.eld_rider.description',
        rows       : [
            {
                title: 'settings:integrations.details.left_side.eld_rider.rows.intro_about_eld_rider.title',
                description:
                    'settings:integrations.details.left_side.eld_rider.rows.intro_about_eld_rider.description'
            },
            {
                title: 'settings:integrations.details.left_side.eld_rider.rows.how_works.title',
                description:
                    'settings:integrations.details.left_side.eld_rider.rows.how_works.description'
            }
        ]
    },
    default: {
        title    : 'Integration',
        link_href: `${SYSTEM.PRESENT_LINK}`,
        link_text: `${SYSTEM.PRESENT_LINK_TITLE}`
    }
});

export default integrationsData;
