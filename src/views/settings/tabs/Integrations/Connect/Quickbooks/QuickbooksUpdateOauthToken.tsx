import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import IntegrationConnectComponents from '@/views/settings/tabs/Integrations/Connect/components/IntegrationConnectComponents';
import { renderError } from '@/utils/render-error';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function QuickbooksUpdateOauthToken({
    code = '',
    state = '',
    realmId = ''
}) {
    const router = useRouter();
    const { t } = useAppTranslation();

    const [quickbooksUpdateOAuthToken, {
        isLoading,
        isError,
        isSuccess,
        error
    }] =
        IntegrationProviderGrpcService.useQuickbooksUpdateOAuthTokenMutation();

    useEffect(() => {
        quickbooksUpdateOAuthToken({
            code,
            state,
            realmId
        })
            .unwrap()
            .then(() => {
                router.replace('/settings/integrations');
            });
    }, []);

    if (isLoading) {
        return <IntegrationConnectComponents.Loading type="QuickBooks" />;
    }

    if (isError) {
        return (
            <IntegrationConnectComponents.TitleWithButton
                title={renderError(error)}
                buttonText={t('settings:integrations.connect.error_button')}
                onClick={() => {
                    router.push('/settings/integrations');
                }}
            />
        );
    }

    if (isSuccess) {
        return (
            <IntegrationConnectComponents.TitleWithButton
                title={`QuickBooks ${t('settings:integrations.connect.connected')}.`}
            />
        );
    }

    return null;
}
