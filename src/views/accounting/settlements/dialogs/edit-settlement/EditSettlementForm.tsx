import { Fade, Stack } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import Header from './components/EditSettlementHeader';
import EditSettlementFields from './components/EditSettlementFields';
import EditSettlementActions from './components/EditSettlementActions';
import EditSettlementRegularMode from './modes/regular-modes/RegularMode';
import EditSettlementProMode from './modes/pro-mode/ProMode';

export default function EditSettlementForm() {
    const isProMode = useAppSelector((state) => state.settlements.edit_dialog.is_pro_mode);
    return (
        <Fade in>
            <form
                key={0}
                style={{
                    width        : '100%',
                    height       : '100%',
                    overflowX    : 'auto',
                    display      : 'flex',
                    flexDirection: 'column'
                }}
            >
                <Header />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    padding="10px 15px"
                >
                    <EditSettlementFields />
                    <EditSettlementActions />
                </Stack>
                {isProMode ? <EditSettlementProMode /> : <EditSettlementRegularMode />}
            </form>
        </Fade>
    );
}
