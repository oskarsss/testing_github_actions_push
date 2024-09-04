import React from 'react';
import { filterTruckI } from '@/views/dispatch/scheduling/dialogs/CapList/helpers';
import TableCapListRows from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/TableCapListRows';
import TableCapListHead from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/TableCapListHead';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import Fade from '@mui/material/Fade';

type Props = {
    trucks_list: filterTruckI[];
    onCopyRow: (row: filterTruckI) => void;
};

export default function TableCapList({
    trucks_list,
    onCopyRow
}: Props) {
    return (
        <Fade in>
            <MiniTableStyled.Container sx={{ overflow: 'auto' }}>
                <MiniTableStyled.CommonTable
                    without_border
                    stickyHeader
                    sx={{ borderCollapse: 'separate' }}
                    size="small"
                    width="100%"
                >
                    <TableCapListHead />

                    <TableCapListRows
                        rows={trucks_list}
                        onCopyRow={onCopyRow}
                    />
                </MiniTableStyled.CommonTable>
            </MiniTableStyled.Container>
        </Fade>
    );
}
