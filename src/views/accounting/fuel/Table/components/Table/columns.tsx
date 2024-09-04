import { checkbox_style, getFunctionalCheckbox } from '@/@core/components/table/table_config';
import type Fuel from '@/store/accounting/fuel/types';
import type TableTypes from '@/@core/components/table/types';
import FuelAssignTruck from '@/views/accounting/fuel/Table/components/Table/custom-cell/truck-cell/AssignTruckCell';
import TruckCell from '@/views/accounting/fuel/Table/components/Table/custom-cell/truck-cell/TruckCell';
import SelectDeselectItemsCheckbox from '@/@core/components/table/custom-cells/SelectDeselectTableItemsCheckbox';
import { FuelModel_SettlementStatus } from '@proto/models/model_fuel';

export const columns: TableTypes.FixedCustomColumns<Fuel.FuelTransactionRow> = {
    multi_select_checkbox: {
        width: 50,
        style: {
            display       : 'flex',
            justifyContent: 'center',
            alignItems    : 'center',
            borderLeft    : '1px solid #d4d3d524',
            borderRight   : '1px solid #d4d3d524'
        },
        renderCell: (row) => (
            <SelectDeselectItemsCheckbox
                id={row.fuelTransactionId}
                tableName="fuels"
            />
        )
    },
    verified: {
        width     : 50,
        onClick   : (row, { executeAction }) => executeAction('change_verified', { row }),
        style     : checkbox_style,
        renderCell: (row) => getFunctionalCheckbox(row.verified)
    },
    status: {
        width     : 140,
        onClick   : (row, { executeAction }) => executeAction('view', { row }),
        renderCell: (row) => row.settlementStatus
    },
    truck_type: {
        width     : 140,
        onClick   : (row, { executeAction }) => executeAction('view', { row }),
        renderCell: (row) => row.truck.type
    },
    in_network: {
        width     : 100,
        onClick   : (row, { executeAction }) => executeAction('view', { row }),
        renderCell: (row) => row.inNetwork
    },
    settlement: {
        width     : 100,
        onClick   : (row, { executeAction }) => executeAction('view', { row }),
        renderCell: (row, { t }) =>
            row.settlementStatus === FuelModel_SettlementStatus.ASSIGNED
                ? t('common:assigned')
                : t('common:unassigned')
    },
    truck: {
        width  : 100,
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('truck', { row, event }),
        renderCell: (row) =>
            row.truckId ? <TruckCell truck_id={row.truckId} /> : <FuelAssignTruck />
    }
};
