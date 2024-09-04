import { useEffect, useMemo, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Divider, Stack, Typography } from '@mui/material';
import DownloadDialogContainer from '@/@core/components/documents/dialogs/DownloadDocuments/components/DownloadDialogContainer';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import Documents from '@/store/documents/types';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import DialogComponents from '../../../../ui-kits/common-dialog';

type FormValues = {
    [key: string]: boolean;
};

type Props = {
    documents: Documents.ConvertedDocument[];
    title: string;
    onClose?: () => void;
    entity_id: string;
    entity_type: DocumentModel_DocumentEntityType;
};

export const useDownloadDocumentsDialog = hookFabric(DownloadDocumentsDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        {...props}
    />
));

export default function DownloadDocumentsDialog({
    documents,
    title,
    onClose,
    entity_id,
    entity_type
}: Props) {
    const { t } = useAppTranslation();
    const downloadFile = useDownloadFile();
    const downloadDialog = useDownloadDocumentsDialog(true);
    const [isAllDocumentsSelected, setIsAllDocumentsSelected] = useState(false);

    const [downloadDocuments, { isLoading }] = DocumentsGrpcService.useDownloadDocumentsMutation();

    const defaultValues = useMemo(
        () =>
            documents.reduce((acc, doc) => {
                if (!doc.fileId) return acc;
                acc[String(doc.documentTypeId)] = false;
                return acc;
            }, {} as FormValues),
        [documents]
    );

    const {
        control,
        handleSubmit,
        setValue,
        formState: {
            errors,
            isDirty
        }
    } = useForm<FormValues>({
        defaultValues
    });

    useEffect(() => {
        Object.keys(defaultValues).forEach((key) => {
            setValue(key, isAllDocumentsSelected);
        });
    }, [isAllDocumentsSelected, defaultValues]);

    const submit = (data: FormValues) => {
        const documentTypeIds = Object.keys(data).reduce((acc, key) => {
            if (data[key]) {
                acc.push(key);
            }
            return acc;
        }, [] as string[]);

        downloadDocuments({
            documentTypeIds,
            entityId        : entity_id,
            entityType      : entity_type,
            onlyLastVersions: true

            // documentTypeIds,
            // entityId  : entity_id,
            // entityType: entity_type
        })
            .unwrap()
            .then((res) => {
                downloadFile(res.fileId, `documents_${title}`);
                (onClose || downloadDialog.close)();
            });
    };

    const filesToDownload = useMemo(() => documents.filter((file) => !!file.fileId), [documents]);
    const noLoadedFiles = useMemo(() => documents.filter((file) => !file.fileId), [documents]);

    const selectAllDocuments = (e: ChangeEvent<HTMLInputElement>) => {
        setIsAllDocumentsSelected(e.target.checked);
    };

    return (
        <DownloadDialogContainer
            title={title}
            onSubmit={handleSubmit(submit)}
            onCancel={onClose || downloadDialog.close}
            submitLoading={isLoading}
            submitDisabled={filesToDownload.length === 0 || !isDirty}
        >
            {filesToDownload.length !== 0 && (
                <DialogComponents.Fields rowSpacing={1}>
                    {filesToDownload.length > 1 && (
                        <>
                            <DialogComponents.Field xs={12}>
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={isAllDocumentsSelected}
                                            onChange={selectAllDocuments}
                                        />
                                    )}
                                    label={t('common:all')}
                                    sx={{ margin: 0, gap: '6px' }}
                                />
                            </DialogComponents.Field>
                            <Divider
                                sx={{ width: 'calc(100% - 20px)', margin: '0.25rem 0 0 20px' }}
                            />
                        </>
                    )}
                    {filesToDownload.map((doc) => (
                        <DialogComponents.Field
                            xs={12}
                            key={doc.documentTypeId}
                        >
                            <CheckboxInput
                                name={String(doc.documentTypeId)}
                                label={<span>{doc.documentType?.title || ''}</span>}
                                control={control}
                                disabled={!doc.fileId}
                                errors={errors}
                            />
                        </DialogComponents.Field>
                    ))}
                </DialogComponents.Fields>
            )}

            {noLoadedFiles.length !== 0 && (
                <>
                    <Typography
                        marginTop="20px"
                        fontWeight={600}
                        fontSize={16}
                        color="semantic.text.secondary"
                    >
                        {t('core:documents.not_loaded_files')}
                    </Typography>
                    <Divider sx={{ width: '100%' }} />
                    <Stack gap="16px">
                        {noLoadedFiles.map((file) => (
                            <Typography
                                key={file.documentTypeId}
                                fontSize={16}
                                fontWeight={500}
                                color="semantic.text.secondary"
                            >
                                {file.documentType?.title || ''}
                            </Typography>
                        ))}
                    </Stack>
                </>
            )}
        </DownloadDialogContainer>
    );
}
