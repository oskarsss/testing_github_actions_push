import { IconButton, Tooltip } from '@mui/material';
import SettlementsIcons from '@/views/accounting/settlements/Icons';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { MouseEvent } from 'react';
import { useCreatePeriodDialog } from '@/views/accounting/settlements/dialogs/Periods/CreatePeriod';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    selectedCycle?: SettlementsTypes.Cycles.Cycle;
    periods: SettlementsTypes.Cycles.Periods.Period[];
    selectedPeriod: SettlementsTypes.Cycles.Periods.Period | null;
    onClick: (period_id: string, start_datetime: string, end_datetime: string) => void;
};

export default function PeriodsSelectIconComponentAction({
    selectedCycle,
    selectedPeriod,
    periods,
    onClick
}: Props) {
    const { t } = useAppTranslation();
    const createPeriodDialog = useCreatePeriodDialog();

    const openCreatePeriodDialog = () => {
        createPeriodDialog.open({});
    };

    const openEditPeriodDialog = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!selectedPeriod) return;
        onClick(selectedPeriod.periodId, selectedPeriod.startDatetime, selectedPeriod.endDatetime);
    };

    return (
        <>
            {selectedCycle && (
                <Tooltip
                    disableInteractive
                    title={t('fields:periods.tooltips.create_period')}
                >
                    <IconButton
                        size="small"
                        onClick={openCreatePeriodDialog}
                        aria-label="Create period"
                    >
                        <SettlementsIcons.Add />
                    </IconButton>
                </Tooltip>
            )}
            {periods.length > 0 && (
                <Tooltip
                    disableInteractive
                    title={t('fields:periods.tooltips.edit_period')}
                >
                    <IconButton
                        onClick={openEditPeriodDialog}
                        size="small"
                        aria-label="Edit period"
                    >
                        <SettlementsIcons.Edit />
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
}
