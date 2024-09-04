import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import type ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';
import {
    PERIOD_STATUS_ENUM,
    PERIOD_STATUS_TO_GRPC_ENUM,
    type PeriodStatus,
    PeriodStatuses
} from '@/models/settlements/settlement-period-status';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import type { IChipColors } from '@/@core/theme/chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ReactNode } from 'react';

type Props = {
    cycleId: string;
    periodId: string;
    periodStatus: Settlements_Cycle_Period_Status;
};

export default function PeriodStatusChipSelect({
    cycleId,
    periodId,
    periodStatus
}: Props) {
    const [updateStatus] = SettlementCyclePeriodsGrpcService.useUpdatePeriodStatusMutation();

    const onSelectStatus: ChipSelectTypes.OnChange<PeriodStatus> = (status) => {
        if (status === PERIOD_STATUS_ENUM[periodStatus]) return;

        updateStatus({
            cycleId,
            periodId,
            status: PERIOD_STATUS_TO_GRPC_ENUM[status]
        });
    };

    const options = Object.values(PeriodStatuses);

    const periodStatusColors: Record<PeriodStatus, IChipColors> = {
        [PeriodStatuses.OPEN]  : 'success',
        [PeriodStatuses.CLOSED]: 'blue_dark'
    };

    const periodStatusIcons: Record<PeriodStatus, ReactNode> = {
        [PeriodStatuses.OPEN]  : <CheckCircleIcon fontSize="small" />,
        [PeriodStatuses.CLOSED]: <CheckCircleIcon fontSize="small" />
    };

    return (
        <ChipSelect
            status={PERIOD_STATUS_ENUM[periodStatus]}
            options={options}
            onChange={onSelectStatus}
            status_prefix="state_info:settlements.period.status"
            custom_icons={periodStatusIcons}
            custom_colors={periodStatusColors}
            styles={{ borderRadius: '18px' }}
        />
    );
}
