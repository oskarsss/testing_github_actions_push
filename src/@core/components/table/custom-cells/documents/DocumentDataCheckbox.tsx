import { memo, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import Checkbox from '@mui/material/Checkbox';
import { Box, Theme, styled, Skeleton } from '@mui/material';
import { selectorLoadingDocument, useDocumentSelector } from '@/store/documents/hooks';
import { getCheckbox } from '../../table_config';
import { StyleType, getDocumentStyle } from './utils';

type Props = {
    columnId: string;
    selected: boolean;
    entities?: Record<string, string>;
};

const getDocumentStylesConfig = (theme: Theme) => ({
    valid   : `${theme.palette.semantic.text.disabled}`,
    invalid : '#ff9393',
    expiring: '#e89800'
});

export const DocumentCheckboxWrapper = styled(Box)<{ selected: boolean }>(
    ({
        theme,
        selected
    }) => ({
        display       : 'flex',
        flexDirection : 'row',
        alignItems    : 'center',
        justifyContent: 'center',
        width         : '100%',
        height        : '100%',
        boxSizing     : 'border-box',
        ...(selected && {
            boxShadow: '0px 0px 0px 2.5px #0A43E1 inset'
        })
    })
);

function DocumentCheckbox({
    columnId = '',
    selected,
    entities
}: Props) {
    const documentType = useAppSelector((state) => state.hash_maps.documentTypesMap[columnId]);
    const document = useDocumentSelector(columnId, entities);

    const style: StyleType = useMemo(
        () => getDocumentStyle(document, documentType),
        [document, documentType]
    );

    const className = useMemo(() => {
        if (!document && !documentType?.required) {
            return '';
        }
        if (!document && documentType?.required) {
            return 'invalid';
        }
        return style;
    }, [document, documentType?.required, style]);

    const isLoading = useAppSelector((state) => selectorLoadingDocument(state, columnId));

    if (isLoading) {
        return (
            <DocumentCheckboxWrapper
                component="span"
                selected={selected}
            >
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width       : 20,
                        height      : 20,
                        borderRadius: '4px'
                    }}
                />
            </DocumentCheckboxWrapper>
        );
    }

    if (!documentType) {
        return null;
    }

    return (
        <DocumentCheckboxWrapper
            selected={selected}
            component="span"
            className={className}
        >
            {!document || !document.fileId ? (
                getCheckbox('invalid')
            ) : (
                <Checkbox
                    checked={!!document.fileId}
                    sx={{
                        padding        : 0,
                        '&.Mui-checked': {
                            ...(style && {
                                color: (theme) =>
                                    `${getDocumentStylesConfig(theme)[style]} !important`
                            })
                        }
                    }}
                />
            )}
        </DocumentCheckboxWrapper>
    );
}

export default memo(DocumentCheckbox);
