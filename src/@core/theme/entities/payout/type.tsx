import { PayoutType, PayoutTypes } from '@/models/payouts/payout-type';
import PayoutTypeIcons from '@/@core/theme/entities/payout/payout-type-icons';
import { ReactNode } from 'react';
import { PayoutModel_Type } from '@proto/models/model_payout';
import { ForegroundUtilityType } from '@/@core/theme/palette';

export const PAYOUT_TYPE_ICONS: Record<PayoutType, ReactNode> = {
    [PayoutTypes.ach]    : <PayoutTypeIcons.Ach />,
    [PayoutTypes.wire]   : <PayoutTypeIcons.Wire />,
    [PayoutTypes.check]  : <PayoutTypeIcons.Check />,
    [PayoutTypes.cash]   : <PayoutTypeIcons.Cash />,
    [PayoutTypes.zelle]  : <PayoutTypeIcons.Zelle />,
    [PayoutTypes.venmo]  : <PayoutTypeIcons.Venmo />,
    [PayoutTypes.cashApp]: <PayoutTypeIcons.CashApp />,
    [PayoutTypes.crypto] : <PayoutTypeIcons.Crypto />
};

export const PAYOUT_TYPE_COLORS: Record<PayoutType, ForegroundUtilityType> = {
    [PayoutTypes.ach]    : 'yellow',
    [PayoutTypes.wire]   : 'gray',
    [PayoutTypes.check]  : 'pink',
    [PayoutTypes.cash]   : 'warning',
    [PayoutTypes.zelle]  : 'violet',
    [PayoutTypes.venmo]  : 'blue_dark',
    [PayoutTypes.cashApp]: 'success',
    [PayoutTypes.crypto] : 'indigo'
};

export const PAYOUT_TYPE_GRPC_MODEL_COLORS: Record<PayoutModel_Type, ForegroundUtilityType> = {
    [PayoutModel_Type.UNSPECIFIED]: 'yellow',
    [PayoutModel_Type.ACH]        : 'yellow',
    [PayoutModel_Type.WIRE]       : 'gray',
    [PayoutModel_Type.CHECK]      : 'pink',
    [PayoutModel_Type.CASH]       : 'warning',
    [PayoutModel_Type.ZELLE]      : 'violet',
    [PayoutModel_Type.VENMO]      : 'blue_dark',
    [PayoutModel_Type.CASH_APP]   : 'success',
    [PayoutModel_Type.CRYPTO]     : 'indigo'
};
