import IntegrationConnectComponents from '@/views/settings/tabs/Integrations/Connect/components/IntegrationConnectComponents';
import React from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    title: string;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

export default function Connect({
    title,
    isLoading,
    isError,
    isSuccess
}: Props) {
    const { t } = useAppTranslation();
    const router = useRouter();
    const onClickGoToSettings = () => router.push('/settings/integrations');

    return (
        <IntegrationConnectComponents.Container>
            {isLoading && <IntegrationConnectComponents.Loading type={title} />}
            {isError && (
                <IntegrationConnectComponents.TitleWithButton
                    title={`${title} ${t('settings:integrations.connect.error_text')}.`}
                    buttonText={t('settings:integrations.connect.error_button')}
                    onClick={onClickGoToSettings}
                />
            )}
            {isSuccess && (
                <Typography
                    variant="h6"
                    sx={{
                        textAlign   : 'center',
                        paddingRight: '17px'
                    }}
                >
                    {`${title} ${t('settings:integrations.connect.connected')}.`}
                </Typography>
            )}
        </IntegrationConnectComponents.Container>
    );
}
