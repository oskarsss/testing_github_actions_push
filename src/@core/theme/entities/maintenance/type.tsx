import { COLORS, IChipColors } from '@/@core/theme/chip';
import { ServiceLogModel_ServiceLogType } from '@proto/models/model_service_log';

export const MAINTENANCE_TYPE_COLORS: Record<ServiceLogModel_ServiceLogType, IChipColors> = {
    [ServiceLogModel_ServiceLogType.PLANNED]    : COLORS.success,
    [ServiceLogModel_ServiceLogType.UNPLANNED]  : COLORS.warning,
    [ServiceLogModel_ServiceLogType.EMERGENCY]  : COLORS.error,
    [ServiceLogModel_ServiceLogType.UNSPECIFIED]: COLORS.error
};
