import { PayoutStatus } from '@/models/payouts/payout-status';
import { PayoutModel_Status } from '@proto/models/model_payout';
import { ForegroundUtilityType } from '@/@core/theme/palette';

export const PAYOUT_STATUS_COLORS: Record<PayoutStatus, ForegroundUtilityType> = {
    pending  : 'warning',
    succeeded: 'success',
    canceled : 'gray',
    failed   : 'error'
};

export const PAYOUT_STATUS_GRPC_MODEL_COLORS: Record<PayoutModel_Status, ForegroundUtilityType> = {
    [PayoutModel_Status.UNSPECIFIED]: 'warning',
    [PayoutModel_Status.PENDING]    : 'warning',
    [PayoutModel_Status.SUCCEEDED]  : 'success',
    [PayoutModel_Status.CANCELED]   : 'gray',
    [PayoutModel_Status.FAILED]     : 'error'
};
