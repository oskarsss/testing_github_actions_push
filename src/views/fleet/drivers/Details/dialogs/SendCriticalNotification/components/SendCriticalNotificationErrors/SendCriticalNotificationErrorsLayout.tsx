import { ReactNode } from 'react';
import SendCriticalNotificationHeader from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationHeader';
import CriticalNotificationStyled from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/styled';
import { Typography } from '@mui/material';
import Actions from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationErrors/Actions';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    icon: ReactNode;
    title: IntlMessageKey;
    message: IntlMessageKey;
    button_text: IntlMessageKey;
    onClick: () => void;
};

export default function SendCriticalNotificationErrorsLayout({
    icon,
    title,
    message,
    button_text,
    onClick
}: Props) {
    const { t } = useAppTranslation();

    return (
        <CriticalNotificationStyled.ErrorWrapper>
            <SendCriticalNotificationHeader />

            <CriticalNotificationStyled.ErrorContent>
                {icon}
                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    {t(title)}
                </Typography>
                <Typography
                    variant="body2"
                    fontSize={12}
                >
                    {t(message)}
                </Typography>
            </CriticalNotificationStyled.ErrorContent>

            <Actions
                button_text={button_text}
                onClick={onClick}
            />
        </CriticalNotificationStyled.ErrorWrapper>
    );
}
