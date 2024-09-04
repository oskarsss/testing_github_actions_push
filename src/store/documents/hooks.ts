import Documents from '@/store/documents/types';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import { useMemo, useRef } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/types';
import { useAppSelector } from '@/store/hooks';
import { DOCUMENT_ENTITY_TYPE_MAP } from '@/store/documents/slice';
import { useDocumentTypesMap } from '../hash_maps/hooks';

export function useActiveDocumentTypes() {
    const stableArray = useRef([]);
    const {
        data,
        isError,
        isLoading
    } = DocumentTypesGrpcServices.useGetDocumentTypesQuery(
        {},
        {
            refetchOnMountOrArgChange: true
        }
    );

    const documentTypes = useMemo(
        () => (data ? data.documentTypes.filter((type) => !type.deleted) : stableArray.current),
        [data]
    );

    return {
        documentTypes,
        isError,
        isLoading
    };
}

export function useConvertDocument(document: Documents.Document) {
    const documentTypesMap = useDocumentTypesMap();
    const type = documentTypesMap[document.documentTypeId];
    return {
        ...document,
        documentType: type || null
    };
}

const documentsMapSelector = (state: RootState) => state.documents.documentsMap;
const documentTypeSelector = (state: RootState, columnId: string) =>
    state.hash_maps.documentTypesMap[columnId];

export const useDocumentSelector = (columnId: string, entities?: Record<string, string>) => {
    const selectDocument = createSelector(
        [documentTypeSelector, documentsMapSelector],
        (documentType, documentsMap) => {
            const entity = DOCUMENT_ENTITY_TYPE_MAP[documentType?.entityType || 0];
            const entityId = entities?.[entity] || '';
            return documentsMap[entity]?.[entityId]?.documents?.[columnId];
        }
    );
    return useAppSelector((state) => selectDocument(state, columnId));
};

export const selectorLoadingDocument = createSelector(
    [documentTypeSelector, documentsMapSelector],
    (documentType, documentsMap) => {
        const entity = DOCUMENT_ENTITY_TYPE_MAP[documentType?.entityType || 0];
        return !documentsMap[entity];
    }
);
