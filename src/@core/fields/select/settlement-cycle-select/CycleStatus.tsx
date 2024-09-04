import SettlementsTypes from '@/store/accounting/settlements/types';
import Box from '@mui/material/Box';
import StatusChip from '@/views/settings/tabs/Settlements/components/StatusChip/StatusChip';

type Props = {
    cycle: SettlementsTypes.Cycles.Cycle;
};

export default function CycleStatus({ cycle }: Props) {
    if (cycle.default) {
        return (
            <Box ml="auto">
                <StatusChip
                    label="state_info:settlements.cycle.state.default"
                    color="green"
                />
            </Box>
        );
    }
}
