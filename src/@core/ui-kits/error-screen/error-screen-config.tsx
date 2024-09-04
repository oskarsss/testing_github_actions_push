import type { ReactNode } from 'react';
import ERROR_SCREEN_ICONS from '@/@core/ui-kits/error-screen/error-screen-icons';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import type { IntlMessageKey } from '@/@types/next-intl';
import AddIcon from '@mui/icons-material/Add';

export enum ErrorScreenType {
    LOAD = 'load',
    LOADBOARD_CONNECT_INTEGRATION = 'loadboard_connect_integration',
    LOADBOARD_NO_SEARCHES = 'loadboard_no_searches',
    JOIN_INVITE = 'joinInvite',
    PERMISSION = 'permission',
    INTEGRATION_WEX_NO_TRANSACTIONS = 'integration_wex_no_transactions',
    WARRANTY = 'warranty',
    SERVICE_PROVIDERS = 'service_providers',
    SERVICE_LOGS = 'service_logs',
    SEND_SETTLEMENT = 'send_settlement'
}

export type Config = {
    Icon: ReactNode | null;
    buttonIcon?: ReactNode;
    title: IntlMessageKey;
    subTitle: IntlMessageKey;
    header: IntlMessageKey;
};

const ERROR_SCREEN_CONFIG: Record<ErrorScreenType, Config> = {
    [ErrorScreenType.LOAD]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudErrorIcon />,
        buttonIcon: <RefreshSharpIcon />,
        title     : 'loads:details.error.sub_title',
        subTitle  : 'loads:details.error.button',
        header    : 'loads:details.error.title'
    },
    [ErrorScreenType.LOADBOARD_CONNECT_INTEGRATION]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudErrorIcon />,
        buttonIcon: null,
        title     : 'loadboard:connect_integration.error.title',
        subTitle  : 'loadboard:connect_integration.error.sub_title',
        header    : 'loadboard:connect_integration.error.header'
    },
    [ErrorScreenType.LOADBOARD_NO_SEARCHES]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudErrorIcon />,
        buttonIcon: null,
        title     : 'loadboard:no_search.error.title',
        subTitle  : 'loadboard:no_search.error.sub_title',
        header    : 'loadboard:no_search.error.header'
    },
    [ErrorScreenType.JOIN_INVITE]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudErrorIcon />,
        buttonIcon: null,
        title     : 'auth:join.error.sub_title',
        subTitle  : 'auth:join.error.button',
        header    : 'auth:join.error.title'
    },
    [ErrorScreenType.PERMISSION]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudErrorWithSearchIcon />,
        buttonIcon: null,
        title     : 'core:errors_screen.permission.title',
        subTitle  : 'core:errors_screen.permission.button',
        header    : 'core:errors_screen.permission.header'
    },
    [ErrorScreenType.INTEGRATION_WEX_NO_TRANSACTIONS]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudErrorWithSearchIcon />,
        buttonIcon: null,
        title     : 'settings:integrations.details.right_side.wex.empty_screen.description',
        subTitle  : '',
        header    : 'settings:integrations.details.right_side.wex.empty_screen.title'
    },
    [ErrorScreenType.WARRANTY]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudErrorIcon />,
        buttonIcon: null,
        title     : 'core:errors_screen.warranty.title',
        subTitle  : 'core:errors_screen.warranty.button',
        header    : 'core:errors_screen.warranty.header'
    },
    [ErrorScreenType.SERVICE_PROVIDERS]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudServiceProvider />,
        buttonIcon: <AddIcon />,
        title     : 'maintenance:service_providers.table.empty_screen.description',
        subTitle  : 'maintenance:service_providers.table.empty_screen.sub_title',
        header    : 'maintenance:service_providers.table.empty_screen.header'
    },
    [ErrorScreenType.SERVICE_LOGS]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudServiceLogs />,
        buttonIcon: <AddIcon />,
        title     : 'maintenance:service_logs.table.empty_screen.description',
        subTitle  : 'maintenance:service_logs.table.empty_screen.sub_title',
        header    : 'maintenance:service_logs.table.empty_screen.header'
    },
    [ErrorScreenType.SEND_SETTLEMENT]: {
        Icon      : <ERROR_SCREEN_ICONS.CloudErrorWithCrossDocument />,
        buttonIcon: null,
        header    : 'modals:settlements.send_settlement.empty.documents.title',
        title     : 'modals:settlements.send_settlement.empty.documents.sub_title',
        subTitle  : ''
    }
};

export default ERROR_SCREEN_CONFIG;
