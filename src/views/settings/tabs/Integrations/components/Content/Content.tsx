import Tabs from '@/views/settings/tabs/Integrations/components/Content/components/Tabs/Tabs';
import React from 'react';
import Loading from '@/@core/components/page/Loading';
import IntegrationComponents from '@/views/settings/tabs/Integrations/components/Content/components/IntegrationComponents';
import Cards from '@/views/settings/tabs/Integrations/components/Content/components/Cards/Cards';
import Error from '@/views/settings/tabs/Integrations/components/Error';
import { useIntegrations } from '@/store/settings/integrations/hooks';
import { getApiErrorMessage } from '@/store/helpers';

export default function Content() {
    const {
        rows,
        data,
        isLoading,
        isError,
        refetch,
        error
    } = useIntegrations();

    return (
        <IntegrationComponents.Container>
            <Tabs />
            <IntegrationComponents.Wrapper>
                {isLoading && <Loading />}
                {isError && (
                    <Error
                        onClick={refetch}
                        message={getApiErrorMessage(error)}
                    />
                )}
                {!!data && <Cards providers={rows} />}
            </IntegrationComponents.Wrapper>
        </IntegrationComponents.Container>
    );
}
