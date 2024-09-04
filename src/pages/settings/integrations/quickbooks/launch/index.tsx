import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import IntegrationConnectComponents from '@/views/settings/tabs/Integrations/Connect/components/IntegrationConnectComponents';
import QuickbooksAuthorize from '@/views/settings/tabs/Integrations/Connect/Quickbooks/QuickbooksAuthorize';
import QuickbooksGetOauthURLWithoutCompany from '@/views/settings/tabs/Integrations/Connect/Quickbooks/QuickbooksGetOauthURLWithoutCompany';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

function QuickbooksLaunch() {
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
            {isPassedChecks && !OAuthParams && <QuickbooksGetOauthURLWithoutCompany />}
            {isPassedChecks && OAuthParams && <QuickbooksAuthorize {...OAuthParams} />}
        </IntegrationConnectComponents.Container>
    );
}

export default QuickbooksLaunch;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
