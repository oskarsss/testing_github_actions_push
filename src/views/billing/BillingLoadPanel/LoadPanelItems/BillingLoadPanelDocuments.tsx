import BillingLoadPanelComponents from '@/views/billing/BillingLoadPanel/BillingLoadPanelComponents';
import VectorIcons from '@/@core/icons/vector_icons';
import { Divider, Stack } from '@mui/material';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import LoadDocuments from '@/@core/ui-kits/loads/load-documents/LoadDocuments';
import * as React from 'react';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import LoadDocumentsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-documents/LoadDocuments.styled';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { useChooseDocumentTypeMenu } from '@/@core/components/documents/menus/ChooseDocumentType';
import { useDownloadFile } from '@/hooks/useDownloadFile';

type Props = {
    loadId: string;
    loadFriendlyId?: string | number;
};

function BillingLoadPanelDocuments({
    loadId,
    loadFriendlyId = ''
}: Props) {
    const chooseDocumentTypeMenu = useChooseDocumentTypeMenu();
    const { t } = useAppTranslation();
    const downloadFile = useDownloadFile();

    const {
        documents,
        isLoading
    } = useGetDocumentsByEntityType({
        entityId  : loadId,
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
            entityId        : loadId,
            entityType      : DocumentModel_DocumentEntityType.LOAD,
            onlyLastVersions: true
        })
            .unwrap()
            .then(({ fileId }) => {
                downloadFile(fileId, `Load #${loadFriendlyId} documents`);
            });
    };

    const onAddDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
        chooseDocumentTypeMenu.open({
            entity_id             : loadId,
            entity_type           : DocumentModel_DocumentEntityType.LOAD,
            exclude_document_types: documents.map((doc) => doc.documentTypeId)
        })(e);
    };

    return (
        <BillingLoadPanelComponents.Card.Container
            style={{
                borderRadius: 0,
                padding     : '18px 12px 12px 12px'
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <BillingLoadPanelComponents.Card.Title
                    title={t('billing:panel.title.documents')}
                    icon={<VectorIcons.FullDialogIcons.DocumentIcon />}
                />
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="4px"
                >
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
                </Stack>
            </Stack>
            <Divider sx={{ margin: '18px 0px 12px 0px' }} />
            <Stack
                overflow="hidden"
                maxHeight="460px"
                marginRight="-12px"
            >
                <PerfectScrollbar
                    style={{
                        paddingRight: '12px'
                    }}
                    options={{
                        wheelPropagation: true,
                        suppressScrollX : true
                    }}
                >
                    <LoadDocuments
                        loadId={loadId}
                        documents={documents}
                        isLoading={isLoading}
                        quantityInLine={2}
                    />
                </PerfectScrollbar>
            </Stack>
        </BillingLoadPanelComponents.Card.Container>
    );
}

export default React.memo(BillingLoadPanelDocuments);
