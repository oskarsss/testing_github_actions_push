/* eslint-disable import/prefer-default-export */
import moment from 'moment-timezone';
import { DocumentModel_Status } from '@proto/models/model_document';
import Documents from '../../../store/documents/types';

export const selectDocument = (
    documents?: Documents.Document[],
    document_id?: Documents.Document['documentTypeId']
) => {
    if (!documents || documents.length === 0) {
        return '';
    }

    if (document_id) {
        return document_id;
    }

    return documents[0].documentTypeId;
};

export function countInvalidDocuments(documents?: Documents.ConvertedDocument[]) {
    return (
        documents?.reduce((acc, doc) => {
            if (doc.status === DocumentModel_Status.DOCUMENT_STATUS_INVALID) {
                return acc + 1;
            }
            const expiration_date = moment(doc.expiresAt);
            const current_date = moment();
            const diff = current_date.diff(expiration_date, 'days') || 0;
            if (doc.documentType?.expirable && diff > 0) {
                return acc + 1;
            }
            return acc;
        }, 0) || 0
    );
}
