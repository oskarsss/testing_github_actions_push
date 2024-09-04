import { TruckModel_Status, TruckModel_Type } from '@proto/models/model_truck';
import { TruckStatus, TruckStatuses } from '@/models/fleet/trucks/truck-status';
import { TruckTypes } from './truck-type';

export const TRUCK_STATUS_TO_GRPC_ENUM: Record<TruckStatus, TruckModel_Status> = Object.freeze({
    [TruckStatuses.ONBOARDING]        : TruckModel_Status.onboarding,
    [TruckStatuses.COMPLIANCE_REVIEW] : TruckModel_Status.compliance_review,
    [TruckStatuses.ACTIVE]            : TruckModel_Status.active,
    [TruckStatuses.INACTIVE]          : TruckModel_Status.inactive,
    [TruckStatuses.PENDING_TERMINATED]: TruckModel_Status.pending_termination,
    [TruckStatuses.TERMINATED]        : TruckModel_Status.terminated,
    [TruckStatuses.DELETED]           : TruckModel_Status.deleted
});

export const TRUCK_STATUS_TO_LOCALE: Record<TruckModel_Status, TruckStatus> = Object.freeze({
    [TruckModel_Status.onboarding]         : TruckStatuses.ONBOARDING,
    [TruckModel_Status.compliance_review]  : TruckStatuses.COMPLIANCE_REVIEW,
    [TruckModel_Status.active]             : TruckStatuses.ACTIVE,
    [TruckModel_Status.inactive]           : TruckStatuses.INACTIVE,
    [TruckModel_Status.pending_termination]: TruckStatuses.PENDING_TERMINATED,
    [TruckModel_Status.terminated]         : TruckStatuses.TERMINATED,
    [TruckModel_Status.deleted]            : TruckStatuses.DELETED,
    [TruckModel_Status.unspecified]        : TruckStatuses.DELETED
});

export const TRUCK_TYPE_TO_GRPC_ENUM = {
    [TruckTypes.OWNED]         : TruckModel_Type.OWNED,
    [TruckTypes.LEASED]        : TruckModel_Type.LEASED,
    [TruckTypes.OWNER_OPERATOR]: TruckModel_Type.OWNER_OPERATOR
} as const;

export const TRUCK_TYPE_TO_GRPC_REVERSE_ENUM = {
    [TruckModel_Type.LEASED]        : TruckTypes.LEASED,
    [TruckModel_Type.OWNED]         : TruckTypes.OWNED,
    [TruckModel_Type.OWNER_OPERATOR]: TruckTypes.OWNER_OPERATOR,
    [TruckModel_Type.UNSPECIFIED]   : TruckTypes.OWNER_OPERATOR
} as const;
