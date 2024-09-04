import { Box, Button } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useAddCycleDialog } from '@/views/settings/tabs/Settlements/Cycles/dialogs/AddCycleDialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function NoCycles() {
    const { t } = useAppTranslation();
    const createCycleDialog = useAddCycleDialog();

    const onClickCreate = () => {
        createCycleDialog.open({});
    };

    return (
        <Box p={0}>
            <Button
                fullWidth
                size="small"
                startIcon={<AddCircleOutline />}
                onClick={onClickCreate}
            >
                {t('common:actions.create_cycle')}
            </Button>
        </Box>
    );
}
