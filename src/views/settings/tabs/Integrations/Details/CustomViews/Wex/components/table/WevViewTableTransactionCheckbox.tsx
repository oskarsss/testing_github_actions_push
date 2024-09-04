import { WexTransactionType } from '@proto/integration_provider_wex';
import IntegrationWexGrpcService from '@/@grpcServices/services/integrations-wex.service';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';

type Props = {
    row: WexTransactionType;
};
export default function WevViewTableTransactionCheckbox({ row }: Props) {
    const [updateWexTransactionImport, { isLoading }] =
        IntegrationWexGrpcService.useUpdateWexTransactionTypeMutation();

    const onClick = () => {
        if (isLoading) return;
        updateWexTransactionImport({
            wexTransactionType: {
                tranasctionTypeId: row.tranasctionTypeId,
                autoImport       : !row.autoImport
            }
        });
    };

    return (
        <Checkbox
            onClick={onClick}
            checked={row.autoImport}
        />
    );
}
