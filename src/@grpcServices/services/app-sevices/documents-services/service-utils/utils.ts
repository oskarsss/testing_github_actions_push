import API_TAGS, { ProvideTagsType } from '@/store/api_tags';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { GetResultDescriptionFn } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import {
    DOCUMENT_ENTITY_TYPE_TO_PROVIDE_TAG,
    DOCUMENT_ENTITY_TYPES_TO_PROVIDE_TAG
} from '@/models/documents/documents-mappings';
import { DOCUMENT_ENTITY_TYPE_MAP } from '@/store/documents/slice';

type InvalidateDocumentsType = (
    additionalTags?: (ProvideTagsType | { type: ProvideTagsType; id: string })[]
) => <
    ResultType,
    RequestType extends { entityId: string; entityType: DocumentModel_DocumentEntityType }
>(
    _result: ResultType,
    _error?: FetchBaseQueryError,
    arg?: RequestType
) => ReturnType<
    GetResultDescriptionFn<ProvideTagsType, ResultType, RequestType, FetchBaseQueryError, object>
>;

const InvalidateDocuments: InvalidateDocumentsType = (additionalTags) =>
    function (_result, _error, arg) {
        if (!arg) return ['document_types'];
        return [
            {
                type: DOCUMENT_ENTITY_TYPE_TO_PROVIDE_TAG[arg.entityType],
                id  : arg.entityId
            },
            ...DOCUMENT_ENTITY_TYPES_TO_PROVIDE_TAG[arg.entityType],
            { type: API_TAGS.document_entity, id: arg.entityType },
            ...(additionalTags ?? [])
        ] as const;
    };

export default InvalidateDocuments;
