import Button from '@mui/material/Button';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { IntegrationProvider } from '@proto/integrations';
import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import { useRouter } from 'next/router';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import ConnectQBButton from '@/views/settings/tabs/Integrations/components/ConnectQBButton/ConnectQBButton';
import { useAppDispatch } from '@/store/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    provider: IntegrationProvider;
};
export default function ButtonConnect({ provider }: Props) {
    const { t } = useAppTranslation();
    const [loading, setLoading] = React.useState(false);
    const confirm = useConfirm();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isConnected = provider.oauthRequired ? provider.oauthConnected : provider.connected;
    const [disconnectProvider, { isLoading: loadingDisconnect }] =
        IntegrationProviderGrpcService.useDisconnectIntegrationProviderMutation();

    const [connectProvider, { isLoading: loadingConnect }] =
        IntegrationProviderGrpcService.useConnectIntegrationProviderMutation();

    const onClick = () => {
        if (isConnected) {
            confirm({
                title             : 'modals:settings.integrations.provider.disconnect.title',
                body              : 'modals:settings.integrations.provider.disconnect.body',
                confirm_text      : 'common:button.disconnect',
                max_width_dialog  : '600px',
                translationOptions: {
                    title: {
                        name: provider.name
                    }
                },
                onConfirm: () => {
                    disconnectProvider({
                        integrationProviderId: provider.id
                    }).then(() => router.replace('/settings/integrations'));
                }
            });
            return;
        }

        if (provider.oauthRequired) {
            const getOAuthUrl = () => {
                setLoading(true);
                dispatch(
                    IntegrationProviderGrpcService.endpoints.getOAuthUrl.initiate({
                        integrationProviderId: provider.id
                    })
                )
                    .unwrap()
                    .then((res) => {
                        window.location.href = res.url;
                    })
                    .finally(() => setLoading(false));
            };

            if (provider.connected) {
                getOAuthUrl();
            } else {
                connectProvider({
                    integrationProviderId: provider.id
                })
                    .unwrap()
                    .then(getOAuthUrl);
            }
        } else {
            connectProvider({
                integrationProviderId: provider.id
            });
        }
    };

    if (provider.id === PROVIDER_ID.QUICKBOOKS && !isConnected) {
        return (
            <ConnectQBButton
                onClick={onClick}
                isLoading={loading}
            />
        );
    }

    const isLoading = loading || loadingConnect || loadingDisconnect;

    return (
        <Button
            variant={isConnected ? 'outlined' : 'contained'}
            startIcon={isConnected ? undefined : <VectorIcons.Link style={{ fill: '#fff' }} />}
            onClick={onClick}
            disabled={isLoading}
            color={isConnected ? 'error' : 'primary'}
            sx={{ textTransform: 'none' }}
        >
            {isConnected
                ? t(
                    'settings:integrations.details.right_side.form.buttons.disconnect_from_provider',
                    { name: provider.name }
                )
                : t('common:button.connect')}
        </Button>
    );
}
