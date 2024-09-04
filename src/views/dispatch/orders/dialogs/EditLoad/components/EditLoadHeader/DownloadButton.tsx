import { useDownloadFile } from '@/hooks/useDownloadFile';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useCallback } from 'react';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';

type Props = {
    loadId: string;
    loadFriendlyId?: string | number;
};

export default function DownloadButton({
    loadId,
    loadFriendlyId
}: Props) {
    const [download, { isLoading }] = LoadsGrpcService.useDownloadLoadInvoiceMutation();

    const downloadFile = useDownloadFile();

    const downloadInvoice = useCallback(() => {
        download({ loadId })
            .unwrap()
            .then(({ filePath }) => {
                downloadFile(filePath, `load_#${loadFriendlyId || loadId}_invoice`);
            });
    }, [download, downloadFile, loadFriendlyId, loadId]);

    return (
        <FullDialog.DownloadButton
            variant="contained"
            isLoading={isLoading}
            onDownload={downloadInvoice}
            text="modals:loads.edit_load.buttons.download_invoice"
        />
    );
}
