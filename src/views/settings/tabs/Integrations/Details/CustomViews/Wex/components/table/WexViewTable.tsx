import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { columns } from '@/views/settings/tabs/Integrations/Details/CustomViews/Wex/components/table/columns';
import IntegrationWexGrpcService from '@/@grpcServices/services/integrations-wex.service';
import { useStableArray } from '@/hooks/useStable';
import { Fade, Stack } from '@mui/material';

export default function WexViewTable() {
    const {
        data,
        isLoading
    } = IntegrationWexGrpcService.useGetWexTransactionTypesQuery({});

    const rows = useStableArray(data?.wexTransactionTypes);

    return (
        <Fade
            in
            timeout={500}
        >
            <Stack
                overflow="hidden"
                height="100%"
            >
                <IntegrationDetailsTable
                    columns={columns}
                    loading={isLoading}
                    items={rows}
                    keyField="tranasctionTypeId"
                    onClickRow={() => {}}
                />
            </Stack>
        </Fade>
    );
}
