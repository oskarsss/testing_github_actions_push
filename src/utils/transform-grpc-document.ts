import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { useStableArray } from '@/hooks/useStable';
import Documents from '@/store/documents/types';
import { useDocumentTypesMap } from '@/store/hash_maps/hooks';
import {
    DocumentModel_DocumentEntityType,
    DocumentModel_Status
} from '@proto/models/model_document';
import { useCallback, useMemo } from 'react';
import createMap from './create-map';

type ConverterType = (document: Documents.Document) => Documents.ConvertedDocument;

type ConverterReply = {
    converter: ConverterType;
};

export const useConvertDocument = (): ConverterReply => {
    const documentTypesMap = useDocumentTypesMap();

    const converter: ConverterType = useCallback(
        (document) => {
            const documentType = documentTypesMap[document.documentTypeId];
            return {
                ...document,
                documentType: documentType || null
            };
        },
        [documentTypesMap]
    );
    return {
        converter
    };
};

export const useGetDocumentsByEntityType = ({
    entityType,
    entityId
}: {
    entityType: DocumentModel_DocumentEntityType;
    entityId: string;
}) => {
    const response = DocumentsGrpcService.useGetDocumentsByEntityQuery(
        { entityId, entityType },
        {
            refetchOnMountOrArgChange: true,
            skip                     : !entityId
        }
    );

    const documentsReply = useStableArray(
        response.data?.documents.filter(
            (doc) => doc.status !== DocumentModel_Status.DOCUMENT_STATUS_DELETED
        )
    );

    const { converter } = useConvertDocument();

    const documents = useMemo(() => documentsReply.map(converter), [documentsReply, converter]);

    const documentsMap = useMemo(() => createMap(documents, 'documentTypeId'), [documents]);

    return {
        ...response,
        documents,
        documentsMap
    };
};
