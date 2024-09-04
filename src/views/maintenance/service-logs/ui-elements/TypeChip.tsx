import { memo } from 'react';
import { MAINTENANCE_TYPE_COLORS } from '@/@core/theme/entities/maintenance/type';
import { SERVICE_LOGS_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/maintenance/service-logs/service-logs-mapping';
import { StatusChipWithDot } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ServiceLogModel_ServiceLogType } from '@proto/models/model_service_log';

type Props = {
    type: ServiceLogModel_ServiceLogType;
};

function TypeChip({ type }: Props) {
    const { t } = useAppTranslation();
    return (
        <StatusChipWithDot
            color={MAINTENANCE_TYPE_COLORS[type] || 'yellow'}
            status={t(
                `state_info:maintenance.type.${SERVICE_LOGS_TYPE_TO_GRPC_REVERSE_ENUM[type]}`
            )}
        />
    );
}

export default memo(TypeChip);
