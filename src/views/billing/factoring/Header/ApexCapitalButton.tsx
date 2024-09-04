import { Button } from '@mui/material';
import { useApexCapitalDialog } from '@/views/billing/factoring/dialogs/apex-capital/ApexCapitalDialog';
import { IntegrationProvider } from '@proto/integrations';
import withIntegrationProvider from '@/views/settings/tabs/Integrations/components/withIntegrationProvider';
import ProviderLogo from '@/views/settings/tabs/Integrations/components/ProviderLogo';

const ApexCapitalButton = withIntegrationProvider(ApexCapitalButtonComponent, 'APEX_CAPITAL');

type Props = {
    provider: IntegrationProvider;
};

function ApexCapitalButtonComponent({ provider }: Props) {
    const apexCapitalDialog = useApexCapitalDialog();

    const openDialog = () =>
        apexCapitalDialog.open({
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

export default ApexCapitalButton;
