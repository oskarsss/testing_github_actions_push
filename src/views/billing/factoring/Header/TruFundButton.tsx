import { Button } from '@mui/material';
import { useTruFundDialog } from '@/views/billing/factoring/dialogs/tru-fund/TruFundDialog';
import withIntegrationProvider from '@/views/settings/tabs/Integrations/components/withIntegrationProvider';
import { IntegrationProvider } from '@proto/integrations';
import ProviderLogo from '@/views/settings/tabs/Integrations/components/ProviderLogo';

const TruFundButton = withIntegrationProvider(TruFundButtonComponent, 'TRUFUNDING');

type Props = {
    provider: IntegrationProvider;
};

function TruFundButtonComponent({ provider }: Props) {
    const dialog = useTruFundDialog();

    const openDialog = () =>
        dialog.open({
            providerName: provider.name
        });

    return (
        <Button
            variant="outlined"
            sx={{
                height      : '40px',
                padding     : '4px 12px',
                borderRadius: '4px',
                borderColor : (theme) => theme.palette.semantic.foreground.brand.primary
            }}
            onClick={openDialog}
        >
            <ProviderLogo
                style={{ width: '52px' }}
                srcLightMode={provider.darkLogoUrl}
                srcDarkMode={provider.lightLogoUrl}
            />
        </Button>
    );
}

export default TruFundButton;
