import FullDialog from '@/@core/ui-kits/full-dialog';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import OpenDocumentButton from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-actions/OpenDocumentButton';
import DownloadButton from './edit-settlement-actions/DownloadButton';
import SendSettlementButton from './edit-settlement-actions/SendSettlementButton';
import SyncButton from './edit-settlement-actions/SyncButton';

export default function EditSettlementActions() {
    const { settlement } = useEditSettlementContext();

    return (
        <FullDialog.ActionsWrapper
            sx={{
                minHeight: '54px'
            }}
        >
            <SyncButton settlement_id={settlement.settlementId} />
            <OpenDocumentButton />
            <DownloadButton settlement={settlement} />
            <SendSettlementButton settlement={settlement} />
        </FullDialog.ActionsWrapper>
    );
}
