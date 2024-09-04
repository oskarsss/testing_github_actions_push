import LoadDocuments from '@/@core/ui-kits/loads/load-documents/LoadDocuments';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import LoadDocumentsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-documents/LoadDocuments.styled';
import LoadDetailsViewStyled from '@/views/dispatch/orders/Details/LoadDetailsView.styled';
import VectorIcons from '@/@core/icons/vector_icons';
import * as React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { useChooseDocumentTypeMenu } from '@/@core/components/documents/menus/ChooseDocumentType';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useRouter } from 'next/router';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import { LoadData_Load } from '@proto/loads';

type Props = {
    load: LoadData_Load;
};

function LoadDocumentsTab({ load }: Props) {
    const chooseDocumentTypeMenu = useChooseDocumentTypeMenu();
    const isLoadNewPage = useRouter().pathname === `${APP_ROUTES_CONFIG.dispatch.orders.path}/[id]`;
    const { t } = useAppTranslation();
    const downloadFile = useDownloadFile();
    const {
        documents,
        isLoading
    } = useGetDocumentsByEntityType({
        entityId  : load.loadId,
        entityType: DocumentModel_DocumentEntityType.LOAD
    });

    const documentsIds = documents
        .filter((doc) => doc.fileId)
        .map((document) => document.documentTypeId);

    const [downloadDocuments, downloadDocumentsState] =
        DocumentsGrpcService.useDownloadDocumentsMutation();

    const onDownloadAllDocuments = () => {
        downloadDocuments({
            documentTypeIds : documentsIds,
            entityId        : load.loadId,
            entityType      : DocumentModel_DocumentEntityType.LOAD,
            onlyLastVersions: true
        })
            .unwrap()
            .then(({ fileId }) => {
                downloadFile(fileId, `Load #${load.referenceId} documents`);
            });
    };

    const onAddDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
        chooseDocumentTypeMenu.open({
            entity_id             : load.loadId,
            entity_type           : DocumentModel_DocumentEntityType.LOAD,
            exclude_document_types: documents.map((doc) => doc.documentTypeId)
        })(e);
    };

    return (
        <LoadDocumentsStyled.Container>
            <LoadDocumentsStyled.HeaderContainer>
                <LoadDocumentsStyled.HeaderWrapper>
                    <VectorIcons.FullDialogIcons.DocumentIcon sx={{ fontSize: '24px' }} />
                    <LoadDetailsViewStyled.Title style={{ fontSize: '16px' }}>
                        {t('loads:details.tabs.labels.documents')}
                    </LoadDetailsViewStyled.Title>
                </LoadDocumentsStyled.HeaderWrapper>
                <LoadDocumentsStyled.HeaderWrapper>
                    <LoadDocumentsStyled.Button
                        variant="outlined"
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={onDownloadAllDocuments}
                        disabled={documentsIds.length === 0 || downloadDocumentsState.isLoading}
                    >
                        {t('common:button.all')}
                    </LoadDocumentsStyled.Button>
                    <LoadDocumentsStyled.Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={onAddDocument}
                        disabled={isLoading}
                    >
                        {t('common:button.doc')}
                    </LoadDocumentsStyled.Button>
                </LoadDocumentsStyled.HeaderWrapper>
            </LoadDocumentsStyled.HeaderContainer>
            <LoadDocuments
                loadId={load.loadId}
                documents={documents}
                isLoading={isLoading}
                quantityInLine={isLoadNewPage ? 4 : 3}
            />
        </LoadDocumentsStyled.Container>
    );
}

export default React.memo(LoadDocumentsTab);
