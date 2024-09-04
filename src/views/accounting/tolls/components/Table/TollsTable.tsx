import React, { useCallback, useMemo } from 'react';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import TollsTypes from '@/store/accounting/tolls/types';
import TableTypes from '@/@core/components/table/types';
import { useAppDispatch } from '@/store/hooks';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { default_tolls_filters, useMainTolls, useTollsStats } from '@/store/accounting/tolls/hooks';
import { useSelectedTableIds } from '@/store/table/hooks';
import { TableActions } from '@/store/table/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import VectorIcons from '@/@core/icons/vector_icons';
import { useBatchAssignTollsToEquipmentMenu } from '@/views/accounting/tolls/menus/batch-assign-toll-to-equipment/BatchAssignTollsToEquipment';
import { columns } from './columns';
import Table from '../../../../../@core/components/table/Table';
import { useCreateTollTransactionDialog } from '../../dialogs/CreateTollTransaction';
import { useEditTollTransactionDialog } from '../../dialogs/EditTollTransaction/EditTollTransactionDialog';

export default function TollsTable() {
    const tableName = 'tolls';
    const selectedTollsIds = useSelectedTableIds(tableName);
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    const createTollDialog = useCreateTollTransactionDialog();
    const confirm = useConfirm();
    const editToll = useEditTollTransactionDialog();
    const batchAssignTollsToEquipmentMenu = useBatchAssignTollsToEquipmentMenu();
    const [deleteTolls] = TollsGrpcService.useDeleteTollMutation();
    const [batchUnassignEquipment] = TollsGrpcService.useBatchUnassignEquipmentFromTollsMutation();

    const handleCreateToll = useCallback(() => {
        createTollDialog.open({});
    }, [createTollDialog]);

    const {
        view,
        headers,
        rows,
        isLoading,
        selected_filters: {
            order,
            orderBy,
            page,
            per_page
        },
        updateColumnWidth,
        tollsList
    } = useMainTolls();

    const {
        filter_id,
        rows_total
    } = useTollsStats();

    const updateFilters = useUpdateSearchFilters(default_tolls_filters);

    const deselectAll = useCallback(() => {
        dispatch(TableActions.ResetIds({ tableName }));
    }, [dispatch]);

    const deleteTollsHandler = useCallback(() => {
        deleteTolls({
            tollIds: selectedTollsIds
        })
            .unwrap()
            .then(deselectAll);
    }, [deleteTolls, deselectAll, selectedTollsIds]);

    const deleteAction = useCallback(() => {
        confirm({
            title       : 'tolls:confirm_dialog.delete.title',
            body        : 'tolls:confirm_dialog.delete.body',
            confirm_text: 'common:button.delete',
            onConfirm   : deleteTollsHandler,
            icon        : <DeleteIcon />
        });
    }, [confirm, deleteTollsHandler]);

    const batchAssignAction = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            batchAssignTollsToEquipmentMenu.open({
                tollIds            : selectedTollsIds,
                onSuccesBatchAssign: deselectAll
            })(event);
        },
        [batchAssignTollsToEquipmentMenu, deselectAll, selectedTollsIds]
    );

    const batchUnassignAction = useCallback(() => {
        confirm({
            title           : 'tolls:confirm_dialog.unassign_equipment.title',
            body            : 'tolls:confirm_dialog.unassign_equipment.body',
            confirm_text    : 'common:button.unassign',
            max_width_dialog: '500px',
            onConfirm       : () =>
                batchUnassignEquipment({
                    tollIds: selectedTollsIds
                })
                    .unwrap()
                    .then(deselectAll)
        });
    }, [batchUnassignEquipment, confirm, deselectAll, selectedTollsIds]);

    const executeAction: TableTypes.executeAction<TollsTypes.TollRow, true> = useCallback(
        (name: string, props) => {
            editToll.open({ tollId: props.row.tollTransactionId });
        },
        [editToll]
    );

    const tollIdsList = tollsList.map((item) => item.tollTransactionId);
    const translateColumns = useMemo(() => columns(t), [t]);

    return (
        <Table
            pageType="TOLLS"
            filter_id={filter_id}
            onCreateItem={handleCreateToll}
            defaultFilters={PAGES_FILTERS_CONFIG.ACCOUNTING.TOLLS.defaultFilters}
            tableName={tableName}
            rows={rows}
            view={view}
            headers={headers}
            columns={translateColumns}
            isLoading={isLoading}
            order={order}
            orderBy={orderBy}
            updateFilters={updateFilters}
            executeAction={executeAction}
            page={page}
            per_page={per_page}
            rows_total={rows_total}
            onUpdateWidth={updateColumnWidth}
            pagination
            setMultiSelect
            tableActionsConfig={{
                totalSelected: selectedTollsIds.length,
                customActions: [
                    {
                        label  : 'common:button.delete',
                        tooltip: 'tolls:table.customActions.delete.tooltip',
                        action : deleteAction,
                        icon   : <DeleteIcon />
                    },
                    {
                        label  : 'tolls:table.customActions.assign_equipment.label',
                        tooltip: 'tolls:table.customActions.assign_equipment.tooltip',
                        action : batchAssignAction,
                        icon   : <ControlPointDuplicateIcon />
                    },
                    {
                        label  : 'tolls:table.customActions.unassign_equipment.label',
                        tooltip: 'tolls:table.customActions.unassign_equipment.tooltip',
                        action : batchUnassignAction,
                        icon   : <VectorIcons.BatchUnassignIcon />
                    }
                ]
            }}
            tableHeaderActionsConfig={{
                tableName,
                idsList: tollIdsList
            }}
        />
    );
}
