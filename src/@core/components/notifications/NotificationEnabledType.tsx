import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function NotificationEnabledType() {
    const { t } = useAppTranslation();

    const actionTitles = [
        'common:notifications.actions.enabled',
        'common:notifications.actions.enabledSms',
        'common:notifications.actions.enabledEmail',
        'common:notifications.actions.enabledWebPush'
    ];

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="20px"
            sx={{
                '&:last-child': {
                    paddingRight: '10px'
                }
            }}
        >
            {actionTitles.map((title) => (
                <Typography
                    key={title}
                    variant="body1"
                    fontSize="14px"
                    fontWeight={600}
                    color="semantic.text.disabled"
                >
                    {t(title)}
                </Typography>
            ))}
        </Stack>
    );
}
