import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useCancelAccountDialog } from '@/views/settings/tabs/Billing/dialogs';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function CancelYourAccount() {
    const { t } = useAppTranslation('settings');
    const cancelAccountDialog = useCancelAccountDialog();

    const handleCancelAccount = () => {
        cancelAccountDialog.open({});
    };

    return (
        <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            padding="9px 17px 9px 24px"
            borderRadius="12px"
            border={(theme) => `1px solid ${theme.palette.semantic.border.secondary}`}
        >
            <Typography
                fontSize="16px"
                textTransform="uppercase"
                fontWeight={500}
            >
                {t('billing.cancel_account.title')}
            </Typography>
            <Button
                color="error"
                onClick={handleCancelAccount}
                startIcon={<DoDisturbAltIcon />}
                sx={{
                    fontSize  : '14px',
                    fontWeight: 500
                }}
            >
                {t('billing.cancel_account.button.cancel')}
            </Button>
        </Stack>
    );
}
