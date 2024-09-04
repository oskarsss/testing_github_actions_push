import { useRef, useCallback, useEffect, useMemo, memo } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { USA_STATES } from '@/configs/states';
import FileContent from '@/@core/components/documents/components/document-content/file-content/FileContent';
import moment from 'moment-timezone';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import debounce from 'lodash/debounce';
import { renderError } from '@/utils/render-error';
import { DocumentModel_Status, DocumentModel_Version } from '@proto/models/model_document';
import {
    useRetrieveFileStream,
    useUploadFiles
} from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import DocumentsComponents from './styled';
import Documents from '../../../../../store/documents/types';
import DocumentActions from './DocumentActions';
import DocumentFields from './DocumentFields';
import { useDocumentsContext } from '../../Documents';
import VersionsChip from './versions-select/VersionsChip';

type FormValues = {
    number: string;
    state: string;
    expires_at: string;
    status: Documents.Status;

    // url: string;
};

function isValidDate(date: string) {
    return !!date && moment(date).isValid();
}

const schema: (doc_type_expirable: boolean) => yup.ObjectSchema<FormValues> = (
    doc_type_expirable
) =>
    yup.object().shape({
        number    : yup.string().defined(),
        state     : yup.string().defined(),
        expires_at: yup
            .string()
            .test('date_is_valid', 'Date is not valid', (value) => {
                if (!doc_type_expirable || !value) return true;
                return moment.utc(value).isValid();
            })
            .test('min_date_test', 'Date is too early', (value) => {
                if (!doc_type_expirable || !value) return true;
                const MIN_VALID_DATE = moment.utc('1960-01-01');
                return moment.utc(value).isSameOrAfter(MIN_VALID_DATE);
            })
            .defined(),
        status: yup.number<Documents.Status>().defined()

        // url   : yup.string().defined()
    });

type Props = {
    document: Documents.ConvertedDocument;
    fileName: string;
    selectedVersion?: DocumentModel_Version;
    setSelectedVersion: (version: DocumentModel_Version) => void;
    isCurrentVersion: boolean;
    versions: DocumentModel_Version[];
    isVersionsFetching: boolean;
};

export const useDocumentForm = () => useFormContext<FormValues>();

const accessFilesArr = ['image/jpeg', 'application/pdf', 'image/png'];

function DocumentContent({
    document,
    fileName,
    selectedVersion,
    setSelectedVersion,
    isCurrentVersion,
    versions,
    isVersionsFetching
}: Props) {
    const [updateDocument, updateDocumentState] = DocumentsGrpcService.useUpdateDocumentMutation();
    const [updateDocumentFile] = DocumentsGrpcService.useDocumentFileUpdateMutation();

    const {
        upload,
        isFileUploading
    } = useUploadFiles();

    const {
        data,
        isLoading
    } = useRetrieveFileStream(selectedVersion?.fileId || document.fileId);

    const {
        entityId,
        entityType
    } = useDocumentsContext();

    const ref = useRef<HTMLDivElement>(null);

    const state_object: string = USA_STATES.reduce((acc, state) => {
        if (state.value === document.state) {
            return state.value;
        }
        return acc;
    }, '');

    const contentRef = useCallback(() => ref.current, [ref.current]);

    const resolver = useMemo(
        () => schema(document.documentType?.expirable || false),
        [document.documentType?.expirable]
    );

    const methods = useForm<FormValues>({
        defaultValues: {
            status    : DocumentModel_Status.DOCUMENT_STATUS_PENDING,
            number    : '',
            state     : '',
            expires_at: ''
        },
        values: {
            status    : document.status,
            number    : document.number || '',
            state     : state_object,
            expires_at: isValidDate(document.expiresAt) ? document.expiresAt : ''
        },
        mode    : 'onChange',
        resolver: yupResolver(resolver)
    });

    const autoSave: SubmitHandler<FormValues> = useCallback(
        (data) => {
            updateDocument({
                entityType,
                entityId,
                documentTypeId: document.documentTypeId,
                number        : data.number,
                state         : data.state,
                expiresAt     : isValidDate(data.expires_at)
                    ? moment.utc(data.expires_at).format('YYYY-MM-DD')
                    : '',
                status: data.status
            }).unwrap();
        },
        [document.documentTypeId, entityId, entityType, updateDocument]
    );

    useEffect(() => {
        if (updateDocumentState.isError && updateDocumentState.error) {
            toast.error(renderError(updateDocumentState.error), {
                position: 'top-right',
                duration: 2500
            });
        }
    }, [updateDocumentState.isError]);

    useEffect(() => {
        const debouncedSave = debounce(autoSave, 1000);
        const subscription = methods.watch(() => {
            methods.handleSubmit(debouncedSave)();
        });
        return () => subscription.unsubscribe();
    }, [autoSave, methods.watch, methods.handleSubmit]);

    const dropzone = useDropzone({
        onDrop: async (files, fileRejection) => {
            if (fileRejection.length) {
                toast.error(fileRejection.map((file) => file.errors[0].message).join('\n'));
                return;
            }
            upload(files, {
                errorTitle: `Could not upload ${
                    document.documentType?.title || ''
                }, please try again later`,
                toastTitle: `Uploading new ${document.documentType?.title}`
            }).then(({ fileId }) => {
                updateDocumentFile({
                    documentTypeId: document.documentTypeId,
                    fileId,
                    entityId,
                    entityType
                });
            });
        },

        validator(file) {
            if (!accessFilesArr.includes(file.type)) {
                return {
                    code   : 'file-type-not-supported',
                    message: 'File type is not supported'
                };
            }

            return null;
        },
        noClick : !!document.fileId,
        disabled: isFileUploading || updateDocumentState.isLoading || !isCurrentVersion
    });
    return (
        <DocumentsComponents.Container>
            <FormProvider {...methods}>
                <DocumentsComponents.Header>
                    <DocumentActions
                        setSelectedVersion={setSelectedVersion}
                        selectedVersion={selectedVersion}
                        mimeType={data.mimeType}
                        versionNumber={selectedVersion?.version}
                        isCurrentVersion={isCurrentVersion}
                        fileId={selectedVersion?.fileId || ''}
                        document_id={document.documentTypeId}
                        document_title={document.documentType?.title || ''}
                        uploadFile={dropzone.open}
                        contentRef={contentRef}
                        file_name={fileName}
                        isUpdating={updateDocumentState.isLoading}
                        document={document}
                        blobUrl={data.blobUrl}
                    />
                    <VersionsChip
                        versions={versions}
                        isCurrentVersion={isCurrentVersion}
                        setSelectedVersion={setSelectedVersion}
                        selectedVersion={selectedVersion}
                    />
                    <DocumentFields
                        isCurrentVersion={isCurrentVersion}
                        document={document}
                        setSelectedVersion={setSelectedVersion}
                        selectedVersion={selectedVersion}
                        noUploadedDocument={
                            selectedVersion ? !selectedVersion.fileId : !document.fileId
                        }
                    />
                </DocumentsComponents.Header>
                <DocumentsComponents.Content ref={ref}>
                    <DocumentsComponents.Dropzone {...dropzone.getRootProps()}>
                        <FileContent
                            isVersionsFetching={isVersionsFetching}
                            isCurrentVersion={isCurrentVersion}
                            fileId={selectedVersion ? selectedVersion.fileId : document.fileId}
                            isDragActive={dropzone.isDragActive}
                            fileName={fileName}
                            open={dropzone.open}
                            isUpdating={isFileUploading}
                            isLoading={isLoading}
                            blobUrl={data.blobUrl}
                            mimeType={data.mimeType}
                        />
                        <input {...dropzone.getInputProps()} />
                    </DocumentsComponents.Dropzone>
                </DocumentsComponents.Content>
            </FormProvider>
        </DocumentsComponents.Container>
    );
}

export default memo(DocumentContent);
