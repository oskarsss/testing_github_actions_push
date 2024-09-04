import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import PayoutsGrpcService from '@/@grpcServices/services/payouts.service';
import { PayoutModel_Status } from '@proto/models/model_payout';
import { PayoutStatus, PayoutStatuses } from '@/models/payouts/payout-status';
import { PAYOUT_STATUS_COLORS } from '@/@core/theme/entities/payout/status';
import React from 'react';
import { createCustomDotIcons } from '@/@core/fields/chip-select/components/utils';
import {
    PAYOUT_STATUS_GRPC_ENUM,
    PAYOUT_STATUS_TO_GRPC_ENUM
} from '@/models/payouts/payout-mappings';

type Props = {
    payoutId: string;
    payoutStatus: PayoutModel_Status;
} & ChipSelectTypes.OtherProps;

export default function PayoutStatusChipSelect({
    payoutId,
    payoutStatus,
    ...props
}: Props) {
    const [updatePayoutStatus] = PayoutsGrpcService.useUpdatePayoutStatusMutation();

    const onSelectStatus: ChipSelectTypes.OnChange<PayoutStatus> = (status) => {
        if (status === PAYOUT_STATUS_GRPC_ENUM[payoutStatus]) return;

        updatePayoutStatus({
            payoutId,
            status: PAYOUT_STATUS_TO_GRPC_ENUM[status]
        });
    };

    return (
        <ChipSelect<PayoutStatus>
            status={PAYOUT_STATUS_GRPC_ENUM[payoutStatus]}
            options={Object.values(PayoutStatuses)}
            custom_colors={PAYOUT_STATUS_COLORS}
            custom_icons={createCustomDotIcons(Object.values(PayoutStatuses))}
            onChange={onSelectStatus}
            status_prefix="state_info:payouts.status"
            {...props}
        />
    );
}
