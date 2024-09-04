import { SelectServiceLogsAction } from '@/store/maitenance/service-logs/slice';
import { useServiceLogs } from '@/store/maitenance/service-logs/hooks';
import { useAppDispatch } from '@/store/hooks';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { Stack } from '@mui/material';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import type { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { ServiceLogModel_ServiceLogRead } from '@proto/models/model_service_log';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import TabTablePagination from '@/@core/ui-kits/profiles/components/tabs/reusable/TabTablePagination';
import { useEditServiceLogDialog } from '@/views/maintenance/service-logs/modals/edit-service-log';
import columns from './columns';

export default function Table() {
    const dispatch = useAppDispatch();
    const confirmDialog = useConfirm();
    const {
        serviceLogs,
        isLoading,
        selected_filters,
        filter_id,
        total
    } = useServiceLogs();
    const [deleteServiceLog] = ServiceLogsGrpcService.useDeleteServiceLogMutation();
    const editServiceLogDialog = useEditServiceLogDialog();

    const handleDelete = (serviceLogId: string) => {
        confirmDialog({
            icon        : <DangerousIcon color="secondary" />,
            title       : 'maintenance:service_logs.modals.delete.title',
            body        : 'maintenance:service_logs.modals.delete.description',
            confirm_text: 'common:button.delete',
            onConfirm   : () => deleteServiceLog({ serviceLogId }).unwrap()
        });
    };

    const executeAction: MiniTableExecuteActionType<ServiceLogModel_ServiceLogRead> = (
        name,
        props
    ) => {
        switch (name) {
        case 'edit':
            editServiceLogDialog.open({ serviceLogId: props.row.serviceLogId });
            break;
        case 'delete':
            handleDelete(props.row.serviceLogId);
            break;
        case 'open_panel':
            dispatch(SelectServiceLogsAction.selectServiceLogId(props.row.serviceLogId));
            break;
        default:
            break;
        }
    };

    const openCreateDialog = () => {};

    if (isLoading) {
        return <Preloader sx={{ width: '100%' }} />;
    }

    if (!serviceLogs.length) {
        return (
            <ErrorScreen
                configType={ErrorScreenType.SERVICE_LOGS}
                onClick={openCreateDialog}
            />
        );
    }

    return (
        <Stack
            height="100%"
            padding="20px"
            width="100%"
            overflow="hidden"
        >
            <MiniTable
                turnOffBorder
                stickyHeader
                rows={serviceLogs}
                elementKey="serviceLogId"
                columns={columns}
                executeAction={executeAction}
            />

            <TabTablePagination
                filter_id={filter_id}
                rows_total={total}
                page={selected_filters.page}
                per_page={selected_filters.per_page}
            />
        </Stack>
    );
}
