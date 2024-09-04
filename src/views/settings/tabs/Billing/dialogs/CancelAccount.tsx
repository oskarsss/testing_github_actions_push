import { Button, Link, styled, Typography } from '@mui/material';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import SettingsBillingGrpcService from '@/@grpcServices/services/settings-billing.service';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Title = styled(Typography)(() => ({
    margin   : '16px',
    textAlign: 'center'
}));
const SubTitle = styled(Typography)(() => ({
    margin: '16px 0 32px'
}));

export const useCancelAccountDialog = hookFabric(CancelAccount, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        padding="26px"
        {...props}
    />
));

function CancelAccount() {
    const { t } = useAppTranslation();
    const dialog = useCancelAccountDialog(true);
    const { isLoading } = SettingsBillingGrpcService.useSettingsBillingCancelAccountQuery({});

    return (
        <>
            <Title variant="h6">{t('settings:billing.dialog.cancel_account.header.title')}</Title>
            <SubTitle variant="subtitle1">
                {t('settings:billing.dialog.cancel_account.description_part_1')}{' '}
                <Link
                    href={`mailto:${SYSTEM.SUPPORT_EMAIL}`}
                    underline="hover"
                >
                    {SYSTEM.SUPPORT_EMAIL}
                </Link>{' '}
                {t('settings:billing.dialog.cancel_account.description_part_2')}
            </SubTitle>
            <Button
                disabled={isLoading}
                variant="contained"
                sx={{ width: '100%' }}
                onClick={dialog.close}
            >
                {t('settings:billing.dialog.cancel_account.okay')}
            </Button>
        </>
    );
}
