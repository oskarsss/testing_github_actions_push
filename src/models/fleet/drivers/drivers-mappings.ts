import { DriverStatus, DriverStatuses } from '@/models/fleet/drivers/driver-status';
import { DriverModel_Status } from '@proto/models/model_driver';

export const DRIVER_STATUS_GRPC_ENUM: Record<DriverModel_Status, DriverStatus> = Object.freeze({
    [DriverModel_Status.ACTIVE]             : DriverStatuses.ACTIVE,
    [DriverModel_Status.COMPLIANCE_REVIEW]  : DriverStatuses.COMPLIANCE_REVIEW,
    [DriverModel_Status.DELETED]            : DriverStatuses.DELETED,
    [DriverModel_Status.ONBOARDING]         : DriverStatuses.ONBOARDING,
    [DriverModel_Status.PENDING_TERMINATION]: DriverStatuses.PENDING_TERMINATED,
    [DriverModel_Status.TERMINATED]         : DriverStatuses.TERMINATED,
    [DriverModel_Status.UNSPECIFIED]        : DriverStatuses.TERMINATED
});

export const DRIVER_STATUS_TO_GRPC_ENUM: Record<DriverStatus, DriverModel_Status> = Object.freeze({
    [DriverStatuses.ACTIVE]            : DriverModel_Status.ACTIVE,
    [DriverStatuses.COMPLIANCE_REVIEW] : DriverModel_Status.COMPLIANCE_REVIEW,
    [DriverStatuses.DELETED]           : DriverModel_Status.DELETED,
    [DriverStatuses.ONBOARDING]        : DriverModel_Status.ONBOARDING,
    [DriverStatuses.PENDING_TERMINATED]: DriverModel_Status.PENDING_TERMINATION,
    [DriverStatuses.TERMINATED]        : DriverModel_Status.TERMINATED
});
