import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    providerName: string;
};

export default function ApexCapitalDialogHeader({ providerName }: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap="8px"
        >
            <Typography
                fontSize="20px"
                lineHeight="26px"
                fontWeight={600}
            >
                {t('billing:dialogs.push_to', {
                    providerName: providerName.split(' ')[0]
                })}
            </Typography>
            <Typography
                fontWeight={500}
                fontSize="12px"
                lineHeight="18px"
                letterSpacing="1%"
                padding="1px 6px"
                borderRadius="4px"
                sx={{
                    color          : (theme) => theme.palette.utility.text.blue_dark,
                    backgroundColor: (theme) => theme.palette.utility.foreground.blue_dark.secondary
                }}
            >
                {t('billing:dialogs.chip.paper_verified')}
            </Typography>
        </Stack>
    );
}
