import React, { memo } from 'react';

import { TableCell, TableRow, styled } from '@mui/material';
import columns from './columns';
import { FormattedLoadboardRow } from './LoadboardTableContainer';

type Props = {
    load: FormattedLoadboardRow;
    isFocused: boolean;
    onClick: (resultId: string) => void;
    isSelected: boolean;
    isViewed: boolean;
};

const Row = styled(TableRow, {
    shouldForwardProp: (propName) => propName !== 'isFocused' && propName !== 'isViewed'
})<{
    isFocused?: boolean;
    isViewed?: boolean;
}>(({
    theme,
    isFocused,
    isViewed
}) => ({
    backgroundColor: theme.palette.semantic.foreground.white.primary,
    height         : '34px !important',
    maxHeight      : '34px !important',
    cursor         : 'pointer',
    '&:hover'      : {
        backgroundColor: theme.palette.semantic.actions.foreground.gray.primary
    },
    ...(isViewed && {
        backgroundColor: theme.palette.semantic.foreground.brand.tertiary
    }),
    ...(isFocused && {
        backgroundColor: `${theme.palette.semantic.actions.foreground.gray.secondary}!important`
    })
}));

const Cell = styled(TableCell, {
    shouldForwardProp: (propName) => propName !== 'isSelected'
})<{
    isSelected: boolean;
}>(({
    theme,
    isSelected
}) => ({
    paddingLeft  : '12px !important',
    paddingRight : '12px !important',
    borderBottom : `1px solid ${theme.palette.semantic.border.primary}`,
    borderTop    : `1px solid ${theme.palette.semantic.border.primary}`,
    fontSize     : '14px',
    fontWeight   : 400,
    textTransform: 'capitalize',
    height       : '34px !important',
    maxHeight    : '34px !important',
    ...(isSelected && {
        backgroundColor: theme.palette.semantic.foreground.brand.secondary,
        borderTop      : `1px solid ${theme.palette.semantic.border.brand.primary} !important`,
        borderBottom   : `1px solid ${theme.palette.semantic.border.brand.primary} !important`
    })
}));

function RenderedRow({
    load,
    isFocused,
    isSelected,
    onClick,
    isViewed
}: Props) {
    return (
        <Row
            onClick={() => onClick(load.resultId)}
            tabIndex={-1}
            isFocused={isFocused}
            isViewed={isViewed}
        >
            {columns.map((column) => (
                <Cell
                    isSelected={isSelected}
                    key={`${load.resultId}_${column.field}`}
                    padding="none"
                    style={{
                        width   : column.minWidth,
                        minWidth: column.minWidth,
                        maxWidth: column.minWidth
                    }}
                >
                    {column.renderCell(load)}
                </Cell>
            ))}
        </Row>
    );
}

export default memo(RenderedRow);
