import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { Stack } from '@mui/material';
import { IntegrationProvider_Category } from '@proto/integrations';
import { useRouter } from 'next/router';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import Loadboard from './Loadboard';

export default function LoadboardContainer() {
    const router = useRouter();
    const {
        hasConnectedLoadboards,
        isLoading
    } =
        IntegrationProviderGrpcService.useGetIntegrationProvidersQuery(
            {},
            {
                selectFromResult: (result) => ({
                    hasConnectedLoadboards: result.data?.integrationProviders
                        .filter((integration) =>
                            integration.categories.includes(IntegrationProvider_Category.Loadboard))
                        .some((integration) => integration.connected),
                    ...result
                })
            }
        );
    const clickErrorScreenHandler = () => {
        router.push('/settings/integrations/');
    };

    if (isLoading) {
        return (
            <Preloader
                sx={{
                    height: '100%',
                    width : '100%'
                }}
            />
        );
    }

    if (!hasConnectedLoadboards) {
        return (
            <Stack
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
            >
                <ErrorScreen
                    configType={ErrorScreenType.LOADBOARD_CONNECT_INTEGRATION}
                    onClick={clickErrorScreenHandler}
                />
            </Stack>
        );
    }

    return <Loadboard />;
}
