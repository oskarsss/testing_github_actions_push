import { useCreatePeriodDialog } from '@/views/accounting/settlements/dialogs/Periods/CreatePeriod';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function PeriodsSelectNoPeriods() {
    const createPeriodDialog = useCreatePeriodDialog();
    const { t } = useAppTranslation();

    return (
        <Box p={0}>
            <Button
                fullWidth
                size="small"
                startIcon={<AddCircleOutline />}
                onClick={() => createPeriodDialog.open({})}
            >
                {t('settlements:period.buttons.create_period')}
            </Button>
        </Box>
    );
}
