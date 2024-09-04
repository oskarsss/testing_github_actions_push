import { TrailerModel_Ownership, TrailerModel_Status } from '@proto/models/model_trailer';
import { TrailerStatus, TrailerStatuses } from '@/models/fleet/trailers/trailer-status';
import { TrailerOwnershipTypes } from './trailer-type';

export const TRAILER_STATUS_TO_GRPC_ENUM: Record<TrailerStatus, TrailerModel_Status> =
    Object.freeze({
        deleted: TrailerModel_Status.DELETED,
        active : TrailerModel_Status.ACTIVE,
        offline: TrailerModel_Status.OFFLINE
    });

export const TRAILER_STATUS_GRPC: Record<TrailerModel_Status, TrailerStatus> = {
    [TrailerModel_Status.ACTIVE]     : TrailerStatuses.ACTIVE,
    [TrailerModel_Status.OFFLINE]    : TrailerStatuses.OFFLINE,
    [TrailerModel_Status.DELETED]    : TrailerStatuses.DELETED,
    [TrailerModel_Status.UNSPECIFIED]: TrailerStatuses.DELETED
};

export const TRAILER_OWNERSHIP_TYPE_GRPC_REVERSE = {
    [TrailerOwnershipTypes.OWNED]         : TrailerModel_Ownership.OWNED,
    [TrailerOwnershipTypes.LEASED]        : TrailerModel_Ownership.LEASED,
    [TrailerOwnershipTypes.OWNER_OPERATOR]: TrailerModel_Ownership.OWNER_OPERATOR
} as const;

export const TRAILER_OWNERSHIP_TYPE_GRPC = {
    [TrailerModel_Ownership.OWNED]         : TrailerOwnershipTypes.OWNED,
    [TrailerModel_Ownership.LEASED]        : TrailerOwnershipTypes.LEASED,
    [TrailerModel_Ownership.OWNER_OPERATOR]: TrailerOwnershipTypes.OWNER_OPERATOR,
    [TrailerModel_Ownership.UNSPECIFIED]   : TrailerOwnershipTypes.OWNER_OPERATOR
} as const;
