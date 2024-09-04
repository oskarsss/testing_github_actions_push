import openNewWindow from '@/utils/open-new-window';
import { Fade, Stack, Typography } from '@mui/material';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    title: string;
};

export default function NotConfigureApex({ title }: Props) {
    const { t } = useAppTranslation('billing');
    const goToSettings = () => {
        openNewWindow(`settings/integrations/${PROVIDER_ID.APEX_CAPITAL}`);
    };

    return (
        <Fade in>
            <Stack
                alignItems="center"
                alignContent="center"
                paddingY="40px"
                gap="6px"
            >
                <Typography
                    fontSize="16px"
                    fontWeight={600}
                >
                    {title}
                </Typography>
                <Typography
                    fontSize="14px"
                    fontWeight={500}
                    color="text.secondary"
                >
                    {t('dialogs.apex.no_configure.before_button')}
                    <Typography
                        component="span"
                        color="primary"
                        fontSize="inherit"
                        fontWeight="inherit"
                        lineHeight="inherit"
                        onClick={goToSettings}
                        sx={{
                            cursor   : 'pointer',
                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        {` ${t('dialogs.apex.no_configure.button')} `}
                    </Typography>
                    {t('dialogs.apex.no_configure.after_button')}
                </Typography>
            </Stack>
        </Fade>
    );
}
