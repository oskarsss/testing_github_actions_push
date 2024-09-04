import SettlementsTypes from '@/store/accounting/settlements/types';
import type { IntlMessageKey } from '@/@types/next-intl';
import EditSettlementIcons from '../../../edit-settlement-icons';
import EditSettlementManifests from '../../../components/edit-settlement-tables/Loads/EditSettlementManifests';
import TransactionsTableRegular from '../../../components/edit-settlement-tables/Transactions/TransactionsTableRegular';
import EditSettlementTolls from '../../../components/edit-settlement-tables/Tolls/EditSettlementTolls';
import EditSettlementFuel from '../../../components/edit-settlement-tables/Fuel/EditSettlementFuel';

type TabConfig = {
    label: IntlMessageKey;
    labelForSmallScreen?: IntlMessageKey;
    Icon: (isSelected: boolean) => JSX.Element;
    settlement_field:
        | keyof Pick<
              SettlementsTypes.CycleSettlementDetails.Settlement,
              'manifestsInfo' | 'driverRecurringTransactionsInfo' | 'tollsInfo' | 'fuelInfo'
          >;
    assignedQuantity: (settlement: SettlementsTypes.CycleSettlementDetails.Settlement) => number;
    unassingnedQuantity: (settlement: SettlementsTypes.CycleSettlementDetails.Settlement) => number;
    assignedIcon?: () => JSX.Element;
    unassingedIcon?: () => JSX.Element;
    Component: any;
}[];

export const tabs_config: TabConfig = [
    {
        label           : 'entity:manifests',
        Icon            : (isSelected) => EditSettlementIcons.Tabs.Manifests({ isSelected }),
        settlement_field: 'manifestsInfo' as const,
        Component       : EditSettlementManifests,
        assignedQuantity: (settlement) =>
            settlement.manifestsInfo?.manifests?.filter((manifest) => manifest.settlementId)
                ?.length ?? 0,
        unassingnedQuantity: (settlement) =>
            settlement.manifestsInfo?.manifests?.filter((manifest) => !manifest.settlementId)
                ?.length ?? 0
    },
    {
        label              : 'modals:settlements.edit_settlement.tabs.transactions.label',
        Icon               : (isSelected) => EditSettlementIcons.Tabs.Transactions({ isSelected }),
        settlement_field   : 'driverRecurringTransactionsInfo' as const,
        Component          : TransactionsTableRegular,
        unassingedIcon     : () => <EditSettlementIcons.FromRecurringTransactionsIcon />,
        assignedIcon       : () => <EditSettlementIcons.Tabs.Transactions />,
        unassingnedQuantity: (settlement) =>
            settlement?.driverRecurringTransactionsInfo?.recurringTransactions?.length ?? 0,
        assignedQuantity: (settlement) => settlement.transactionsInfo?.transactions?.length ?? 0
    },
    {
        label              : 'modals:settlements.edit_settlement.tabs.tolls.label',
        labelForSmallScreen: 'modals:settlements.edit_settlement.tabs.tolls.label_for_small_screen',
        Icon               : (isSelected) => EditSettlementIcons.Tabs.Toll({ isSelected }),
        settlement_field   : 'tollsInfo' as const,
        Component          : EditSettlementTolls,
        assignedQuantity   : (settlement) =>
            settlement.tollsInfo?.tolls?.filter((toll) => toll.settlementId)?.length ?? 0,
        unassingnedQuantity: (settlement) =>
            settlement.tollsInfo?.tolls?.filter((toll) => !toll.settlementId)?.length ?? 0
    },
    {
        label              : 'modals:settlements.edit_settlement.tabs.fuel.label',
        labelForSmallScreen: 'modals:settlements.edit_settlement.tabs.fuel.label_for_small_screen',
        Icon               : (isSelected) => EditSettlementIcons.Tabs.Fuel({ isSelected }),
        settlement_field   : 'fuelInfo' as const,
        Component          : EditSettlementFuel,
        assignedQuantity   : (settlement) =>
            settlement.fuelInfo?.fuel?.filter((fuel) => fuel.settlementId)?.length ?? 0,
        unassingnedQuantity: (settlement) =>
            settlement.fuelInfo?.fuel?.filter((fuel) => !fuel.settlementId)?.length ?? 0
    }
];

export type TabValueState = (typeof tabs_config)[number]['settlement_field'];

export type ChangeTabAction = (_: React.SyntheticEvent, newValue: TabValueState) => void;
