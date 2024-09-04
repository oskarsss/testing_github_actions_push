import {
    PeriodOption,
    useCycles,
    usePeriods,
    useSettlementCycleId,
    useSettlementPeriodId
} from '@/store/accounting/settlements/hooks/settlements';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import { CycleIcon } from '@/@core/theme/entities/settlement/icons';
import { InnerWrapper } from '@/views/accounting/settlements/Table/styled';
import { Box } from '@mui/material';
import SettlementsTable from '@/views/accounting/settlements/Table/components/Table/SettlementsTable';
import { useAddCycleDialog } from '@/views/settings/tabs/Settlements/Cycles/dialogs/AddCycleDialog';
import { useCreatePeriodDialog } from '@/views/accounting/settlements/dialogs/Periods/CreatePeriod';
import VectorIcons from '@/@core/icons/vector_icons';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { SettlementsActions } from '@/store/accounting/settlements/slice';

export default function SettlementContent() {
    const currentPeriod = useSettlementPeriodId();
    const currentCycle = useSettlementCycleId();

    const dispatch = useAppDispatch();
    const {
        cycles,
        isLoading: isCycleLoading
    } = useCycles();

    const {
        periods,
        isLoading: isPeriodsLoading
    } = usePeriods(PeriodOption.SETTLEMENTS);

    useEffect(() => {
        const period = periods.find((period) => period.periodId === currentPeriod);
        if (!period) {
            const firstPeriod = periods[0];
            if (firstPeriod) {
                dispatch(SettlementsActions.SetPeriodId(firstPeriod.periodId));
            }
        }
    }, [currentPeriod, periods]);

    useEffect(() => {
        const cycle = cycles.find((cycle) => cycle.cycleId === currentCycle);
        if (!cycle) {
            const firstCycle = cycles[0];
            if (firstCycle) {
                dispatch(SettlementsActions.SetCycleId(firstCycle.cycleId));
            }
        }
    }, [currentCycle, cycles]);

    const createCycleDialog = useAddCycleDialog();
    const createPeriodDialog = useCreatePeriodDialog();

    const handleCreateCycle = () => {
        createCycleDialog.open({});
    };

    const handleCreatePeriod = () => {
        createPeriodDialog.open({});
    };

    if (isCycleLoading || isPeriodsLoading) {
        return <Preloader />;
    }

    if (!cycles.length) {
        return (
            <FallbackContent
                size="large"
                onClick={handleCreateCycle}
                icon={<CycleIcon />}
                firstText="settlements:fallback.no_cycles.first_text"
                buttonText="settlements:fallback.no_cycles.button_text"
                textAfterButton="settlements:fallback.no_cycles.text_after_button"
                secondText="settlements:fallback.no_cycles.second_text"
            />
        );
    }

    if (!periods.length) {
        return (
            <FallbackContent
                size="large"
                onClick={handleCreatePeriod}
                icon={<VectorIcons.Cone />}
                firstText="settlements:fallback.no_periods.first_text"
                buttonText="settlements:fallback.no_periods.button_text"
                textAfterButton="settlements:fallback.no_periods.text_after_button"
                secondText="settlements:fallback.no_periods.second_text"
            />
        );
    }

    return (
        <InnerWrapper>
            <SettlementsTable />
        </InnerWrapper>
    );
}
