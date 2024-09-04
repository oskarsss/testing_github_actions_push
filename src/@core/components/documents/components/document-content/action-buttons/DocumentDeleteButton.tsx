import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDocumentsContext } from '../../../Documents';

type Props = {
    document_id: string;
    document_title: string;
};

export default function DocumentDeleteButton({
    document_id,
    document_title
}: Props) {
    const confirm = useConfirm();
    const [deleteDocument] = DocumentsGrpcService.useDeleteDocumentMutation();
    const [removeFile] = StorageGrpcService.useDeleteFileMutation();
    const { t } = useAppTranslation('core');

    const {
        entityId,
        entityType
    } = useDocumentsContext();

    const handleDeleteDocument = () => {
        deleteDocument({
            entityId,
            entityType,
            documentTypeId: document_id
        }).unwrap();
    };

    const onDeleteDocument = () => {
        confirm({
            title: (
                <span>
                    {t('documents.delete_document_confirm.title', { title: document_title })}
                </span>
            ),
            body: (
                <span>
                    {t('documents.delete_document_confirm.body', { title: document_title })}
                </span>
            ),
            confirm_text: 'common:button.delete',
            onConfirm   : handleDeleteDocument
        });
    };
    return (
        <IconButtonWithTooltip
            tooltip="core:documents.tooltips.delete_document"
            onClick={onDeleteDocument}
            icon={<DeleteIcon color="primary" />}
        />
    );
}
