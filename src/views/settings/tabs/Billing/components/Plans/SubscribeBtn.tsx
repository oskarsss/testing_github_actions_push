import { Button } from '@mui/material';
import SettingsBillingGrpcService from '@/@grpcServices/services/settings-billing.service';
import { useRouter } from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function SubscribeBtn() {
    const { t } = useAppTranslation();
    const router = useRouter();
    const { data } = SettingsBillingGrpcService.useSettingsBillingCheckoutQuery({});

    const onClick = () => {
        if (!data) return;
        router.push(data.sessionUrl);
    };

    return (
        <Button
            variant="contained"
            onClick={onClick}
            disabled={!data}
            sx={{ marginTop: '8px', width: '100%' }}
        >
            {t('common:button.subscribe')}
        </Button>
    );
}
