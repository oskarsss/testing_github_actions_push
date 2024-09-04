import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { timeFormatter } from '@/views/settings/utils';
import { StyledBox } from '@/views/settings/tabs/Settlements/styled';
import {
    SecondSubtitle,
    SecondTitle,
    StyledPaper,
    TotalPaper,
    TotalSubtitle
} from '@/views/settings/components/styled';
import ConnectedItem from '@/views/settings/tabs/Integrations/Details/components/Content/components/ConnectedItem/ConnectedItem';
import VectorIcons from '@/@core/icons/vector_icons';
import SettlementsTypes from '@/store/accounting/settlements/types';
import navigateToPage from '@/utils/navigateToPage';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import type { MouseEvent } from 'react';
import type { TFunction } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { CLOSE_DAYS } from '../../../../constants';

type Props = {
    cycle: SettlementsTypes.Cycles.Cycle;
    periods: SettlementsTypes.Cycles.Periods.Period[];
};

const typeFormatter = (period_weeks: number, t: TFunction) => {
    switch (period_weeks) {
    case 1:
        return t('settings:settlements.cycles.item.periods.weekly');
    case 2:
        return t('settings:settlements.cycles.item.periods.bi_weekly');
    case 3:
        return t('settings:settlements.cycles.item.periods.every_3_weeks');
    case 4:
        return t('settings:settlements.cycles.item.periods.monthly');
    default:
        return t('settings:settlements.cycles.item.periods.every_count_weeks', {
            period: period_weeks
        });
    }
};

export default function Info({
    cycle,
    periods
}: Props) {
    const { t } = useAppTranslation();
    const openPeriods = periods.filter(
        (period) => period.status === Settlements_Cycle_Period_Status.OPEN
    ).length;

    const closedPeriods = periods.filter(
        (period) => period.status === Settlements_Cycle_Period_Status.CLOSED
    ).length;

    const closeDay = CLOSE_DAYS.find((day) => day.id === cycle.closingDay);
    const closeDayName = closeDay ? t(closeDay.name) : '';
    const closeTime = timeFormatter(cycle.closingTime);

    const goToDriversPage = (e: MouseEvent) => {
        navigateToPage('/drivers', e);
    };

    return (
        <Stack
            paddingTop="25px"
            spacing={3}
            direction="row"
        >
            <StyledPaper>
                <Stack
                    spacing={2}
                    direction="column"
                    padding="8px 16px"
                >
                    <SecondSubtitle>{t('common:type')}</SecondSubtitle>
                    <SecondTitle>{typeFormatter(cycle.periodWeeks, t)}</SecondTitle>
                    <SecondSubtitle>
                        {t('settings:settlements.cycles.item.titles.close_day')}
                    </SecondSubtitle>
                    <SecondTitle>
                        {closeDayName} {closeTime}
                    </SecondTitle>
                </Stack>
            </StyledPaper>

            <ConnectedItem
                percent={(cycle.totalAssigned * 100) / cycle.total}
                name="settings:settlements.cycles.item.titles.assigned_drivers"
                icon={<VectorIcons.NavIcons.Driver />}
                total={cycle.total}
                total_connected={cycle.totalAssigned}
                onClick={goToDriversPage}
                style={{ height: 'auto' }}
            />

            <TotalPaper>
                <Stack
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        fontSize="32px"
                        variant="h5"
                        fontWeight={600}
                    >
                        {periods.length}
                    </Typography>
                    <TotalSubtitle>
                        {t('settings:settlements.cycles.item.titles.total_periods')}
                    </TotalSubtitle>
                </Stack>
            </TotalPaper>

            <Stack
                spacing={5}
                direction="column"
                justifyContent="center"
            >
                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                >
                    <StyledBox
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light' ? '#E3EFFE' : '#3E3F4F',
                            color: (theme) =>
                                theme.palette.mode === 'light' ? '#CB281A' : '#FF5A4A'
                        }}
                    >
                        {openPeriods}
                    </StyledBox>
                    <TotalSubtitle sx={{ marginLeft: '12px !important' }}>
                        {t('state_info:settlements.period.status.open')}
                    </TotalSubtitle>
                </Stack>
                <Stack
                    spacing={5}
                    direction="row"
                    alignItems="center"
                >
                    <StyledBox
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light' ? '#E3EFFE' : '#3E3F4F',
                            color: (theme) =>
                                theme.palette.mode === 'light' ? '#285FF6' : '#285FF6'
                        }}
                    >
                        {closedPeriods}
                    </StyledBox>
                    <TotalSubtitle sx={{ marginLeft: '12px !important' }}>
                        {t('state_info:settlements.period.status.closed')}
                    </TotalSubtitle>
                </Stack>
            </Stack>
        </Stack>
    );
}
