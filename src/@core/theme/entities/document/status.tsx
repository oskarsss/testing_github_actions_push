import { DocumentModel_Status } from '@proto/models/model_document';
import React, { ReactNode } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';

export const DOCUMENT_STATUS_COLORS: Record<DocumentModel_Status, 'warning' | 'success' | 'error'> =
    {
        [DocumentModel_Status.DOCUMENT_STATUS_UNSPECIFIED]: 'warning',
        [DocumentModel_Status.DOCUMENT_STATUS_VALID]      : 'success',
        [DocumentModel_Status.DOCUMENT_STATUS_INVALID]    : 'error',
        [DocumentModel_Status.DOCUMENT_STATUS_PENDING]    : 'warning',
        [DocumentModel_Status.DOCUMENT_STATUS_DELETED]    : 'error'
    };

export const DOCUMENT_STATUS_ICONS: Record<DocumentModel_Status, ReactNode> = {
    [DocumentModel_Status.DOCUMENT_STATUS_UNSPECIFIED]: '',
    [DocumentModel_Status.DOCUMENT_STATUS_VALID]      : <VectorIcons.LoadIcons.CircleCheck />,
    [DocumentModel_Status.DOCUMENT_STATUS_INVALID]    : <VectorIcons.LoadIcons.CircleCross />,
    [DocumentModel_Status.DOCUMENT_STATUS_PENDING]    : <VectorIcons.LoadIcons.CircleClock />,
    [DocumentModel_Status.DOCUMENT_STATUS_DELETED]    : ''
};
