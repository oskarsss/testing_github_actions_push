import {
    DocumentModel_Document,
    DocumentModel_Status,
    DocumentModel_Type
} from '@proto/models/model_document';
import moment from 'moment-timezone';
import TableTypes from '../../types';

export type StyleType = 'valid' | 'invalid' | 'expiring' | '';

export const getDocumentStyle = (
    doc: DocumentModel_Document,
    docType: DocumentModel_Type
): StyleType => {
    let s: StyleType = 'valid';
    if (!doc) {
        return 'invalid';
    }
    const {
        required,
        statusSupported,
        expirable
    } = docType;

    if (!doc.status) {
        s = 'invalid';
    } else if (expirable && doc.status !== DocumentModel_Status.DOCUMENT_STATUS_VALID) {
        s = 'invalid';
    } else if (expirable) {
        const now = moment();
        const expiresAt = moment(doc.expiresAt);
        const isExpired = expiresAt < now;
        const isExpiringSoon = expiresAt.diff(now, 'days') < 14;

        if (isExpiringSoon) {
            s = 'expiring';
        }
        if (isExpired) {
            s = 'invalid';
        }
    } else if (statusSupported && doc.status !== DocumentModel_Status.DOCUMENT_STATUS_VALID) {
        if (required) {
            s = 'invalid';
        } else {
            s = '';
        }
    }

    return s;
};

export const getDocumentClassName = (hasDocument: boolean, required: boolean, style: StyleType) => {
    if (!hasDocument && !required) {
        return '';
    }
    if (!hasDocument && required) {
        return 'invalid';
    }
    return style;
};
