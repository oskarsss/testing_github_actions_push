import { type MouseEvent, useCallback, useMemo } from 'react';
import type SettlementsTypes from '@/store/accounting/settlements/types';
import { useUpdateDispatchersRequestData } from '@/store/accounting/dispatchers/hooks';
import { Typography } from '@mui/material';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import CyclesSelectItemActions from './CyclesSelectItemActions';
import CyclesSelectStyled from '../styled';

type Props = {
    cycle: SettlementsTypes.Cycles.Cycle;
    onViewDrivers: () => void;
    onViewCycle: () => void;
    onEdit: (cycle_id?: string) => void;
    onClose: () => void;
};

export default function CyclesSelectItem({
    cycle,
    onViewDrivers,
    onViewCycle,
    onEdit,
    onClose
}: Props) {
    const { data } = SettlementCyclePeriodsGrpcService.useGetPeriodsQuery(
        { cycleId: cycle.cycleId },
        { skip: !cycle.cycleId }
    );
    const updateRequestData = useUpdateDispatchersRequestData();

    const periodId = useMemo(() => {
        const firstClosedPeriod = data?.periods.find(
            (period) => period.status === Settlements_Cycle_Period_Status.CLOSED
        );

        return firstClosedPeriod?.periodId || data?.periods[0]?.periodId;
    }, [data?.periods]);

    const selectCycle = useCallback(() => {
        updateRequestData({ cycle_id: cycle.cycleId, period_id: periodId });
        onClose();
    }, [cycle.cycleId, onClose, periodId, updateRequestData]);

    const editCycle = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onEdit(cycle.cycleId);
    };

    return (
        <CyclesSelectStyled.Item
            value={cycle.cycleId}
            onClick={selectCycle}
        >
            <Typography
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {cycle.name}
            </Typography>

            <CyclesSelectItemActions
                onViewDrivers={onViewDrivers}
                onViewCycle={onViewCycle}
                onEditCycle={editCycle}
            />
        </CyclesSelectStyled.Item>
    );
}
