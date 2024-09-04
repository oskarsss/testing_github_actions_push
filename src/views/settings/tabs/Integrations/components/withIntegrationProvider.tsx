import React from 'react';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';

function withIntegrationProvider<T>(
    WrappedComponent: React.ComponentType<T>,
    providerId: keyof typeof PROVIDER_ID
) {
    const ProviderHOC: React.FC<Omit<T, 'provider'>> = (props) => {
        const { data } = IntegrationProviderGrpcService.useGetIntegrationProvidersQuery({});
        const provider = data?.integrationProviders?.find(
            (provider) => provider.id === PROVIDER_ID[providerId]
        );
        const isConnected = provider?.oauthRequired
            ? provider?.oauthConnected
            : provider?.connected;

        if (!provider || !isConnected) return null;

        return (
            <WrappedComponent
                {...(props as T)}
                provider={provider}
            />
        );
    };

    return ProviderHOC;
}

export default withIntegrationProvider;
