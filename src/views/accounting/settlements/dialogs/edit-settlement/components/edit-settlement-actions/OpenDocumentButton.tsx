import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useCallback } from 'react';
import TabIcon from '@mui/icons-material/Tab';
import { useLazyRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import ReusableButton from './ReusableButton';

export default function OpenDocumentButton() {
    const {
        selectedSettlementParams,
        settlement
    } = useEditSettlementContext();

    const trucks = useTrucksMap();
    const is_truck_exist = !!trucks[settlement.truckId];

    const [downloadPDF, { isLoading }] =
        SettlementsGrpcService.useDownloadPDFWithoutToastMutation();
    const { retrieveFileStream } = useLazyRetrieveFileStream();

    const openSettlementDocument = useCallback(async () => {
        try {
            const { pdfUrl } = await downloadPDF({
                cycleId     : selectedSettlementParams.cycle_id,
                periodId    : selectedSettlementParams.period_id,
                settlementId: selectedSettlementParams.settlement_id
            }).unwrap();

            const response = await retrieveFileStream(pdfUrl);

            window.open(response.blobUrl, '_blank');
        } catch (err) {
            console.error('Error:', err);
        }
    }, [downloadPDF, selectedSettlementParams, retrieveFileStream]);

    return (
        <ReusableButton
            onClick={openSettlementDocument}
            isDisabled={!is_truck_exist}
            isLoading={isLoading}
            label="modals:settlements.edit_settlement.actions.open_document.label"
            tooltip="modals:settlements.edit_settlement.actions.open_document.tooltip"
            Icon={<TabIcon />}
        />
    );
}
