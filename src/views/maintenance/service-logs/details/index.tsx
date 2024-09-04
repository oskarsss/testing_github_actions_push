import FullDialog from '@/@core/ui-kits/full-dialog';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import { memo } from 'react';
import Form from './form';

type Props = {
    serviceLogId: string;
    onClose?: () => void;
};

function ServiceLogDetails({
    serviceLogId,
    onClose
}: Props) {
    const {
        data,
        isError,
        isLoading
    } = ServiceLogsGrpcService.useRetrieveServiceLogQuery(
        { serviceLogId },
        {
            skip           : !serviceLogId,
            refetchOnFocus : true,
            pollingInterval: 15000
        }
    );

    if (isLoading) return <FullDialog.FetchingProcess />;

    if (isError || !data?.log) {
        return null;
    }

    return (
        <Form
            serviceLog={data.log}
            onClose={onClose}
        />
    );
}

export default memo(ServiceLogDetails);
