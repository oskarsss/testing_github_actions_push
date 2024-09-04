import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import IntegrationConnectComponents from '@/views/settings/tabs/Integrations/Connect/components/IntegrationConnectComponents';
import QuickbooksDisconnectByCode from '@/views/settings/tabs/Integrations/Disconnect/Quickbook/QuickbooksDisconnectByCode';
import QuickbooksDisconnectGetUrl from '@/views/settings/tabs/Integrations/Disconnect/Quickbook/QuickbooksDisconnectGetUrl';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

function QuickbooksConnect() {
    const router = useRouter();

    const disconnectByCodeQuery = useMemo(() => {
        if (!router.query.code || !router.query.state) return null;
        return {
            code : router.query.code as string,
            state: router.query.state as string
        };
    }, [router.query]);

    const realmId = router.query?.realmId as string | undefined;

    useEffect(() => {
        if (!router.isReady) return;
        if (!disconnectByCodeQuery && !realmId) {
            router.replace('/');
        }
    }, [disconnectByCodeQuery, router.isReady, realmId]);

    return (
        <IntegrationConnectComponents.Container>
            {router.isReady && disconnectByCodeQuery && (
                <QuickbooksDisconnectByCode {...disconnectByCodeQuery} />
            )}
            {router.isReady && realmId && !disconnectByCodeQuery && (
                <QuickbooksDisconnectGetUrl realmId={realmId} />
            )}
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
