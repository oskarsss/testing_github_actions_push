import TableRow from '@mui/material/TableRow';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import columns from './columns';

type Props = {
    value: DocumentModel_DocumentEntityType | '';
    isChangeOrder: boolean;
};

export default function TableHeader({
    value,
    isChangeOrder
}: Props) {
    const { t } = useAppTranslation();
    return (
        <MiniTableStyled.HeaderRow without_border>
            <TableRow sx={{ borderLeft: '0 !important', borderRight: '0 !important' }}>
                {value !== '' && isChangeOrder && <MiniTableStyled.HeaderCell />}
                {columns.map((column) => (
                    <MiniTableStyled.HeaderCell
                        key={column.field}
                        padding="normal"
                        style={column.styles ?? {}}
                        min_width={column.minWidth}
                        height={23}
                        is_text_align_left={column.flex_start}
                    >
                        {typeof column.headerName === 'string'
                            ? t(column.headerName)
                            : column.headerName}
                    </MiniTableStyled.HeaderCell>
                ))}
            </TableRow>
        </MiniTableStyled.HeaderRow>
    );
}
