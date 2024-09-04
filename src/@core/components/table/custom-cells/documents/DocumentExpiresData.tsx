import { useAppSelector } from '@/store/hooks';
import React from 'react';
import moment from 'moment-timezone';
import { useDocumentSelector } from '@/store/documents/hooks';
import { getDocumentClassName, getDocumentStyle } from './utils';
import TableTypes from '../../types';
import { DocumentCheckboxWrapper } from './DocumentDataCheckbox';

type Props = {
    view_col: TableTypes.ViewColumn;
    entities?: Record<string, string>;
    selected: boolean;
};

export default function DocumentExpiresData({
    view_col,
    entities,
    selected
}: Props) {
    const documentType = useAppSelector(
        (state) => state.hash_maps.documentTypesMap[view_col.columnId]
    );
    const document = useDocumentSelector(view_col.columnId, entities);

    const style = getDocumentStyle(document, documentType);
    const className = getDocumentClassName(!!document, documentType.required, style);
    return (
        <DocumentCheckboxWrapper
            style={{
                justifyContent: 'flex-start',
                paddingLeft   : '10px'
            }}
            selected={selected}
            className={className}
        >
            {document ? moment(document.expiresAt).format('MM/DD/YYYY') : ''}
        </DocumentCheckboxWrapper>
    );
}
