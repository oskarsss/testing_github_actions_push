import { Stack } from '@mui/material';
import { IChipColors, StatusChipStyled } from '@/@core/theme/chip';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import PeriodsSelectIconComponentAction from './PeriodsSelectIconComponentAction';
import PeriodStatus = SettlementsTypes.Cycles.PeriodStatus;

const PeriodStatusColorEnum: Record<PeriodStatus, IChipColors> = {
    [PeriodStatus.OPEN]  : 'success',
    [PeriodStatus.CLOSED]: 'error'
};

const StatusTitleEnum = {
    [PeriodStatus.OPEN]  : 'Open',
    [PeriodStatus.CLOSED]: 'Closed'
};

type Props = {
    isLoading: boolean;
    isCyclesLoading: boolean;
    open: boolean;
    setOpen: (value: boolean) => void;
    periods: SettlementsTypes.Cycles.Periods.Period[];
    selectedCycle?: SettlementsTypes.Cycles.Cycle;
    selectedPeriod: SettlementsTypes.Cycles.Periods.Period | null;
    onClick: (period_id: string, start_datetime: string, end_datetime: string) => void;
};

export default function PeriodsSelectIconComponent({
    isLoading,
    isCyclesLoading,
    open,
    setOpen,
    periods,
    selectedCycle,
    selectedPeriod,
    onClick
}: Props) {
    const toggleOpen = () => setOpen(!open);

    return (
        <Stack
            direction="row"
            alignItems="center"
        >
            {!isLoading && !isCyclesLoading && (
                <>
                    {periods.length > 0 && (
                        <StatusChipStyled
                            color={
                                selectedPeriod?.status === Settlements_Cycle_Period_Status.OPEN
                                    ? PeriodStatusColorEnum[PeriodStatus.OPEN]
                                    : PeriodStatusColorEnum[PeriodStatus.CLOSED]
                            }
                        >
                            {selectedPeriod?.status === Settlements_Cycle_Period_Status.OPEN
                                ? StatusTitleEnum[PeriodStatus.OPEN]
                                : StatusTitleEnum[PeriodStatus.CLOSED]}
                        </StatusChipStyled>
                    )}

                    <PeriodsSelectIconComponentAction
                        selectedCycle={selectedCycle}
                        selectedPeriod={selectedPeriod}
                        periods={periods}
                        onClick={onClick}
                    />
                </>
            )}

            <ArrowDropDownSharpIcon
                cursor="pointer"
                onClick={toggleOpen}
                sx={{
                    transform : open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                }}
            />
        </Stack>
    );
}
