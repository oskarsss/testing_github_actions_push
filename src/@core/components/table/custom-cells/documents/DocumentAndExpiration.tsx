import React from 'react';
import { useAppSelector } from '@/store/hooks';
import moment from 'moment-timezone';
import { useDocumentSelector } from '@/store/documents/hooks';
import TableTypes from '../../types';
import { getCheckbox } from '../../table_config';
import { getDocumentClassName, getDocumentStyle } from './utils';
import { DocumentCheckboxWrapper } from './DocumentDataCheckbox';

type Props = {
    view_col: TableTypes.ViewColumn;
    entities?: Record<string, string>;
    selected: boolean;
};

export default function DocumentAndExpiration({
    entities,
    selected,
    view_col
}: Props) {
    const documentType = useAppSelector(
        (state) => state.hash_maps.documentTypesMap[view_col.columnId]
    );
    const document = useDocumentSelector(view_col.columnId, entities);

    const style = getDocumentStyle(document, documentType);
    const className = getDocumentClassName(!!document, documentType?.required, style);

    if (!document) {
        return (
            <DocumentCheckboxWrapper
                selected={selected}
                className={className}
            >
                {getCheckbox('invalid')}
                <span style={{ width: 85 }} />
            </DocumentCheckboxWrapper>
        );
    }
    return (
        <DocumentCheckboxWrapper
            style={{
                justifyContent: 'flex-start',
                paddingLeft   : '15px'
            }}
            selected={selected}
            className={className}
        >
            {getCheckbox(style)}
            <span style={{ width: 85 }}>{moment(document.expiresAt).format('MM/DD/YYYY')}</span>
        </DocumentCheckboxWrapper>
    );
}
