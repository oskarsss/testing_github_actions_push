import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { useDocumentsContext } from '../../../Documents';

type Props = {
    document_title: string;
    documentTypeId: string;
    hidden?: boolean;
};

export default function DocumentClearButton({
    document_title,
    documentTypeId,
    hidden
}: Props) {
    const [clearFile] = DocumentsGrpcService.useDocumentClearFileMutation();
    const confirm = useConfirm();
    const {
        entityId,
        entityType
    } = useDocumentsContext();

    const clearDocument = () => {
        clearFile({
            documentTypeId,
            entityId,
            entityType
        });
    };

    const onClearDocument = () => {
        confirm({
            title             : 'core:documents.clear_document_confirm.title',
            body              : 'core:documents.clear_document_confirm.body',
            confirm_text      : 'common:button.clear',
            onConfirm         : clearDocument,
            translationOptions: {
                title: { title: document_title },
                body : { title: document_title }
            }
        });
    };

    if (hidden) return null;

    return (
        <IconButtonWithTooltip
            tooltip="core:documents.tooltips.clear_document"
            onClick={onClearDocument}
            icon={<RemoveCircleIcon color="primary" />}
        />
    );
}
