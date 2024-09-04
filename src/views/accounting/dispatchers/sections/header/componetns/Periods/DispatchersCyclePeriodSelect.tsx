import { KeyboardEvent, useCallback, useMemo, useState } from 'react';
import moment from 'moment-timezone';
import {
    PeriodOption,
    useActiveCycle,
    usePeriods
} from '@/store/accounting/settlements/hooks/settlements';
import { InputLabel, OutlinedInput, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import { useEditSettlementPeriodDialog } from '@/views/accounting/settlements/dialogs/Periods/EditPeriod';
import {
    useDispatchersCycleId,
    useDispatchersPeriodId
} from '@/store/accounting/dispatchers/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import PeriodsSelectLoading from './components/PeriodsSelectLoading';
import PeriodsSelectIconComponent from './components/PeriodsSelectIconComponent';
import PeriodsSelectList from './components/PeriodsSelectList';
import PeriodsSelectStyled from './styled';

export default function DispatchersCyclePeriodSelect() {
    const { t } = useAppTranslation();
    const cycleId = useDispatchersCycleId();
    const periodId = useDispatchersPeriodId();
    const [open, setOpen] = useState(false);
    const {
        periods,
        isLoading
    } = usePeriods(PeriodOption.DISPATCHERS);
    const {
        cycles,
        isLoading: isCyclesLoading
    } = useActiveCycle();

    const editSettlementPeriodDialog = useEditSettlementPeriodDialog();

    const handleClickEditDialog = useCallback(
        (period_id: string, start_datetime: string, end_datetime: string) => {
            editSettlementPeriodDialog.open({
                periodId     : period_id,
                startDatetime: start_datetime,
                endDatetime  : end_datetime
            });
        },
        [editSettlementPeriodDialog]
    );

    const selectedPeriod = useMemo(
        () => periods?.find((period) => period.periodId === periodId) ?? null,
        [periods, periodId]
    );

    const selectedCycle = useMemo(
        () => cycles.find((cycle) => cycle.cycleId === cycleId),
        [cycles, cycleId]
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Tab') {
            e.stopPropagation();
            e.preventDefault();
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const renderValue = () =>
        !isLoading ? (
            <Typography
                variant="body1"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {moment(selectedPeriod?.startDatetime).format('MM/DD ddd')} -{' '}
                {moment(selectedPeriod?.endDatetime).format('MM/DD ddd hh:mm A')}
            </Typography>
        ) : (
            <PeriodsSelectLoading />
        );

    const renderIconComponent = () => (
        <PeriodsSelectIconComponent
            isLoading={isLoading}
            isCyclesLoading={isCyclesLoading}
            open={open}
            setOpen={setOpen}
            periods={periods}
            selectedCycle={selectedCycle}
            selectedPeriod={selectedPeriod}
            onClick={handleClickEditDialog}
        />
    );

    return (
        <PeriodsSelectStyled.FormControl>
            <InputLabel
                size="small"
                id="periods-select-label"
            >
                {t(`fields:periods.${selectedCycle ? 'label' : 'no_cycles'}`)}
            </InputLabel>
            <Select
                disabled={!selectedCycle}
                id="periods-select"
                size="small"
                IconComponent={renderIconComponent}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                value={selectedPeriod?.periodId || ''}
                onKeyDown={handleKeyDown}
                input={(
                    <OutlinedInput
                        label={t('fields:periods.label')}
                        size="small"
                    />
                )}
                renderValue={renderValue}
                sx={{
                    minHeight             : '43px',
                    '&& .MuiSelect-select': {
                        minWidth    : '0rem !important',
                        paddingRight: '4px !important'
                    },
                    '&& .MuiOutlinedInput-notchedOutline': {
                        borderColor: ({ palette }) => palette.semantic.border.secondary
                    }
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            '.MuiList-root': {
                                padding: !periods ? '8px 0' : '0'
                            }
                        }
                    }
                }}
            >
                <PeriodsSelectList
                    periods={periods}
                    onEditDialog={handleClickEditDialog}
                    onClose={handleClose}
                    cycleId={cycleId}
                    periodId={periodId}
                />
            </Select>
        </PeriodsSelectStyled.FormControl>
    );
}
