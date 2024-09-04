import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import { Settlements_RecurringTransaction_Status } from '@proto/models/model_settlement';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import {
    RECURRING_TRANSACTION_STATUS_ENUM_COLORS,
    RECURRING_TRANSACTION_STATUS_ENUM_ICONS
} from '@/@core/theme/entities/settlement/recurring_transactions_status';

type Props = {
    recurringTransactionId: string;
    recurringTransactionStatus: Settlements_RecurringTransaction_Status;
    onSuccessfulUpdate?: () => void;
} & ChipSelectTypes.OtherProps;

export default function SettlementRecurringTransactionStatusChipSelect({
    recurringTransactionId,
    recurringTransactionStatus,
    onSuccessfulUpdate,
    ...other_props
}: Props) {
    const [updateStatus] =
        SettlementRecurringTransactionGrpcService.useUpdateStatusRecurringTransactionMutation();

    const onChangeStatus = async (status: Settlements_RecurringTransaction_Status) => {
        if (status === recurringTransactionStatus) return;

        try {
            await updateStatus({
                status,
                recurringTransactionId
            }).unwrap();

            onSuccessfulUpdate?.();
        } catch (error) {
            console.error(error);
        }
    };

    const Options = [
        Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_ACTIVE,
        Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_PAUSED,
        Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_CANCELED,
        Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_COMPLETED,
        Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_DELETED
    ];

    return (
        <ChipSelect<Settlements_RecurringTransaction_Status>
            status={recurringTransactionStatus}
            options={Options}
            status_prefix="state_info:recurring_transactions.status_grpc_enum"
            onChange={onChangeStatus}
            custom_icons={RECURRING_TRANSACTION_STATUS_ENUM_ICONS}
            custom_colors={RECURRING_TRANSACTION_STATUS_ENUM_COLORS}
            {...other_props}
        />
    );
}
