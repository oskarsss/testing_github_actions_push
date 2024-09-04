import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import LeftSide from '@/views/settings/tabs/Integrations/Details/components/Content/components/LeftSide/LeftSide';
import RightSide from '@/views/settings/tabs/Integrations/Details/components/Content/components/RightSide/RightSide';
import { IntegrationProvider } from '@proto/integrations';

type Props = {
    provider: IntegrationProvider;
};

export default function Content({ provider }: Props) {
    return (
        <IntegrationDetailsComponents.Container>
            <LeftSide provider={provider} />
            <RightSide provider={provider} />
        </IntegrationDetailsComponents.Container>
    );
}
