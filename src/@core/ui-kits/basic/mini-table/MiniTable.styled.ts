/* eslint-disable max-len */
import { CSSProperties } from 'react';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Table, Theme } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';

export type FontSize = 'medium' | 'large';

type TableRowProps = {
    shadow?: boolean;
    background?: string;
    row_size?: 'small' | 'normal';
    without_border?: boolean;
    isSelected?: boolean;
};

type TableProps = {
    theme?: Theme;
    without_border?: boolean;
};

const CommonTable = styled(Table)<TableProps>(({
    theme,
    without_border = false
}) => ({
    borderCollapse: 'collapse',
    tr            : {
        borderLeft : `1px solid ${theme.palette.semantic.border.primary}`,
        borderRight: `1px solid ${theme.palette.semantic.border.primary}`
    },
    ...(without_border && {
        tr: {
            borderLeft : 'none',
            borderRight: 'none'
        }
    })
}));

const Container = styled(TableContainer)(({ theme }) => ({
    width: '100%',
    ...getScrollBarStyles(theme)
}));

type HeaderRowProps = {
    without_border?: boolean;
};

const HeaderRow = styled(TableHead, {
    shouldForwardProp: (prop) => prop !== 'without_border'
})<HeaderRowProps>(({
    theme,
    without_border = false
}) => ({
    height     : 23,
    borderRight: `1px solid ${theme.palette.semantic.border.primary}`,
    borderLeft : `1px solid ${theme.palette.semantic.border.primary}`,
    ...(without_border && {
        borderLeft : 'none !important',
        borderRight: 'none !important',
        borderTop  : 'none !important'
    })
}));

const Cell = styled(TableCell, {
    shouldForwardProp: (prop) => {
        const props_array = ['flex_start', 'hasMaxWidth', 'isAmount'] as PropertyKey[];
        return !props_array.includes(prop);
    }
})<{
    min_width?: CSSProperties['minWidth'];
    flex_start?: boolean;
    color?: string;
    hasMaxWidth?: boolean;
    fontSize?: FontSize;
    isAmount?: boolean;
}>(({
    min_width,
    flex_start,
    color,
    hasMaxWidth,
    theme,
    fontSize,
    isAmount
}) => ({
    cursor       : 'pointer',
    textAlign    : flex_start ? 'left' : 'right',
    verticalAlign: 'middle',
    minWidth     : min_width,
    fontWeight   : 500,

    borderBottom: `1px solid ${theme.palette.semantic.border.primary} !important`,
    color       : `${color ?? theme.palette.semantic.text.primary} !important`,

    fontSize      : '12px',
    padding       : '0px 12px',
    lineHeight    : '18px',
    '&:last-child': {
        paddingRight: '12px !important'
    },
    ...(fontSize === 'large' && {
        fontSize: '14px !important',

        // TODO: it may remove
        fontWeight: '400 !important',
        padding   : '6px 16px'
    }),
    ...(hasMaxWidth && {
        overflow: 'hidden',
        maxWidth: min_width
    }),

    // TODO: it may remove
    ...(isAmount && { fontWeight: 500 })
}));

const HeaderCell = styled(Cell, {
    shouldForwardProp: (prop) => prop !== 'is_text_align_left'
})<{
    is_text_align_left?: boolean;
    min_width?: CSSProperties['minWidth'];
    max_width?: CSSProperties['maxWidth'];
    fontSize?: FontSize;
}>(({
    is_text_align_left = true,
    min_width,
    max_width,
    fontSize,
    theme
}) => ({
    minWidth       : min_width,
    maxWidth       : max_width,
    textTransform  : 'uppercase',
    fontWeight     : '700 !important',
    fontStyle      : 'normal',
    padding        : '0 12px',
    lineHeight     : '18px',
    fontSize       : '9px !important',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    textAlign      : is_text_align_left ? 'left' : 'right',
    ...(fontSize === 'large' && {
        fontSize: '12px !important',

        // TODO: it may remove
        fontWeight: '600 !important',
        padding   : '6px 16px'
    })
}));

const Row = styled(TableRow, {
    shouldForwardProp: (prop) => {
        const props_array = ['shadow', 'row_size', 'without_border', 'isSelected'] as PropertyKey[];
        return !props_array.includes(prop);
    }
})<TableRowProps>(({
    shadow = false,
    theme,
    row_size,
    without_border,
    isSelected
}) => ({
    height         : row_size === 'small' ? 23 : 34,
    cursor         : 'pointer',
    backgroundColor: isSelected
        ? theme.palette.semantic.background.secondary
        : theme.palette.semantic.foreground.white.tertiary,

    // borderBottom                      : without_border ? 'none' :`1px solid ${theme.palette.semantic.border.primary} !important`,
    '&:last-child td, &:last-child th': {
        border: 0
    },
    boxShadow: shadow ? 'inset 35px -23px 0px -30px #9b9a9f' : 'none',
    ...(without_border && {
        borderLeft  : 'none !important',
        borderRight : 'none !important',
        borderTop   : 'none !important',
        borderBottom: 'none !important'
    })
}));

const MiniTableStyled = {
    Cell,
    HeaderCell,
    Row,
    CommonTable,
    Container,
    HeaderRow
};

export default MiniTableStyled;
