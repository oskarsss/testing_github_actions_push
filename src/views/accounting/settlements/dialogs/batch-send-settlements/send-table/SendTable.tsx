import { SettlementSendBatchPreviewReply_Preview } from '@proto/settlements';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableHeader from '@/@core/ui-kits/basic/mini-table/components/MiniTableHeader';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import { Stack, TableBody } from '@mui/material';
import { useState } from 'react';
import columns from './columns';
import SendSettlementsTableRow from './SendSettlementsTableRow';

type Props = {
    rows: SettlementSendBatchPreviewReply_Preview[];
};

export default function SendSettlementsTable({ rows }: Props) {
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    return (
        <Stack
            overflow="hidden"
            maxHeight="470px"
            height="100%"
            minHeight="470px"
        >
            <MiniTableStyled.Container sx={{ overflow: 'auto' }}>
                <MiniTableStyled.CommonTable
                    stickyHeader
                    size="small"
                    width="100%"
                >
                    <MiniTableHeader
                        turnOffBorder

                        // @ts-ignore
                        // eslint-disable-next-line react/jsx-props-no-multi-spaces
                        columns={columns}
                        fontSize="medium"
                    />
                    <TableBody>
                        {!rows.length ? (
                            <MiniTableNoItems colSpan={columns.length} />
                        ) : (
                            rows.map((row, rowIndex) => (
                                <SendSettlementsTableRow
                                    key={row.settlementId}
                                    row={row}
                                    rowIndex={rowIndex}
                                    isSelected={selectedRow === row.settlementId}
                                    setSelectedRow={setSelectedRow}
                                />
                            ))
                        )}
                    </TableBody>
                </MiniTableStyled.CommonTable>
            </MiniTableStyled.Container>
        </Stack>
    );
}
