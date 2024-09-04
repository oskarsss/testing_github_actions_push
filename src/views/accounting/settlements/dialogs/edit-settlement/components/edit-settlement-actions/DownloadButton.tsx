import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useCallback } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import type SettlementsTypes from '@/store/accounting/settlements/types';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useEditSettlementContext } from '../../EditSettlement';
import ReusableButton from './ReusableButton';

type Props = {
    settlement: SettlementsTypes.CycleSettlementDetails.Settlement;
};

export default function DownloadButton({ settlement }: Props) {
    const { selectedSettlementParams } = useEditSettlementContext();
    const trucks = useTrucksMap();
    const is_truck_exist = !!trucks[settlement.truckId];

    const [downloadPDF, { isLoading }] = SettlementsGrpcService.useDownloadPDFMutation();

    const downloadFile = useDownloadFile();

    const downloadSettlement = useCallback(() => {
        downloadPDF({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: selectedSettlementParams.settlement_id
        })
            .unwrap()
            .then(({
                pdfUrl,
                filename
            }) => {
                downloadFile(pdfUrl, filename);
            })
            .catch((err) => {
                console.error('err', err);
            });
    }, [downloadFile, downloadPDF, selectedSettlementParams]);

    return (
        <ReusableButton
            onClick={downloadSettlement}
            isDisabled={!is_truck_exist}
            isLoading={isLoading}
            label="modals:settlements.edit_settlement.actions.download_pdf.label"
            tooltip="modals:settlements.edit_settlement.actions.download_pdf.tooltip"
            Icon={<DownloadIcon />}
        />
    );
}
