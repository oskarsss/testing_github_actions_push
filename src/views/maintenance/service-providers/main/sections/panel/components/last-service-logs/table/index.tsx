import { memo, useMemo } from 'react';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { Stack } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import { ServiceLogGetRequest_SortType } from '@proto/service_log';
import { useStableArray } from '@/hooks/useStable';
import type { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { ServiceLogModel_ServiceLogRead } from '@proto/models/model_service_log';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import columns from './columns';

function Table() {
    const selectedServiceProviderId = useAppSelector(
        (state) => state.serviceProviders.selectedServiceProviderId
    );

    const {
        data,
        isLoading
    } = ServiceLogsGrpcService.useGetServiceLogsQuery(
        {
            page       : 0,
            perPage    : 50,
            sortType   : ServiceLogGetRequest_SortType.LATEST,
            search     : '',
            startDate  : '',
            endDate    : '',
            providerIds: [selectedServiceProviderId],
            truckIds   : [],
            trailerIds : [],
            driverIds  : [],
            types      : []
        },
        {
            skip: !selectedServiceProviderId
        }
    );

    const serviceLogs = useStableArray(data?.logs);

    const filteredServiceLogs = useMemo(
        () => serviceLogs.filter((log) => !log.deleted),
        [serviceLogs]
    );

    const executeAction: MiniTableExecuteActionType<ServiceLogModel_ServiceLogRead> = (
        name,
        props
    ) => {
        switch (name) {
        case 'edit':
            break;
        default:
            break;
        }
    };

    if (isLoading) return null;

    const openCreateDialog = () => {};

    return (
        <Stack
            height="100%"
            padding="16px"
            width="100%"
            overflow="hidden"
            bgcolor="semantic.foreground.white.tertiary"
            borderRadius="8px"
        >
            {serviceLogs.length ? (
                <MiniTable
                    turnOffBorder
                    stickyHeader
                    rows={filteredServiceLogs}
                    elementKey="serviceLogId"
                    columns={columns}
                    executeAction={executeAction}
                />
            ) : (
                <ErrorScreen
                    configType={ErrorScreenType.SERVICE_LOGS}
                    onClick={openCreateDialog}
                />
            )}
        </Stack>
    );
}

export default memo(Table);
