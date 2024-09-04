import { MouseEvent, useCallback } from 'react';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useUpdateDispatchersRequestData } from '@/store/accounting/dispatchers/hooks';
import { IconButton, Stack, Tooltip } from '@mui/material';
import SettlementsIcons from '@/views/accounting/settlements/Icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import PeriodsSelectStyled from '../styled';
import PeriodsSelectItemContent from './PeriodsSelectItemContent';

type Props = {
    period: SettlementsTypes.Cycles.Periods.Period;
    onEditDialog: (period_id: string, start_datetime: string, end_datetime: string) => void;
    onClose: () => void;
    cycleId: string;
    periodId: string;
};

export default function DispatcherMenuItem({
    period,
    cycleId,
    periodId,
    onEditDialog,
    onClose
}: Props) {
    const { t } = useAppTranslation();
    const updateRequest = useUpdateDispatchersRequestData();

    const selectPeriod = useCallback(() => {
        updateRequest({ period_id: period.periodId, cycle_id: cycleId });
        onClose();
    }, []);

    const editPeriod = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onEditDialog(period.periodId, period.startDatetime, period.endDatetime);
    };

    return (
        <PeriodsSelectStyled.Item
            value={period.periodId}
            onClick={selectPeriod}
            selected={periodId === period.periodId}
        >
            <PeriodsSelectItemContent period={period} />

            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <Tooltip
                    disableInteractive
                    title={t('fields:periods.tooltips.edit_period')}
                >
                    <IconButton
                        onClick={editPeriod}
                        size="small"
                    >
                        <SettlementsIcons.Edit />
                    </IconButton>
                </Tooltip>
            </Stack>
        </PeriodsSelectStyled.Item>
    );
}
