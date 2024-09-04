import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import PayoutsGrpcService from '@/@grpcServices/services/payouts.service';
import { PayoutModel_Status, PayoutModel_Type } from '@proto/models/model_payout';
import React from 'react';
import { PayoutType, PayoutTypes } from '@/models/payouts/payout-type';
import { PAYOUT_TYPE_COLORS, PAYOUT_TYPE_ICONS } from '@/@core/theme/entities/payout/type';
import {
    checkPayoutStatusToDisableFields,
    checkPayoutTypeForRequiredBankField
} from '@/views/accounting/payouts/dialogs/helpers';
import { useEditPayoutDialog } from '@/views/accounting/payouts/dialogs/EditPayoutDialog';
import { PAYOUT_TYPE_GRPC_ENUM, PAYOUT_TYPE_TO_GRPC_ENUM } from '@/models/payouts/payout-mappings';

type Props = {
    payoutId: string;
    amount: number;
    referenceId: string;
    bankAccountId: string;
    type: PayoutModel_Type;
    status: PayoutModel_Status;
} & ChipSelectTypes.OtherProps;

export default function PayoutPaymentTypeChipSelect({
    payoutId,
    amount,
    referenceId,
    bankAccountId,
    status,
    type,
    is_changing,
    ...props
}: Props) {
    const editPayoutDialog = useEditPayoutDialog();
    const [updatePayoutType] = PayoutsGrpcService.useUpdatePayoutTypeMutation();

    const onSelectStatus: ChipSelectTypes.OnChange<PayoutType> = (selectedType) => {
        if (selectedType === PAYOUT_TYPE_GRPC_ENUM[type]) return;
        const paymentType = PAYOUT_TYPE_TO_GRPC_ENUM[selectedType];
        if (checkPayoutTypeForRequiredBankField(paymentType)) {
            editPayoutDialog.open({
                payoutId,
                amount,
                referenceId,
                bankAccountId,
                type: paymentType,
                status
            });
            return;
        }

        updatePayoutType({
            payoutId,
            type: PAYOUT_TYPE_TO_GRPC_ENUM[selectedType]
        });
    };

    return (
        <ChipSelect<PayoutType>
            status={PAYOUT_TYPE_GRPC_ENUM[type]}
            options={Object.values(PayoutTypes)}
            custom_colors={PAYOUT_TYPE_COLORS}
            custom_icons={PAYOUT_TYPE_ICONS}
            onChange={onSelectStatus}
            status_prefix="state_info:payouts.type"
            is_changing={!checkPayoutStatusToDisableFields(status) && is_changing}
            {...props}
        />
    );
}
