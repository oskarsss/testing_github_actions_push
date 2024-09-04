import { ChangeEvent, useMemo, useState, MouseEvent } from 'react';
import { TableContainer, TablePagination } from '@mui/material';
import { TableWrapper } from '@/views/settings/components/styled';
import SettlementsTypes from '@/store/accounting/settlements/types';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import columns from './columns';

type Props = {
    cycleId: string;
    periods: SettlementsTypes.Cycles.Periods.Period[];
};

export default function CycleTable({
    periods,
    cycleId
}: Props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredPeriods = useMemo(
        () => periods.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, periods, rowsPerPage]
    );

    const convertedPeriods = useMemo(
        () =>
            filteredPeriods.map((period) => ({
                ...period,
                cycleId
            })),
        [cycleId, filteredPeriods]
    );

    if (periods.length === 0) {
        return null;
    }

    return (
        <TableWrapper>
            <TableContainer sx={{ maxHeight: 440 }}>
                <MiniTable
                    columns={columns}
                    rows={convertedPeriods}
                    elementKey="periodId"
                    executeAction={() => {}}
                    turnOffBorder
                />
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={periods.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableWrapper>
    );
}
