import IntegrationComponents from '@/views/settings/tabs/Integrations/components/Content/components/IntegrationComponents';
import {
    IntegrationCategoryIcons,
    IntegrationCategoryLabels
} from '@/views/settings/tabs/Integrations/components/Content/categories_configs';
import React from 'react';
import { IntegrationProvider } from '@proto/integrations';
import VectorIcons from '@/@core/icons/vector_icons';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import ConnectQBButton from '@/views/settings/tabs/Integrations/components/ConnectQBButton/ConnectQBButton';
import { useAppDispatch } from '@/store/hooks';
import openNewWindow from '@/utils/open-new-window';
import ProviderLogo from '@/views/settings/tabs/Integrations/components/ProviderLogo';
import Router from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    item: IntegrationProvider;
};

export default function CardItem({ item }: Props) {
    const { t } = useAppTranslation();
    const [loading, setLoading] = React.useState(false);
    const isConnected = item.oauthRequired ? item.oauthConnected : item.connected;
    const dispatch = useAppDispatch();
    const [connectIntegrationProvider, { isLoading: loadingConnectProvider }] =
        IntegrationProviderGrpcService.useConnectIntegrationProviderMutation();

    const onClick = () => {
        if (isConnected) {
            Router.push(`/settings/integrations/${item.id}`);

            return;
        }

        if (item.oauthRequired) {
            const getOAuthUrl = () => {
                setLoading(true);
                dispatch(
                    IntegrationProviderGrpcService.endpoints.getOAuthUrl.initiate({
                        integrationProviderId: item.id
                    })
                )
                    .unwrap()
                    .then((res) => {
                        window.location.href = res.url;
                    })
                    .finally(() => setLoading(false));
            };

            if (item.connected) {
                getOAuthUrl();
            } else {
                connectIntegrationProvider({
                    integrationProviderId: item.id
                })
                    .unwrap()
                    .then(getOAuthUrl);
            }
        } else {
            connectIntegrationProvider({
                integrationProviderId: item.id
            })
                .unwrap()
                .then(() => {
                    openNewWindow(`settings/integrations/${item.id}`);
                });
        }
    };

    const isLoading = loading || loadingConnectProvider;

    return (
        <IntegrationComponents.Card.Container key={item.id}>
            <IntegrationComponents.Card.Row>
                <ProviderLogo
                    srcLightMode={item.darkLogoUrl}
                    srcDarkMode={item.lightLogoUrl}
                    height="30px"
                    style={{ marginBottom: '4px' }}
                />

                <IntegrationComponents.Card.Description>
                    {item.shortDescription}
                </IntegrationComponents.Card.Description>
            </IntegrationComponents.Card.Row>

            <IntegrationComponents.Card.Row>
                <IntegrationComponents.Card.Divider />

                <IntegrationComponents.Card.Bottom>
                    <IntegrationComponents.Card.CategoriesWrapper>
                        {item.categories.map((category) => (
                            <IntegrationComponents.Card.Category key={category}>
                                {IntegrationCategoryIcons[category]}
                                {t(IntegrationCategoryLabels[category])}
                            </IntegrationComponents.Card.Category>
                        ))}
                    </IntegrationComponents.Card.CategoriesWrapper>

                    {item.id === PROVIDER_ID.QUICKBOOKS && !isConnected ? (
                        <ConnectQBButton
                            onClick={onClick}
                            isLoading={isLoading}
                        />
                    ) : (
                        <IntegrationComponents.Card.Button
                            variant={isConnected ? 'text' : 'outlined'}
                            startIcon={isConnected || isLoading ? undefined : <VectorIcons.Link />}
                            onClick={onClick}
                            color="primary"
                            loading={isLoading}
                        >
                            {isConnected ? t('common:button.manage') : t('common:button.connect')}
                        </IntegrationComponents.Card.Button>
                    )}
                </IntegrationComponents.Card.Bottom>
            </IntegrationComponents.Card.Row>
        </IntegrationComponents.Card.Container>
    );
}
