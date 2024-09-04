/* eslint-disable max-len */

import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import IntegrationConnectComponents from '@/views/settings/tabs/Integrations/Connect/components/IntegrationConnectComponents';
import QuickbooksGetOauthURL from '@/views/settings/tabs/Integrations/Connect/Quickbooks/QuickbooksGetOauthURL';
import QuickbooksUpdateOauthToken from '@/views/settings/tabs/Integrations/Connect/Quickbooks/QuickbooksUpdateOauthToken';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

function QuickbooksConnect() {
    const router = useRouter();

    const OAuthParams = useMemo(() => {
        if (!router.query.code || !router.query.state || !router.query.realmId) return null;
        return {
            code   : router.query.code as string,
            state  : router.query.state as string,
            realmId: router.query.realmId as string
        };
    }, [router.query.code, router.query.state, router.query.realmId]);

    const isQueryError = useMemo(() => {
        if (!router.query?.error) return false;
        return router.query.error === 'access_denied';
    }, [router.query?.error]);

    useEffect(() => {
        if (isQueryError) {
            window.location.href = '/settings/integrations';
        }
    }, [isQueryError]);

    const isPassedChecks = router.isReady && !isQueryError;

    return (
        <IntegrationConnectComponents.Container>
            {isPassedChecks && !OAuthParams && <QuickbooksGetOauthURL />}
            {isPassedChecks && OAuthParams && <QuickbooksUpdateOauthToken {...OAuthParams} />}
        </IntegrationConnectComponents.Container>
    );
}

export default QuickbooksConnect;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
