import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';

export const PeriodStatuses = Object.freeze({
    OPEN  : 'open',
    CLOSED: 'closed'
});

export type PeriodStatus = (typeof PeriodStatuses)[keyof typeof PeriodStatuses];

export const PERIOD_STATUS_ENUM: Record<Settlements_Cycle_Period_Status, PeriodStatus> = {
    [Settlements_Cycle_Period_Status.OPEN]       : PeriodStatuses.OPEN,
    [Settlements_Cycle_Period_Status.UNSPECIFIED]: PeriodStatuses.CLOSED,
    [Settlements_Cycle_Period_Status.CLOSED]     : PeriodStatuses.CLOSED
};

export const PERIOD_STATUS_TO_GRPC_ENUM: Record<PeriodStatus, Settlements_Cycle_Period_Status> = {
    [PeriodStatuses.OPEN]  : Settlements_Cycle_Period_Status.OPEN,
    [PeriodStatuses.CLOSED]: Settlements_Cycle_Period_Status.CLOSED
};
