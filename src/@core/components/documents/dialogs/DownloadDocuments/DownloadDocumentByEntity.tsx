/* eslint-disable react/destructuring-assignment */
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DownloadDocumentsEmptyScreen from '@/@core/components/documents/dialogs/DownloadDocuments/components/DownloadDocumentsEmptyScreen';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import DialogComponents from '../../../../ui-kits/common-dialog';
import DownloadDocumentsDialog from './DownloadDocumentsDialog';

type Props = {
    openEditDialog: () => void;
    entity_id: string;
    entity_type: DocumentModel_DocumentEntityType;
};

export const LOCALE_DOCUMENT_ENTITY_TYPE: Record<DocumentModel_DocumentEntityType, string> = {
    [DocumentModel_DocumentEntityType.TRAILER_COMPANY] : 'Trailer Company',
    [DocumentModel_DocumentEntityType.TRAILER]         : 'Trailer',
    [DocumentModel_DocumentEntityType.TRUCK]           : 'Truck',
    [DocumentModel_DocumentEntityType.BROKER]          : 'Broker',
    [DocumentModel_DocumentEntityType.LOAD]            : 'Load',
    [DocumentModel_DocumentEntityType.CUSTOMER]        : 'Customer',
    [DocumentModel_DocumentEntityType.VENDOR]          : 'Vendor',
    [DocumentModel_DocumentEntityType.DRIVER]          : 'Driver',
    [DocumentModel_DocumentEntityType.COMPANY]         : 'Company',
    [DocumentModel_DocumentEntityType.PLATE_COMPANY]   : 'Plate Company',
    [DocumentModel_DocumentEntityType.LOAN]            : 'Loan',
    [DocumentModel_DocumentEntityType.PLATE]           : 'Plate',
    [DocumentModel_DocumentEntityType.UNSPECIFIED]     : 'Unspecified',
    [DocumentModel_DocumentEntityType.VEHICLE_WARRANTY]: 'Vehicle Warranty',
    [DocumentModel_DocumentEntityType.SERVICE_LOG]     : 'Service Log'
};

export const useDownloadDocumentByEntityDialog = hookFabric(
    DownloadDocumentByEntity,
    DialogComponents.DialogWrapper
);

const MIN_HEIGHT = 250;

export default function DownloadDocumentByEntity({
    openEditDialog,
    entity_id,
    entity_type
}: Props) {
    const dialog = useDownloadDocumentByEntityDialog(true);
    const {
        data,
        isError,
        isLoading,
        isSuccess,
        documents
    } = useGetDocumentsByEntityType({
        entityId  : entity_id,
        entityType: entity_type
    });

    if (isError) {
        return (
            <DialogComponents.FailedFetching
                style={{
                    height: MIN_HEIGHT
                }}
            />
        );
    }

    if (isLoading || !isSuccess) {
        return (
            <DialogComponents.FetchingProcess
                style={{
                    height: MIN_HEIGHT
                }}
            />
        );
    }

    if (!documents.length) {
        const handleClick = () => dialog.close().then(openEditDialog);

        return (
            <DownloadDocumentsEmptyScreen
                buttonText={LOCALE_DOCUMENT_ENTITY_TYPE[entity_type]}
                onClick={handleClick}
            />
        );
    }

    return (
        <DownloadDocumentsDialog
            entity_id={entity_id}
            entity_type={entity_type}
            documents={documents}
            title={LOCALE_DOCUMENT_ENTITY_TYPE[entity_type]}
            onClose={dialog.close}
        />
    );
}
