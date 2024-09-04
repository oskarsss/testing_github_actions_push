import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import React, { useEffect } from 'react';
import IntegrationConnectComponents from '@/views/settings/tabs/Integrations/Connect/components/IntegrationConnectComponents';
import { renderError } from '@/utils/render-error';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function QuickbooksGetOauthURLWithoutCompany() {
    const { t } = useAppTranslation();
    const [getOauthURLWithoutCompany, {
        isLoading,
        isError,
        isSuccess,
        error
    }] =
        IntegrationQuickbooksGrpcService.useGetOauthURLWithoutCompanyQuickbooksMutation();

    useEffect(() => {
        getOauthURLWithoutCompany({ development: false })
            .unwrap()
            .then((res) => {
                if (res.url) {
                    window.location.href = res.url;
                }
            });
    }, []);

    if (isLoading) {
        return <IntegrationConnectComponents.Loading type="QuickBooks" />;
    }

    if (isError) {
        return (
            <IntegrationConnectComponents.TitleWithButton
                title={renderError(
                    error || {
                        status: 'CUSTOM_ERROR',
                        error : t('common:something_went_wrong')
                    }
                )}
                buttonText={t('common:button.retry')}
                onClick={() => {
                    window.location.reload();
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

export default QuickbooksGetOauthURLWithoutCompany;
