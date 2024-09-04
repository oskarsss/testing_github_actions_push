import { Button } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useSendCriticalNotificationDialog } from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import CriticalNotificationStyled from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/styled';
import type { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    button_text: IntlMessageKey;
    onClick: () => void;
};

export default function Actions({
    button_text,
    onClick
}: Props) {
    const { t } = useAppTranslation();
    const dialog = useSendCriticalNotificationDialog(true);

    return (
        <CriticalNotificationStyled.ErrorActions>
            <Button
                variant="outlined"
                onClick={dialog.close}
            >
                {t('common:button.cancel')}
            </Button>

            <Button
                variant="contained"
                onClick={onClick}
            >
                {t(button_text)}
            </Button>
        </CriticalNotificationStyled.ErrorActions>
    );
}
