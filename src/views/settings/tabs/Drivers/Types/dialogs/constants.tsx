import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { Stack } from '@mui/material';
import { DriverTypeCreateRequest_DriverType } from '@proto/driver_type';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import type { IntlMessageKey, TFunction } from '@/@types/next-intl';

type Option = {
    value: DriverTypeModel_Icon;
    label: IntlMessageKey;
};

const driverTypeIconsOptionsConfig: Option[] = [
    {
        value: DriverTypeModel_Icon.DEFAULT,
        label: 'state_info:drivers.type_icon.default'
    },
    {
        value: DriverTypeModel_Icon.OWNER_OPERATOR,
        label: 'state_info:drivers.type_icon.owner_operator'
    },
    {
        value: DriverTypeModel_Icon.COMPANY,
        label: 'state_info:drivers.type_icon.company'
    },
    {
        value: DriverTypeModel_Icon.LEASE,
        label: 'state_info:drivers.type_icon.lease'
    },
    {
        value: DriverTypeModel_Icon.LEASE_TO_OWN,
        label: 'state_info:drivers.type_icon.lease_to_own'
    }
];

export const getDriverTypesIconsOptions = (t: TFunction) =>
    driverTypeIconsOptionsConfig.map(({
        value,
        label
    }) => ({
        value,
        label: () => (
            <Stack
                direction="row"
                spacing={2}
                gap="6px"
            >
                {DRIVER_TYPE_ICONS[value]}
                <span>{t(label)}</span>
            </Stack>
        )
    }));

type PermissionCheckboxInputsOption = {
    name: keyof DriverTypeCreateRequest_DriverType;
    label: IntlMessageKey;
};

export const PermissionCheckboxInputsConfig: PermissionCheckboxInputsOption[] = [
    { name: 'isDefault', label: 'modals:settings.driver_types.create_update.is_default' },
    {
        name : 'permissionBankAccounts',
        label: 'modals:settings.driver_types.create_update.permission_bank_accounts'
    },
    {
        name : 'permissionCompletedLoads',
        label: 'modals:settings.driver_types.create_update.permission_completed_loads'
    },
    {
        name : 'permissionLoadsTotalAmount',
        label: 'modals:settings.driver_types.create_update.permission_loads_total_amount'
    },
    {
        name : 'permissionLoadsDriverPayAmount',
        label: 'modals:settings.driver_types.create_update.permission_loads_driver_pay_amount'
    },
    {
        name : 'permissionLoadsDistance',
        label: 'modals:settings.driver_types.create_update.permission_loads_distance'
    },
    {
        name : 'permissionSettlements',
        label: 'modals:settings.driver_types.create_update.permission_settlements'
    },
    {
        name : 'permissionSettlementViewLoads',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_loads'
    },
    {
        name : 'permissionSettlementViewLoadTotalAmount',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_loads_total_amount'
    },
    {
        name : 'permissionSettlementViewLoadsPayAmount',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_loads_pay_amount'
    },
    {
        name : 'permissionSettlementViewLoadsDistance',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_loads_distance'
    },
    {
        name : 'permissionSettlementViewFuel',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_fuel'
    },
    {
        name : 'permissionSettlementViewTolls',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_tolls'
    },
    {
        name : 'permissionSettlementViewCompanyFee',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_company_fee'
    },
    {
        name : 'permissionSettlementViewDebits',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_debits'
    },
    {
        name : 'permissionSettlementViewCredits',
        label: 'modals:settings.driver_types.create_update.permission_settlement_view_credits'
    },
    {
        name : 'permissionAppTakeScreenshots',
        label: 'modals:settings.driver_types.create_update.permission_app_take_screenshots'
    },
    {
        name : 'permissionOrderCommodityUpdate',
        label: 'modals:settings.driver_types.create_update.permission_order_commodity_update'
    },
    {
        name : 'permissionTruckSelfAssign',
        label: 'modals:settings.driver_types.create_update.permission_truck_self_assign'
    },
    {
        name : 'permissionTrailerSelfAssign',
        label: 'modals:settings.driver_types.create_update.permission_trailer_self_assign'
    }
];
