import StateSelect from '@/@core/fields/select/StateSelect';
import DateInput from '@/@core/fields/inputs/DateInput';
import type Documents from '@/store/documents/types';
import DocumentStatusSelect from '@/@core/fields/select/DocumentStatusSelect';
import { DocumentModel_Version } from '@proto/models/model_document';
import TextInput from '../../../../fields/inputs/TextInput';
import { useDocumentForm } from './DocumentContent';
import DocumentsComponents from './styled';

type Props = {
    document: Documents.ConvertedDocument;
    noUploadedDocument: boolean;
    isCurrentVersion: boolean;
    selectedVersion?: DocumentModel_Version;
    setSelectedVersion: (version: DocumentModel_Version) => void;
};

export default function DocumentFields({
    document,
    noUploadedDocument,
    isCurrentVersion,
    selectedVersion,
    setSelectedVersion
}: Props) {
    const {
        control,
        formState: { errors }
    } = useDocumentForm();

    return (
        <DocumentsComponents.Fields>
            {document.documentType?.numberSupported && (
                <DocumentsComponents.Field>
                    <TextInput
                        control={control}
                        inputProps={{
                            readOnly: !isCurrentVersion
                        }}
                        errors={errors}
                        name="number"
                        label={`core:documents.fields.number.${
                            isCurrentVersion ? 'label' : 'label_read_only'
                        }`}
                        placeholder="core:documents.fields.number.placeholder"
                        width="100%"
                    />
                </DocumentsComponents.Field>
            )}

            {document.documentType?.state?.supported && (
                <DocumentsComponents.Field>
                    <StateSelect
                        readOnly={!isCurrentVersion}
                        width="100%"
                        label={`core:documents.fields.state.${
                            isCurrentVersion ? 'label' : 'label_read_only'
                        }`}
                        name="state"
                        control={control}
                        errors={errors}
                    />
                </DocumentsComponents.Field>
            )}

            {document.documentType?.expirable && (
                <DocumentsComponents.Field>
                    <DateInput
                        readonly={!isCurrentVersion}
                        width="100%"
                        control={control}
                        errors={errors}
                        disabled={noUploadedDocument}
                        name="expires_at"
                        label={`core:documents.fields.expires_at.${
                            isCurrentVersion ? 'label' : 'label_read_only'
                        }`}
                        type="date"
                        size="small"
                    />
                </DocumentsComponents.Field>
            )}
            {document.documentType?.statusSupported && (
                <DocumentsComponents.Field>
                    <DocumentStatusSelect
                        readOnly={!isCurrentVersion || !document.documentType?.statusSupported}
                        name="status"
                        label={`core:documents.fields.status.${
                            isCurrentVersion ? 'label' : 'label_read_only'
                        }`}
                        control={control}
                    />
                </DocumentsComponents.Field>
            )}

            {/* <DocumentsComponents.Field>
                <VersionsSelect
                    isCurrentVersion={isCurrentVersion}
                    selectedVersion={selectedVersion}
                    documentTypeId={document.documentTypeId}
                    setSelectedVersion={setSelectedVersion}
                />
            </DocumentsComponents.Field> */}
        </DocumentsComponents.Fields>
    );
}
