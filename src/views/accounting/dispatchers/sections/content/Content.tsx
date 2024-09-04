import { Stack } from '@mui/material';
import { useDispatchers, useDispatchersCycleId } from '@/store/accounting/dispatchers/hooks';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useAddCycleDialog } from '@/views/settings/tabs/Settlements/Cycles/dialogs/AddCycleDialog';
import { CycleIcon, StatsIcon } from '@/@core/theme/entities/settlement/icons';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import { useCycles, useMainPeriods } from '@/store/accounting/settlements/hooks/settlements';
import { memo } from 'react';
import Stats from './stats/Stats';
import DispatchersTables from './tables/DispatchersTables';

function Content() {
    const cycle_id = useDispatchersCycleId();
    const {
        cycles,
        isLoading: isCyclesLoading
    } = useCycles();
    const { isLoading: isPeriodsLoading } = useMainPeriods(cycle_id);
    const {
        convertedDispatchers,
        isFetching
    } = useDispatchers();
    const createCycleDialog = useAddCycleDialog();

    const onClickCreate = () => {
        createCycleDialog.open({});
    };

    if (isCyclesLoading || isPeriodsLoading || isFetching) {
        return <Preloader />;
    }

    if (!cycles.length) {
        return (
            <FallbackContent
                size="large"
                onClick={onClickCreate}
                icon={<CycleIcon />}
                firstText="settlements:fallback.no_cycles.first_text"
                buttonText="settlements:fallback.no_cycles.button_text"
                textAfterButton="settlements:fallback.no_cycles.text_after_button"
                secondText="settlements:fallback.no_cycles.second_text"
            />
        );
    }

    if (!convertedDispatchers.length) {
        return (
            <FallbackContent
                size="large"
                icon={<StatsIcon />}
                firstText="dispatchers:fallback.first_text"
            />
        );
    }

    return (
        <Stack
            direction="row"
            height="100%"
            padding="16px"
            gap="16px"
            bgcolor="semantic.background.secondary"
            overflow="hidden"
        >
            <DispatchersTables dispatchers={convertedDispatchers} />

            <Stats dispatchers={convertedDispatchers} />
        </Stack>
    );
}

export default memo(Content);
