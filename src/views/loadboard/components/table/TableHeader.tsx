import { TableCell, TableRow, styled } from '@mui/material';
import columns from './columns';

const HeaderRow = styled(TableRow)(({ theme: { palette } }) => ({
    backgroundColor: palette.semantic.foreground.white.primary
}));

const HeaderCell = styled(TableCell)(({ theme: { palette } }) => ({
    borderBottom   : `1px solid ${palette.semantic.border.primary}`,
    borderTop      : `1px solid ${palette.semantic.border.primary}`,
    backgroundColor: palette.semantic.foreground.white.primary,
    fontSize       : '14px',
    fontWeight     : 600,
    textTransform  : 'capitalize',
    paddingLeft    : '12px',
    paddingRight   : '12px',
    height         : '30px !important',
    maxHeight      : '30px !important'
}));

export default function TableHeader() {
    return (
        <HeaderRow>
            {columns.map((column) => (
                <HeaderCell
                    size="small"
                    key={column.field}
                    style={{
                        width   : column.minWidth,
                        minWidth: column.minWidth,
                        maxWidth: column.minWidth,
                        ...(column?.isAmount && {
                            textAlign: 'right'
                        })
                    }}
                >
                    {column.headerName}
                </HeaderCell>
            ))}
        </HeaderRow>
    );
}
