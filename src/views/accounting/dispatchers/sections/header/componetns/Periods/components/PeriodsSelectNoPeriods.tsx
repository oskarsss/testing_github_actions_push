import { useCreatePeriodDialog } from '@/views/accounting/settlements/dialogs/Periods/CreatePeriod';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function PeriodsSelectNoPeriods() {
    const { t } = useAppTranslation();
    const createPeriodDialog = useCreatePeriodDialog();

    return (
        <Box p={0}>
            <Button
                fullWidth
                size="small"
                startIcon={<AddCircleOutline />}
                onClick={() => createPeriodDialog.open({})}
            >
                {t('fields:periods.button.create_period')}
            </Button>
        </Box>
    );
}
