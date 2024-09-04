import ManifestDetailsLoadComponents from '@/views/dispatch/manifests/details/sections/tables/loads/components/ManifestDetailsLoadComponents';
import VectorIcons from '@/@core/icons/vector_icons';
import * as React from 'react';
import { useChooseDocumentTypeMenu } from '@/@core/components/documents/menus/ChooseDocumentType';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import LoadDocuments from '@/@core/ui-kits/loads/load-documents/LoadDocuments';
import { ManifestModel_Load } from '@proto/models/model_manifest';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    load: ManifestModel_Load;
};

export default function ManifestDetailsLoadBodyDocuments({ load }: Props) {
    const chooseDocumentTypeMenu = useChooseDocumentTypeMenu();
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
                downloadFile(fileId, `Load #${load.friendlyId} documents`);
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
        <ManifestDetailsLoadComponents.Body.Wrapper>
            <ManifestDetailsLoadComponents.Body.HeaderContainer>
                <ManifestDetailsLoadComponents.Body.HeaderWrapper>
                    <VectorIcons.FullDialogIcons.DocumentIcon sx={{ fontSize: '24px' }} />
                    <ManifestDetailsLoadComponents.Body.Title>
                        {t('entity:documents')}
                    </ManifestDetailsLoadComponents.Body.Title>
                </ManifestDetailsLoadComponents.Body.HeaderWrapper>
                <ManifestDetailsLoadComponents.Body.HeaderWrapper>
                    <ManifestDetailsLoadComponents.Body.HeaderButton
                        variant="outlined"
                        size="small"
                        startIcon={<VectorIcons.DownloadIcon sx={{ fontSize: '16px' }} />}
                        onClick={onDownloadAllDocuments}
                        disabled={documentsIds.length === 0 || downloadDocumentsState.isLoading}
                    >
                        {t('common:button.all')}
                    </ManifestDetailsLoadComponents.Body.HeaderButton>
                    <ManifestDetailsLoadComponents.Body.HeaderButton
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={onAddDocument}
                        disabled={isLoading}
                        sx={{ ml: '4px' }}
                    >
                        {t('common:button.doc')}
                    </ManifestDetailsLoadComponents.Body.HeaderButton>
                </ManifestDetailsLoadComponents.Body.HeaderWrapper>
            </ManifestDetailsLoadComponents.Body.HeaderContainer>
            <ManifestDetailsLoadComponents.Body.PerfectScrollbar>
                <LoadDocuments
                    loadId={load.loadId}
                    documents={documents}
                    isLoading={isLoading}
                />
            </ManifestDetailsLoadComponents.Body.PerfectScrollbar>
        </ManifestDetailsLoadComponents.Body.Wrapper>
    );
}
