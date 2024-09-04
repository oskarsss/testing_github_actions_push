import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { IntegrationProvider } from '@proto/integrations';
import QuickbooksView from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/QuickbooksView';
import FleetManage from '@/views/settings/tabs/Integrations/Details/components/Content/components/RightSide/components/FleetManage';
import Form from '@/views/settings/tabs/Integrations/Details/components/Content/components/RightSide/components/Form/Form';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import ApexCapitalView from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/ApexCapitalView';
import { Stack } from '@mui/material';
import WexView from '@/views/settings/tabs/Integrations/Details/CustomViews/Wex/WexView';

type Props = {
    provider: IntegrationProvider;
};

export default function RightSide({ provider }: Props) {
    return (
        <Stack
            gap="inherit"
            width="100%"
            height="100%"
            overflow="hidden"
        >
            {provider.id === PROVIDER_ID.QUICKBOOKS && (
                <IntegrationDetailsComponents.Right.CustomWrapper>
                    <QuickbooksView />
                </IntegrationDetailsComponents.Right.CustomWrapper>
            )}
            {provider.id === PROVIDER_ID.APEX_CAPITAL && (
                <IntegrationDetailsComponents.Right.CustomWrapper>
                    <ApexCapitalView />
                </IntegrationDetailsComponents.Right.CustomWrapper>
            )}

            <IntegrationDetailsComponents.Right.Wrapper>
                <Form provider={provider} />
                <FleetManage provider={provider} />
            </IntegrationDetailsComponents.Right.Wrapper>

            {provider.id === PROVIDER_ID.FLEET_ONE_WEX && (
                <IntegrationDetailsComponents.Right.CustomWrapper>
                    <WexView provider={provider} />
                </IntegrationDetailsComponents.Right.CustomWrapper>
            )}
        </Stack>
    );
}
