/* eslint-disable max-len */

import VectorIcons from '@/@core/icons/vector_icons';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TabContext, TabPanel } from '@mui/lab';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { memo, useCallback, useEffect, useState } from 'react';
import { DocumentModel_DocumentEntityType, DocumentModel_Type } from '@proto/models/model_document';
import { useConvertDocument } from '@/utils/transform-grpc-document';
import Documents from '@/store/documents/types';
import PageTabs, { PageTabsChangeAction } from '@/@core/ui-kits/basic/page-tabs/PageTabs';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import SendSettlementRightSideDocument from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-right-side/SendSettlementRightSideDocument';
import createMap from '@/utils/create-map';
import { useTranslation } from 'react-i18next';
import Fade from '@mui/material/Fade';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import PDFContent from '@/@core/ui-kits/basic/pdf-content/PDFContent';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useLazyRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';

interface DocumentWithEntityId extends Documents.ConvertedDocument {
    entityId: string;
}

type Props = {
    loadIds?: string[];
    documentTypes: DocumentModel_Type[];
    settlementId: string;
    cycleId: string;
    periodId: string;
};

function SendSettlementRightSide({
    loadIds,
    documentTypes,
    settlementId,
    cycleId,
    periodId
}: Props) {
    const { t } = useTranslation();
    const [documents, setDocuments] = useState<DocumentWithEntityId[]>([]);
    const [selectedDocumentId, selectDocumentId] = useState('default');
    const [settlementPdfBlobUrl, setSettlementPdfBlobUrl] = useState<string>('');
    const [settlementPdfLoading, setSettlementPdfLoading] = useState<boolean>(false);

    const [downloadPDF] = SettlementsGrpcService.useDownloadPDFWithoutToastMutation();
    const { retrieveFileStream } = useLazyRetrieveFileStream();

    const openSettlementDocument = useCallback(
        async (settlementId = '', cycleId = '', periodId = '') => {
            setSettlementPdfLoading(true);
            try {
                const { pdfUrl } = await downloadPDF({
                    cycleId,
                    periodId,
                    settlementId
                }).unwrap();

                const response = await retrieveFileStream(pdfUrl);
                setSettlementPdfBlobUrl(response.blobUrl);
            } catch (err) {
                console.error('Error:', err);
            }
            setSettlementPdfLoading(false);
        },
        [downloadPDF, retrieveFileStream]
    );

    useEffect(() => {
        openSettlementDocument(settlementId, cycleId, periodId);
    }, [cycleId, openSettlementDocument, periodId, settlementId]);

    const [getDocuments, { isLoading }] = DocumentsGrpcService.useLazyGetDocumentsByEntityQuery();
    const { converter } = useConvertDocument();

    function generateId(documentTypeId: string, fileId: string) {
        return `${documentTypeId}_${fileId}`;
    }

    useEffect(() => {
        if (!loadIds || !loadIds.length) return;

        const promises = loadIds.map((loadId) =>
            getDocuments({ entityId: loadId, entityType: DocumentModel_DocumentEntityType.LOAD })
                .unwrap()
                .then((response) => response.documents));

        Promise.all(promises)
            .then((results) => {
                const documentIds = createMap(documentTypes, 'documentTypeId');
                const documents = results
                    .map((documents, index) =>
                        documents
                            .filter((doc) => doc.documentTypeId in documentIds)
                            .map((document) => {
                                const documentContent = converter(document);
                                return {
                                    ...documentContent,
                                    entityId: loadIds[index]
                                };
                            }))
                    .flat();

                setDocuments(documents);
            })
            .catch((error) => {
                console.error('Error fetching documents:', error);
            });
    }, [converter, getDocuments, loadIds, documentTypes.length]);

    const handleChangeTab: PageTabsChangeAction<string> = (_, newValue) => {
        selectDocumentId(newValue);
    };

    const loading = settlementPdfLoading || isLoading;

    return (
        <>
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="8px"
            >
                <VectorIcons.FullDialogIcons.DocumentPreviewIcon color="primary" />
                <Typography
                    fontSize="16px"
                    fontWeight={600}
                    lineHeight={1.4}
                >
                    {t('modals:settlements.send_settlement.titles.documents_preview')}
                </Typography>
            </Stack>
            {!documents.length && !settlementPdfBlobUrl && !loading && (
                <ErrorScreen
                    configType={ErrorScreenType.SEND_SETTLEMENT}
                    withoutBackground
                    withoutBorder
                />
            )}
            {loadIds && (settlementPdfBlobUrl || !!documents.length) && !loading && (
                <TabContext value={selectedDocumentId}>
                    <Fade in>
                        <div style={{ margin: '4px 0px 12px 0px', overflow: 'hidden' }}>
                            <PageTabs
                                value={selectedDocumentId}
                                onChange={handleChangeTab}
                                isScrollable
                                showScrollBar
                            >
                                {settlementPdfBlobUrl && (
                                    <PageTab
                                        value="default"
                                        label={t('entity:settlement')}
                                        sx={{
                                            textWrap: 'nowrap'
                                        }}
                                    />
                                )}
                                {documents.map((document) => (
                                    <PageTab
                                        key={generateId(document.documentTypeId, document.entityId)}
                                        value={generateId(
                                            document.documentTypeId,
                                            document.entityId
                                        )}
                                        label={document.documentType?.title}
                                        sx={{
                                            textWrap: 'nowrap'
                                        }}
                                    />
                                ))}
                            </PageTabs>
                        </div>
                    </Fade>
                    {settlementPdfBlobUrl && (
                        <TabPanel
                            value="default"
                            sx={{
                                padding : 0,
                                overflow: 'hidden',
                                flexGrow: 1
                            }}
                        >
                            <PDFContent
                                blobUrl={settlementPdfBlobUrl}
                                fileName="Settlement"
                            />
                        </TabPanel>
                    )}
                    {documents.map((document) => (
                        <TabPanel
                            key={generateId(document.documentTypeId, document.entityId)}
                            value={generateId(document.documentTypeId, document.entityId)}
                            sx={{
                                padding : 0,
                                overflow: 'hidden',
                                flexGrow: 1
                            }}
                        >
                            <SendSettlementRightSideDocument
                                documentName={document.documentType?.title || ''}
                                fileId={document.fileId}
                            />
                        </TabPanel>
                    ))}
                </TabContext>
            )}
            {loading && <Preloader />}
        </>
    );
}

export default memo(SendSettlementRightSide);
