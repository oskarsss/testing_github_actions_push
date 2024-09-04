import { Box, Theme } from '@mui/material';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';

type Option = {
    labelKey: IntlMessageKey;
    foregroundType: keyof Theme['palette']['utility']['foreground'];
};

const periodStatusConfig: Record<Settlements_Cycle_Period_Status, Option> = Object.freeze({
    [Settlements_Cycle_Period_Status.CLOSED]: {
        labelKey      : 'state_info:settlements.status.closed',
        foregroundType: 'error'
    },
    [Settlements_Cycle_Period_Status.OPEN]: {
        labelKey      : 'state_info:settlements.status.open',
        foregroundType: 'success'
    },
    [Settlements_Cycle_Period_Status.UNSPECIFIED]: {
        labelKey      : 'state_info:settlements.status.closed',
        foregroundType: 'warning'
    }
});

// [
//     { labelKey: 'settlement.status.open', foregroundType: 'success' },
//     { labelKey: 'settlement.status.closed', foregroundType: 'error' }
// ];

type Props = {
    cycleId: string;
    periodId: string;
};

export default function PeriodStatus({
    cycleId,
    periodId
}: Props) {
    const { data } = SettlementCyclePeriodsGrpcService.useGetPeriodsQuery({ cycleId });
    const period = data?.periods.find((period) => period.periodId === periodId);

    const {
        labelKey,
        foregroundType
    } =
        periodStatusConfig[period?.status || Settlements_Cycle_Period_Status.UNSPECIFIED];

    const { t } = useAppTranslation();

    return (
        <Box
            sx={{
                padding        : '4px 6px',
                borderRadius   : '4px',
                textAlign      : 'center',
                width          : 'fit-content',
                backgroundColor: (theme) =>
                    theme.palette.utility.foreground[foregroundType].secondary,
                color: (theme) => theme.palette.utility.foreground[foregroundType].primary
            }}
        >
            {t(labelKey)}
        </Box>
    );
}
