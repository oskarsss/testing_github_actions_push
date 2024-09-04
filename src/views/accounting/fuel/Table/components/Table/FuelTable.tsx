import {
    default_fuel_filters,
    useFuelTransactionsStats,
    useMainFuelTransactions
} from '@/store/accounting/fuel/hooks';
import { useAppDispatch } from '@/store/hooks';
import { useCallback } from 'react';
import Table from '@/@core/components/table/Table';
import Fuel from '@/store/accounting/fuel/types';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from '@/@core/components/confirm-dialog';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';
import TableTypes from '@/@core/components/table/types';
import { useFuelOptionMenu } from '@/views/accounting/fuel/Table/menus/FuelOptionsMenu';
import { useAssignFuelMenu } from '@/views/accounting/fuel/Table/menus/FuelAssignTruck';
import { useSelectedTableIds } from '@/store/table/hooks';
import { TableActions } from '@/store/table/slice';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { prepareFilters } from '@/@core/components/query-string-cover';
import { columns } from './columns';
import { useCreateFuelTransactionDialog } from '../../dialogs/CreateFuelTransaction/CreateFuelTransaction';
import { useEditFuelTransactionDialog } from '../../dialogs/EditFuelTransaction/EditFuelTransaction';

export default function FuelTable() {
    const dispatch = useAppDispatch();
    const createFuelTransactionDialog = useCreateFuelTransactionDialog();
    const confirm = useConfirm();
    const handleCreateFuelTransaction = useCallback(() => {
        createFuelTransactionDialog.open({});
    }, [createFuelTransactionDialog]);

    const tableName = 'fuels';
    const selectedFuelsIds = useSelectedTableIds(tableName);
    const [deleteFuels] = FuelGrpcService.useDeleteFuelTransactionMutation();
    const [changeVerified] = FuelGrpcService.useChangeVerifiedMutation();

    const {
        rows,
        view,
        headers,
        isLoading,
        selected_filters,
        updateColumnWidth,
        fuelList
    } =
        useMainFuelTransactions();

    const editFuelTransactionDialog = useEditFuelTransactionDialog();
    const fuelOptionsMenu = useFuelOptionMenu();
    const assignFuelMenu = useAssignFuelMenu();

    const {
        filter_id,
        rows_total
    } = useFuelTransactionsStats();

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const updateFilters = useUpdateSearchFilters(default_fuel_filters);

    const executeAction: TableTypes.executeAction<Fuel.FuelTransactionRow, true> = (
        name,
        props
    ) => {
        switch (name) {
        case 'change_verified':
            changeVerified({
                fuelTransactionId: props.row.fuelTransactionId,
                verified         : !props.row.verified
            });

            break;
        case 'truck':
            if (props.row.truckId) {
                fuelOptionsMenu.open({
                    fuelTransactionId: props.row.fuelTransactionId,
                    truckId          : props.row.truckId
                })(props.event);
                break;
            }
            assignFuelMenu.open({ fuelTransactionId: props.row.fuelTransactionId })(
                props.event
            );
            break;
        default:
            editFuelTransactionDialog.open({
                fuelTransactionId: props.row.fuelTransactionId
            });
            break;
        }
    };

    const handleDeleteFuels = useCallback(() => {
        deleteFuels({
            fuelTransactionIds: selectedFuelsIds
        })
            .unwrap()
            .then(() => {
                dispatch(TableActions.ResetIds({ tableName }));
            });
    }, [deleteFuels, dispatch, selectedFuelsIds]);

    const deleteAction = useCallback(() => {
        confirm({
            title       : 'fuels:confirm_dialog.delete.title',
            body        : 'fuels:confirm_dialog.delete.body',
            confirm_text: 'common:button.delete',
            onConfirm   : handleDeleteFuels,
            icon        : <DeleteIcon />
        });
    }, [confirm, handleDeleteFuels]);

    const fuelIdsList = fuelList.map((item) => item.fuelTransactionId);

    return (
        <Table
            pageType="FUEL"
            rows={rows}
            columns={columns}
            filter_id={filter_id}
            tableName={tableName}
            onCreateItem={handleCreateFuelTransaction}
            view={view}
            headers={headers}
            isLoading={isLoading}
            defaultFilters={PAGES_FILTERS_CONFIG.ACCOUNTING.FUEL.defaultFilters}
            order={order}
            orderBy={orderBy}
            updateFilters={updateFilters}
            executeAction={executeAction}
            page={page}
            per_page={per_page}
            rows_total={rows_total}
            pagination
            onUpdateWidth={updateColumnWidth}
            setMultiSelect
            tableActionsConfig={{
                totalSelected: selectedFuelsIds.length,
                customActions: [
                    {
                        action : deleteAction,
                        label  : 'fuels:table.customActions.delete.label',
                        icon   : <DeleteIcon />,
                        tooltip: 'fuels:table.customActions.delete.tooltip'
                    }
                ]
            }}
            tableHeaderActionsConfig={{
                tableName,
                idsList: fuelIdsList
            }}
        />
    );
}
