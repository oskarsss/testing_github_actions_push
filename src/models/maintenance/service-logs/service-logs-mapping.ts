import {
    type ServiceLogsType,
    serviceLogsTypes
} from '@/models/maintenance/service-logs/service-logs-type';
import { ServiceLogModel_ServiceLogType } from '@proto/models/model_service_log';
import { ServiceLogItemModel_WarrantyCoverage } from '@proto/models/model_service_log_item';
import {
    serviceLogsWarrantyType,
    ServiceLogsWarrantyTypes
} from '@/models/maintenance/service-logs/service-logs-warranty-types';

export const SERVICE_LOGS_TYPE_TO_GRPC_REVERSE_ENUM: Record<
    ServiceLogModel_ServiceLogType,
    ServiceLogsType
> = {
    [ServiceLogModel_ServiceLogType.PLANNED]    : serviceLogsTypes.PLANNED,
    [ServiceLogModel_ServiceLogType.UNPLANNED]  : serviceLogsTypes.UNPLANNED,
    [ServiceLogModel_ServiceLogType.EMERGENCY]  : serviceLogsTypes.EMERGENCY,
    [ServiceLogModel_ServiceLogType.UNSPECIFIED]: serviceLogsTypes.EMERGENCY
};

export const SERVICE_LOGS_WARRANTY_TYPE_TO_GRPC_REVERSE_ENUM: Record<
    ServiceLogItemModel_WarrantyCoverage,
    ServiceLogsWarrantyTypes
> = {
    [ServiceLogItemModel_WarrantyCoverage.UNSPECIFIED]: serviceLogsWarrantyType.NOT_COVERED,
    [ServiceLogItemModel_WarrantyCoverage.COVERED]    : serviceLogsWarrantyType.COVERED,
    [ServiceLogItemModel_WarrantyCoverage.UNCOVERED]  : serviceLogsWarrantyType.NOT_COVERED
};
