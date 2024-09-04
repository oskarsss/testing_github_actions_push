import { IntegrationProvider } from '@proto/integrations';
import { Stack } from '@mui/material';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import WexViewTable from '@/views/settings/tabs/Integrations/Details/CustomViews/Wex/components/table/WexViewTable';
import WexViewEmpty from '@/views/settings/tabs/Integrations/Details/CustomViews/Wex/components/WexViewEmpty';

type Props = {
    provider: IntegrationProvider;
};

export default function WexView({ provider }: Props) {
    const fieldAutoImportTransactions = provider.fields.find(
        (field) => field.fieldId === 'auto_import_all_transactions'
    );
    return (
        <Stack
            overflow="hidden"
            gap="16px"
            height="100%"
        >
            <IntegrationDetailsComponents.Right.Title>
                Import Transactions
            </IntegrationDetailsComponents.Right.Title>
            {fieldAutoImportTransactions?.value === 'true' ? <WexViewEmpty /> : <WexViewTable />}
        </Stack>
    );
}
