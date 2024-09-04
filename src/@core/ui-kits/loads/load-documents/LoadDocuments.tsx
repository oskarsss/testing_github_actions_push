import React, { useCallback } from 'react';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import LoadDocumentComponents from '@/@core/ui-kits/loads/load-documents/LoadDocumentsComponents';
import DocumentCard from '@/@core/ui-kits/loads/load-documents/components/DocumentCard';
import Documents from '@/store/documents/types';
import { useAppDispatch } from '@/store/hooks';
import { api, invalidateTag } from '@/store/api';
import { Fade, Stack, Tooltip, Typography } from '@mui/material';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { DocumentModel_DocumentEntityType, DocumentModel_Type } from '@proto/models/model_document';
import { useUploadFiles } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import Loading from '@/@core/components/page/Loading';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import createMap from '@/utils/create-map';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import WarningAlert from '../../basic/warning-alert/WarningAlert';

type Props = {
    loadId: string;
    quantityInLine?: number;
    documents: Documents.ConvertedDocument[];
    isLoading: boolean;
};

type MissingDocumentsAlertProps = {
    missingDocuments: DocumentModel_Type[];
    openDocument: (documentTypeId: string) => void;
};

function MissingDocumentsAlert({
    missingDocuments,
    openDocument
}: MissingDocumentsAlertProps) {
    return (
        <Stack
            direction="column"
            gap={2}
        >
            <Typography
                fontSize="12px"
                variant="body1"
                fontWeight={600}
                color="initial"
                sx={{
                    color: '#E3E4EB'
                }}
            >
                You have missing:
            </Typography>
            <Stack
                direction="column"
                gap={1}
            >
                {missingDocuments.map((doc) => (
                    <Stack
                        direction="row"
                        gap={1}
                        alignItems="center"
                    >
                        <Typography
                            key={doc.documentTypeId}
                            fontSize="12px"
                            variant="body1"
                            fontWeight={500}
                            color="initial"
                            onClick={() => openDocument(doc.documentTypeId)}
                            sx={{
                                cursor        : 'pointer',
                                textDecoration: 'underline',
                                color         : '#E3E4EB'
                            }}
                        >
                            - {doc.title}{' '}
                        </Typography>
                        <Stack
                            component="span"
                            flexDirection="row"
                            alignItems="center"
                            gap="2px"
                            fontWeight={400}
                            fontSize="13px"
                            color="#E3E4EB"
                            width="14px"
                            height="14px"
                            padding="0px 2px"
                            borderRadius="4px"
                            sx={{
                                backgroundColor: '#575868'
                            }}
                        >
                            <UploadFileIcon
                                sx={(theme) => ({
                                    color : '#E3E4EB',
                                    width : '12px',
                                    height: '12px'
                                })}
                            />
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}

export const useMissingLoadDocuments = (documents: Documents.ConvertedDocument[]) => {
    const { requiredTypes } = DocumentTypesGrpcServices.useGetDocumentTypesQuery(
        {},
        {
            selectFromResult: (result) => {
                const requiredTypes =
                    result.data?.documentTypes.filter(
                        (type) =>
                            type.required &&
                            type.entityType === DocumentModel_DocumentEntityType.LOAD &&
                            !type.deleted
                    ) || [];

                return {
                    requiredTypes
                };
            }
        }
    );

    const documentsMap = createMap(documents, 'documentTypeId');

    const missingDocuments = requiredTypes.filter((type) => {
        if (!documentsMap[type.documentTypeId] || !documentsMap[type.documentTypeId].fileId) {
            return true;
        }
        return false;
    });

    return missingDocuments;
};

function LoadDocuments({
    loadId,
    quantityInLine = 3,
    documents,
    isLoading
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const editLoadDialog = useEditLoadDialog();

    const [updateDocument] = DocumentsGrpcService.useDocumentFileUpdateMutation();

    const missingDocuments = useMissingLoadDocuments(documents);

    const openDocument = (document_type_id: string) => {
        editLoadDialog.open({
            load_id    : loadId,
            document_id: document_type_id
        });
    };

    const { upload } = useUploadFiles();

    const uploadDocument = useCallback(
        async (files: File[], document: Documents.ConvertedDocument) => {
            try {
                const response = await upload(files, {
                    toastTitle: t('core:basic.load.documents.uploading', {
                        title: document.documentType?.title || ''
                    })
                });

                await updateDocument({
                    documentTypeId: document.documentTypeId,
                    entityId      : loadId,
                    entityType    : DocumentModel_DocumentEntityType.LOAD,
                    fileId        : response.fileId
                }).unwrap();

                dispatch(api.util?.invalidateTags(invalidateTag({}, 'load', loadId)));
            } catch (error) {
                console.error('Error uploading document', error);
            }
        },
        [dispatch, loadId, updateDocument, upload]
    );

    if (isLoading) {
        return <Loading />;
    }

    if (!documents.length) {
        return (
            <Typography
                variant="body2"
                textAlign="center"
            >
                {t('core:basic.load.documents.empty_text')}
            </Typography>
        );
    }

    return (
        <Fade in>
            <Stack
                direction="column"
                gap={2}
            >
                {missingDocuments.length > 0 && (
                    <Tooltip
                        placement="top"
                        title={(
                            <MissingDocumentsAlert
                                missingDocuments={missingDocuments}
                                openDocument={openDocument}
                            />
                        )}
                        slotProps={{
                            tooltip: {
                                sx: {
                                    backgroundColor: '#414452'
                                }
                            },
                            popper: {
                                sx: {
                                    zIndex: 1000
                                }
                            }
                        }}
                    >
                        <div>
                            <WarningAlert
                                color="error"
                                sx={{
                                    cursor: 'pointer'
                                }}
                                text={`You have missing ${missingDocuments.length} required ${
                                    missingDocuments.length === 1 ? 'document' : 'documents'
                                }!`}
                            />
                        </div>
                    </Tooltip>
                )}

                <LoadDocumentComponents.Container quantityInLine={quantityInLine}>
                    {documents.map((document) => (
                        <DocumentCard
                            entityId={loadId}
                            key={document.documentTypeId}
                            document={document}
                            uploadDocument={uploadDocument}
                            openDocument={openDocument}
                        />
                    ))}
                </LoadDocumentComponents.Container>
            </Stack>
        </Fade>
    );
}

export default React.memo(LoadDocuments);
