import { PayoutModel_Status, PayoutModel_Type } from '@proto/models/model_payout';
import { PayoutStatus, PayoutStatuses } from '@/models/payouts/payout-status';
import { PayoutType, PayoutTypes } from '@/models/payouts/payout-type';

export const PAYOUT_STATUS_GRPC_ENUM: Record<PayoutModel_Status, PayoutStatus> = Object.freeze({
    [PayoutModel_Status.UNSPECIFIED]: PayoutStatuses.pending,
    [PayoutModel_Status.PENDING]    : PayoutStatuses.pending,
    [PayoutModel_Status.SUCCEEDED]  : PayoutStatuses.succeeded,
    [PayoutModel_Status.CANCELED]   : PayoutStatuses.canceled,
    [PayoutModel_Status.FAILED]     : PayoutStatuses.failed
});

export const PAYOUT_STATUS_TO_GRPC_ENUM: Record<PayoutStatus, PayoutModel_Status> = Object.freeze({
    [PayoutStatuses.pending]  : PayoutModel_Status.PENDING,
    [PayoutStatuses.succeeded]: PayoutModel_Status.SUCCEEDED,
    [PayoutStatuses.canceled] : PayoutModel_Status.CANCELED,
    [PayoutStatuses.failed]   : PayoutModel_Status.FAILED
});

export const PAYOUT_TYPE_GRPC_ENUM: Record<PayoutModel_Type, PayoutType> = Object.freeze({
    [PayoutModel_Type.UNSPECIFIED]: PayoutTypes.ach,
    [PayoutModel_Type.ACH]        : PayoutTypes.ach,
    [PayoutModel_Type.WIRE]       : PayoutTypes.wire,
    [PayoutModel_Type.CHECK]      : PayoutTypes.check,
    [PayoutModel_Type.CASH]       : PayoutTypes.cash,
    [PayoutModel_Type.ZELLE]      : PayoutTypes.zelle,
    [PayoutModel_Type.VENMO]      : PayoutTypes.venmo,
    [PayoutModel_Type.CASH_APP]   : PayoutTypes.cashApp,
    [PayoutModel_Type.CRYPTO]     : PayoutTypes.crypto
});

export const PAYOUT_TYPE_TO_GRPC_ENUM: Record<PayoutType, PayoutModel_Type> = Object.freeze({
    [PayoutTypes.ach]    : PayoutModel_Type.ACH,
    [PayoutTypes.wire]   : PayoutModel_Type.WIRE,
    [PayoutTypes.check]  : PayoutModel_Type.CHECK,
    [PayoutTypes.cash]   : PayoutModel_Type.CASH,
    [PayoutTypes.zelle]  : PayoutModel_Type.ZELLE,
    [PayoutTypes.venmo]  : PayoutModel_Type.VENMO,
    [PayoutTypes.cashApp]: PayoutModel_Type.CASH_APP,
    [PayoutTypes.crypto] : PayoutModel_Type.CRYPTO
});
