import { Stack, Typography } from '@mui/material';
import moment from 'moment-timezone';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';

type Props = {
    period: SettlementsTypes.Cycles.Periods.Period;
};

export default function PeriodsSelectItemContent({ period }: Props) {
    const { t } = useAppTranslation('fields');

    return (
        <Stack
            direction="row"
            flexDirection="column"
        >
            <Typography
                variant="body1"
                fontSize="14px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {moment(period.startDatetime).format('MM/DD ddd hh:mm A')} -{' '}
                {moment(period.endDatetime).format('MM/DD ddd hh:mm A')}
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <Typography
                    fontSize="12px"
                    variant="body2"
                    fontWeight={600}
                    sx={{
                        color:
                            period.status === Settlements_Cycle_Period_Status.OPEN
                                ? '#12B76A'
                                : 'error.main',
                        borderRight: (theme) =>
                            `1px solid ${theme.palette.semantic.border.secondary}`,
                        paddingRight: '5px'
                    }}
                >
                    {period.status === Settlements_Cycle_Period_Status.OPEN
                        ? t('periods.status.open')
                        : t('periods.status.closed')}
                </Typography>
                <Typography
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                >
                    {t('periods.settlement_count', { count: period.settlementsCount })}
                </Typography>
                <Typography
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                >
                    {t('periods.company_net', { companyNet: period.companyNetFormatted })}
                </Typography>
            </Stack>
        </Stack>
    );
}
