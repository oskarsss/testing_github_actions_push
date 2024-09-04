import Content from '@/views/settings/tabs/Integrations/Details/components/Content/Content';
import { useRouter } from 'next/router';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import React from 'react';
import Loading from '@/@core/components/page/Loading';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import { getApiErrorMessage } from '@/store/helpers';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';

type Props = {
    provider_id: string;
};

export default function Details({ provider_id }: Props) {
    const router = useRouter();

    const {
        data,
        error,
        isError,
        isLoading
    } =
        IntegrationProviderGrpcService.useGetIntegrationProviderIdQuery({
            integrationProviderId: provider_id
        });

    if (isError) {
        return (
            <IntegrationDetailsComponents.DetailsContainer
                provider_name={data?.integrationProvider?.name}
            >
                <FallbackContent
                    icon={<VectorIcons.Cone />}
                    onClick={() => router.push('/settings/integrations')}
                    buttonText="common:button.go_to_back"
                    firstText={
                        error ? (
                            <span>{getApiErrorMessage(error)}</span>
                        ) : (
                            'common:something_went_wrong'
                        )
                    }
                />
            </IntegrationDetailsComponents.DetailsContainer>
        );
    }

    if (isLoading || !data?.integrationProvider) {
        return (
            <IntegrationDetailsComponents.DetailsContainer>
                <Loading />
            </IntegrationDetailsComponents.DetailsContainer>
        );
    }

    return (
        <IntegrationDetailsComponents.DetailsContainer
            provider_name={data.integrationProvider.name}
        >
            <Content provider={data.integrationProvider} />
        </IntegrationDetailsComponents.DetailsContainer>
    );
}
