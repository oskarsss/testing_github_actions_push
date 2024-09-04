import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import CropIcon from '@mui/icons-material/Crop';

import 'react-image-crop/dist/ReactCrop.css';
import { useCropImageDialog } from '@/@core/components/crop-image-dialog/CropImageDialog';
import { useDocumentsContext } from '@/@core/components/documents/Documents';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { useUploadFiles } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';

type Props = {
    blobUrl: string;
    hidden?: boolean;
};

export default function DocumentImageCropButton({
    blobUrl,
    hidden
}: Props) {
    const [updateDocumentFile] = DocumentsGrpcService.useDocumentFileUpdateMutation();
    const cropImageDialog = useCropImageDialog();
    const { upload } = useUploadFiles();

    const {
        entityId,
        entityType,
        selectedDocument
    } = useDocumentsContext();

    if (hidden) return null;

    const onCropSubmit = async (file: File) => {
        try {
            const response = await upload([file]);
            if (!selectedDocument) return;
            await updateDocumentFile({
                documentTypeId: selectedDocument.documentTypeId,
                fileId        : response.fileId,
                entityId,
                entityType
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onOpenCropDialog = () => {
        cropImageDialog.open({
            blobUrl,
            onCropSubmit
        });
    };

    return (
        <IconButtonWithTooltip
            tooltip="core:documents.tooltips.crop"
            disabled={!blobUrl}
            onClick={onOpenCropDialog}
            icon={<CropIcon color="primary" />}
        />
    );
}
