import moment from 'moment-timezone';
import { ColumnsConfig } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import SettlementsTypes from '@/store/accounting/settlements/types';
import CellWithMultipleLines from '@/@core/components/cell-with-multiple-lines/CellWithMultipleLines';
import UnAssignFuelCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Fuel/custom-cells/UnAssignFuelCell';
import AssignFuelCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Fuel/custom-cells/AssignFuelCell';
import DiscountItem from './custom-cells/DiscountItem';
import AmountItem from './custom-cells/AmountItem';
import VerifiedItem from './custom-cells/VerifiedItem';

const fuel_columns: ColumnsConfig<SettlementsTypes.CycleSettlementDetails.FuelTransaction> = {
    withAssignRow   : true,
    assigned_columns: (settlement) => ({
        total_amount           : !false ? settlement.fuelInfo?.totals?.assignedAmount || '' : '',
        total_discounted_amount: settlement.fuelInfo?.totals?.assignedDiscountedAmount
            ? settlement.fuelInfo?.totals?.assignedDiscountedAmount
            : ''
    }),
    unassigned_columns: (settlement) => ({
        total_amount           : !false ? settlement.fuelInfo?.totals?.unassignedAmount || '' : '',
        total_discounted_amount: settlement.fuelInfo?.totals?.unassignedDiscountedAmount
            ? settlement.fuelInfo.totals.unassignedDiscountedAmount
            : ''
    }),
    getItems: (settlement) => settlement.fuelInfo?.fuel || [],
    columns : [
        {
            minWidth      : 52,
            headerName    : '',
            withEditButton: false,
            flex_start    : true,
            field         : 'fuel_actions',
            cellStyles    : { padding: 0 },
            renderCell    : (row) => {
                if (row.settlementId) {
                    return <UnAssignFuelCell fuelTransactionId={row.fuelTransactionId} />;
                }
                return <AssignFuelCell fuelTransactionId={row.fuelTransactionId} />;
            }
        },
        {
            minWidth      : 140,
            headerName    : 'common:id',
            field         : 'id',
            withEditButton: true,
            flex_start    : true,
            color         : 'secondary',
            renderCell    : (row) => row.referenceId
        },
        {
            minWidth      : 180,
            headerName    : 'common:location',
            withEditButton: true,
            field         : 'location',
            flex_start    : true,
            color         : 'secondary',
            renderCell    : (row) => (
                <CellWithMultipleLines
                    info={`${row.city.toUpperCase() ?? ''}, ${row.state ?? ''}`}
                    subInfo={`${moment(row.datetime).format('MM/DD hh:mm A')}`}
                />
            )
        },
        {
            minWidth      : 180,
            headerName    : 'modals:settlements.edit_settlement.tabs.fuel.table.columns.truck_stop',
            withEditButton: true,
            field         : 'truck_stop',
            flex_start    : true,
            color         : 'secondary',
            renderCell    : (row) => row.truckStop
        },
        {
            minWidth      : 150,
            headerName    : 'modals:settlements.edit_settlement.tabs.fuel.table.columns.product',
            withEditButton: true,
            field         : 'product',
            flex_start    : true,
            color         : 'secondary',
            renderCell    : (row) => row.product
        },
        {
            minWidth      : 90,
            headerName    : 'modals:settlements.edit_settlement.tabs.fuel.table.columns.verified',
            withEditButton: false,
            field         : 'verified',
            flex_start    : true,
            renderCell    : (row) => (
                <VerifiedItem
                    verified={row.verified}
                    fuelTransactionId={row.fuelTransactionId}
                />
            )
        },
        {
            minWidth      : 60,
            headerName    : 'common:quantity',
            withEditButton: false,
            field         : 'quantity',
            flex_start    : false,
            color         : 'secondary',
            renderCell    : (row) => row.quantity
        },
        {
            minWidth      : 130,
            headerName    : 'modals:settlements.edit_settlement.tabs.fuel.table.columns.upload_at',
            withEditButton: false,
            field         : 'upload_at',
            flex_start    : true,
            color         : 'secondary',
            renderCell    : (row) => moment(row.datetime).format('MM/DD hh:mm A')
        },
        {
            minWidth      : 120,
            flex_start    : false,
            headerName    : 'common:amount',
            field         : 'total_amount',
            withEditButton: false,
            color         : 'secondary',
            renderCell    : (row) => <AmountItem row={row} />
        },
        {
            minWidth  : 140,
            flex_start: false,
            headerName:
                'modals:settlements.edit_settlement.tabs.fuel.table.columns.discounted_amount',
            field         : 'total_discounted_amount',
            withEditButton: false,
            renderCell    : (row) => <DiscountItem row={row} />
        }
    ]
};

export default fuel_columns;
