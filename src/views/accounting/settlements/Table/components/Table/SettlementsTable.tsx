import { useCallback, useMemo, type MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    useCycles,
    useMainPeriods,
    useMainSettlements,
    useSettlementCycleId,
    useSettlementPeriodId,
    useSettlementsViews
} from '@/store/accounting/settlements/hooks/settlements';
import Table from '@/@core/components/table/Table';
import TableTypes from '@/@core/components/table/types';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { SettlementsActions } from '@/store/accounting/settlements/slice';
import SendIcon from '@mui/icons-material/Send';
import IosShareIcon from '@mui/icons-material/IosShare';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { TableActions } from '@/store/table/slice';
import { useSelectedTableIds } from '@/store/table/hooks';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import VectorIcons from '@/@core/icons/vector_icons';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import columns from './columns';
import { useEditSettlementDialog } from '../../../dialogs/edit-settlement/EditSettlement';
import { useChangeStatusMenu } from '../../menus/ChangeStatusMenu';
import { useCreateSettlementDialog } from '../../../dialogs/create-settlement/CreateSettlement';
import { useSendBatchSettlements } from '../../../dialogs/batch-send-settlements/BatchSendSettlements';

export default function SettlementsTable() {
    const cycleId = useSettlementCycleId();
    const periodId = useSettlementPeriodId();

    const [batchDelete] = SettlementsGrpcService.useBatchDeleteSettlementMutation();
    const [batchExport] = SettlementsGrpcService.useBatchExportSettlementMutation();

    const downloadFile = useDownloadFile();
    const { isLoading: isCyclesLoading } = useCycles();
    const { isLoading: isPeriodsLoading } = useMainPeriods(cycleId);

    const confirm = useConfirm();

    const {
        view,
        headers,
        tableName
    } = useSettlementsViews();

    const dispatch = useAppDispatch();

    const editSettlementDialog = useEditSettlementDialog();
    const createSettlementDialog = useCreateSettlementDialog();

    const handleCreateSettlement = useCallback(() => {
        createSettlementDialog.open({});
    }, [createSettlementDialog]);

    const changeStatusMenu = useChangeStatusMenu();
    const batchSendSettlementDialog = useSendBatchSettlements();

    const totalSelectedSettlements = useSelectedTableIds(tableName);

    const reduxSettlementLoading = useAppSelector((state) => state.settlements.isLoading);

    const {
        rows_total,
        rows,
        totals,
        filter_id,
        selected_filters,
        updateWidth,
        isLoading: isSettlementsLoading
    } = useMainSettlements();

    const updateFilters = useAdvancedUpdateFilters({ filter_id });

    const {
        order,
        orderBy
    } = selected_filters;

    const deselectAll = useCallback(() => {
        dispatch(TableActions.ResetIds({ tableName }));
    }, [dispatch, tableName]);

    const executeAction = useCallback(
        (
            name: string,
            props: {
                row: SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;
            }
        ) => {
            switch (name) {
            case 'options':
                if (!cycleId || !periodId) {
                    return;
                }

                editSettlementDialog.open({
                    settlement_id: props.row.settlementId,
                    cycle_id     : cycleId,
                    period_id    : periodId
                });

                break;

            case 'recurring_transaction':
                if (!cycleId || !periodId) {
                    return;
                }

                dispatch(SettlementsActions.ToggleTabValue('driverRecurringTransactionsInfo'));

                editSettlementDialog.open({
                    settlement_id: props.row.settlementId,
                    cycle_id     : cycleId,
                    period_id    : periodId
                });

                break;
            default:
                break;
            }
        },
        [cycleId, periodId, editSettlementDialog, dispatch]
    );

    const openBatchSendSettlements = useCallback(() => {
        batchSendSettlementDialog.open({
            cycleId,
            periodId,
            settlementIds: totalSelectedSettlements
        });
    }, [batchSendSettlementDialog, cycleId, periodId, totalSelectedSettlements]);

    const handleBatchExport = useCallback(() => {
        batchExport({
            settlements: totalSelectedSettlements.map((id) => ({
                cycleId,
                periodId,
                settlementId: id
            }))
        })
            .unwrap()
            .then(({ fileId }) => {
                downloadFile(fileId);
            });
    }, [batchExport, cycleId, downloadFile, periodId, totalSelectedSettlements]);

    const handleClickChangeStatus = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            changeStatusMenu.open({})(event);
        },
        [changeStatusMenu]
    );

    const confirmDelete = useCallback(() => {
        batchDelete({
            settlements: totalSelectedSettlements.map((id) => ({
                cycleId,
                periodId,
                settlementId: id
            }))
        })
            .unwrap()
            .then(() => {
                deselectAll();
            });
    }, [batchDelete, cycleId, deselectAll, periodId, totalSelectedSettlements]);

    const handleBatchDelete = useCallback(() => {
        confirm({
            body        : 'settlements:confirm_dialog.delete.body',
            title       : 'settlements:confirm_dialog.delete.title',
            onConfirm   : confirmDelete,
            confirm_text: 'common:button.delete'
        });
    }, [confirm, confirmDelete]);

    const customActions: TableTypes.TableActions['customActions'] = useMemo(
        () => [
            {
                action : (event: MouseEvent<HTMLButtonElement>) => handleClickChangeStatus(event),
                label  : 'settlements:table.custom_action.change_status_to.label',
                icon   : <ModeEditIcon />,
                tooltip: 'settlements:table.custom_action.change_status_to.tooltip'
            },
            {
                label  : 'common:button.export',
                action : handleBatchExport,
                tooltip: 'settlements:table.custom_action.export.tooltip',
                icon   : <IosShareIcon />
            },
            {
                label  : 'common:button.send',
                action : openBatchSendSettlements,
                tooltip: 'settlements:table.custom_action.send.tooltip',
                icon   : <SendIcon />
            },
            {
                label  : 'common:button.delete',
                action : handleBatchDelete,
                tooltip: 'settlements:table.custom_action.delete.tooltip',
                icon   : <VectorIcons.TrashIcon />
            }
        ],
        [handleBatchDelete, handleBatchExport, handleClickChangeStatus, openBatchSendSettlements]
    );

    const settlementIdsList = rows.map((item) => item.settlementId);

    const isLoading =
        isCyclesLoading || reduxSettlementLoading || isPeriodsLoading || isSettlementsLoading;

    return (
        <Table<SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow, true>
            headers={headers}
            filter_id={filter_id}
            onCreateItem={handleCreateSettlement}
            defaultFilters={PAGES_FILTERS_CONFIG.ACCOUNTING.SETTLEMENTS.defaultFilters}
            tableName="settlements"
            pageType="SETTLEMENTS"
            view={view}
            rows={rows}
            columns={columns}
            rows_total={rows_total}
            order={order}
            orderBy={orderBy}
            updateFilters={updateFilters}
            isLoading={isLoading}
            page={0}
            onUpdateWidth={updateWidth}
            per_page={100000}
            pagination={false}
            executeAction={executeAction}
            totals={totals as TableTypes.Totals}
            customRowHeight={60}
            tableActionsConfig={{
                customActions,
                totalSelected: totalSelectedSettlements.length
            }}
            tableHeaderActionsConfig={{
                tableName,
                idsList: settlementIdsList
            }}
            setMultiSelect
        />
    );
}
