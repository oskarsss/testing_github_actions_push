import { DocumentModel_Status } from '@proto/models/model_document';
import type { IntlMessageKey } from '@/@types/next-intl';

type StatusTypeOption = {
    label: IntlMessageKey;
    value: DocumentModel_Status;
};

export const statuses_options: StatusTypeOption[] = [
    {
        label: 'state_info:documents.status.pending',
        value: DocumentModel_Status.DOCUMENT_STATUS_PENDING
    },
    {
        label: 'state_info:documents.status.valid',
        value: DocumentModel_Status.DOCUMENT_STATUS_VALID
    },
    {
        label: 'state_info:documents.status.invalid',
        value: DocumentModel_Status.DOCUMENT_STATUS_INVALID
    }
];

export const DOCUMENT_FADE_TIMEOUT = 500;
