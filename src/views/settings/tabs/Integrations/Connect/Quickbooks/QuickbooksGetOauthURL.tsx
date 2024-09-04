import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import React, { useEffect } from 'react';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import IntegrationConnectComponents from '@/views/settings/tabs/Integrations/Connect/components/IntegrationConnectComponents';
import { useRouter } from 'next/router';
import { renderError } from '@/utils/render-error';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function QuickbooksGetOauthURL() {
    const { t } = useAppTranslation();
    const router = useRouter();

    const [getOAuthUrl, {
        isLoading,
        isError,
        isSuccess,
        error
    }] =
        IntegrationProviderGrpcService.useLazyGetOAuthUrlQuery();

    useEffect(() => {
        getOAuthUrl({ integrationProviderId: PROVIDER_ID.QUICKBOOKS })
            .unwrap()
            .then((res) => {
                if (!res.url) return;
                window.location.href = res.url;
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
                title={`${t('settings:integrations.connect.success_and_redirect')}...`}
            />
        );
    }

    return null;
}
