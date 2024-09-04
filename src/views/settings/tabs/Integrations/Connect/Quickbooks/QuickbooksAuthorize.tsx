/* eslint-disable max-len */

import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import React, { useEffect } from 'react';
import { IP_Quickbooks_SignUpReply_Action } from '@proto/integration_provider_quickbooks';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import IntegrationConnectComponents from '@/views/settings/tabs/Integrations/Connect/components/IntegrationConnectComponents';
import { renderError } from '@/utils/render-error';
import { useAppDispatch } from '@/store/hooks';
import { AppActions } from '@/store/app/slice';
import Router from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function QuickbooksAuthorize({
    code = '',
    state = '',
    realmId = ''
}) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const [signUpQuickbooks, {
        isLoading,
        isSuccess,
        isError,
        error
    }] =
        IntegrationQuickbooksGrpcService.useSignUpQuickbooksMutation();

    useEffect(() => {
        signUpQuickbooks({
            code,
            state,
            realmId
        })
            .unwrap()
            .then((res) => {
                const update_password =
                    res.action === IP_Quickbooks_SignUpReply_Action.UPDATE_PASSWORD;
                const query = update_password ? { ...Router.query, update_password } : Router.query;

                Router.push({
                    pathname: `/settings/integrations/${PROVIDER_ID.QUICKBOOKS}`,
                    query
                }).then(() => {
                    dispatch(AppActions.SetToken(res.token));
                    dispatch(AppActions.SelectCompany(res.companyId));
                });
            });
    }, [code, state, realmId, signUpQuickbooks, dispatch]);

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
                    Router.push('/settings/integrations/quickbooks/launch/');
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

export default QuickbooksAuthorize;
