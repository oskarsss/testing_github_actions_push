import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import Connect from '@/views/settings/tabs/Integrations/Connect/Connect';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

function OttLoadboardConnect() {
    const router = useRouter();
    const [updateProvider, {
        isLoading,
        isError,
        isSuccess
    }] =
        IntegrationProviderGrpcService.useOttLoadboardUpdateOAuthTokenMutation();

    const OAuthParams = useMemo(() => {
        if (!router.query.code || !router.query.state) return null;
        return {
            code : router.query.code as string,
            state: router.query.state as string
        };
    }, [router.query.code, router.query.state]);

    useEffect(() => {
        if (OAuthParams) {
            updateProvider({
                code : OAuthParams.code,
                state: OAuthParams.state
            });
        } else {
            router.push('/settings/integrations');
        }
    }, [OAuthParams]);

    useEffect(() => {
        if (isSuccess) {
            router.push('/settings/integrations');
        }
    }, [isSuccess]);

    return (
        <Connect
            title="123Loadboard"
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
        />
    );
}

export default OttLoadboardConnect;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
