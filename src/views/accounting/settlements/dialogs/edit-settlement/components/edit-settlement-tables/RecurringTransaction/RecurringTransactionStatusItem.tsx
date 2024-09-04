import StatusBadge from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/status-badge/StatusBadge';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { recurring_transaction_status_icon } from '@/@core/theme/entities/settlement/recurring_transactions_status';

import { RECURRING_TRANSACTIONS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';

type Props = {
    status: SettlementsTypes.CycleSettlementDetails.RecurringTransaction['status'];
};

export default function RecurringTransactionStatusItem({ status }: Props) {
    return (
        <StatusBadge
            status={RECURRING_TRANSACTIONS_GRPC_ENUM[status]}
            icons={recurring_transaction_status_icon}
            text={`state_info:recurring_transactions.status.${RECURRING_TRANSACTIONS_GRPC_ENUM[status]}`}
        />
    );
}
