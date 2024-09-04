import type TollsTypes from '@/store/accounting/tolls/types';
import type TableTypes from '@/@core/components/table/types';
import SelectDeselectItemsCheckbox from '@/@core/components/table/custom-cells/SelectDeselectTableItemsCheckbox';
import type { TFunction } from '@/@types/next-intl';
import { TollModel_SettlementStatus } from '@proto/models/model_toll';
import TrailerItem from './Items/TrailerItem';
import TollAssignEquipment from './Items/AssignItem';
import TruckItem from './Items/TruckItem';

const renderTollEquipment = (row: TollsTypes.TollRow) => {
    if (row.trailerId) {
        return (
            <TrailerItem
                tollId={row.tollTransactionId}
                trailer_id={row.trailerId}
            />
        );
    }
    if (row.truckId) {
        return (
            <TruckItem
                tollId={row.tollTransactionId}
                truck_id={row.truckId}
            />
        );
    }
    return <TollAssignEquipment tollId={row.tollTransactionId} />;
};

// eslint-disable-next-line import/prefer-default-export
export const columns = (t: TFunction) =>
    ({
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
                    id={row.tollTransactionId}
                    tableName="tolls"
                />
            )
        },

        equipment: {
            renderCell: (row) => renderTollEquipment(row),
            width     : 100,
            style     : {
                padding: '0px',
                margin : '0px',
                display: 'flex',
                flex   : '1 1 0'
            }
        },
        driver: {
            renderCell: (row) =>
                row?.driver
                    ? `${row.driver.firstName} ${row.driver.lastName}`
                    : t('common:empty.no_driver'),
            width: 100
        },
        truck: {
            renderCell: (row) => row?.truck?.referenceId ?? t('common:empty.no_truck'),
            width     : 100
        },
        settlement: {
            renderCell: (row) =>
                row.settlementStatus === TollModel_SettlementStatus.ASSIGNED
                    ? t('common:assigned')
                    : t('common:unassigned'),
            width: 100
        }
    } as TableTypes.FixedCustomColumns<TollsTypes.ConvertedTollRow>);
