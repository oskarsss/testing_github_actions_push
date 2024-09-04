import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { useDocumentSelector } from '@/store/documents/hooks';
import { DocumentCheckboxWrapper } from './DocumentDataCheckbox';
import TableTypes from '../../types';
import { getDocumentClassName, getDocumentStyle } from './utils';

type Props = {
    view_col: TableTypes.ViewColumn;
    entities?: Record<string, string>;
    selected: boolean;
};

export default function DocumentNumber({
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
            selected={selected}
            component="span"
            className={className}
        >
            {document ? document.number : ''}
        </DocumentCheckboxWrapper>
    );
}
