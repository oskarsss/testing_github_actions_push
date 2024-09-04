import { EasyNotFound } from '@/@core/components/table/NotFound';
import { useStopsPeriod } from '@/store/ifta/hooks';
import MiniTableHeader from '@/@core/ui-kits/basic/mini-table/components/MiniTableHeader';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableCells from '@/@core/ui-kits/basic/mini-table/components/MiniTableCells';
import { Box, TablePagination, useTheme } from '@mui/material';
import { ChangeEvent, MouseEvent } from 'react';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import IFTA_STOPS_COLUMNS from './columns';

type Props = {
    periodId: string;
};

export default function StopsTable({ periodId }: Props) {
    const theme = useTheme();
    const {
        rows,
        isLoading,
        rowsTotal,
        selected_filters: {
            page,
            per_page
        },
        filter_id,
        isFetching
    } = useStopsPeriod(periodId);

    const updateFilters = useAdvancedUpdateFilters({ filter_id });

    const onPageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        updateFilters({
            page: newPage
        });
    };

    const onRowsPerPageChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        updateFilters({
            per_page: Number(event.target.value),
            page    : 0
        });
    };

    if (isFetching) {
        return (
            <Preloader
                sx={{
                    width: '100%'
                }}
            />
        );
    }

    return rows.length ? (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            width="100%"
            overflow="auto"
            sx={{
                border      : ({ palette }) => `1px solid ${palette.semantic.border.primary}`,
                borderRadius: 1
            }}
        >
            <MiniTableStyled.Container>
                <MiniTableStyled.CommonTable
                    stickyHeader
                    size="small"
                    width="100%"
                >
                    <MiniTableHeader
                        turnOffBorder
                        columns={IFTA_STOPS_COLUMNS}
                    />
                    {rows.map((stop, idx) => (
                        <MiniTableStyled.Row
                            row_size="small"
                            key={`stop_${idx + 1}`}
                        >
                            <MiniTableCells
                                fontSize="medium"
                                columns={IFTA_STOPS_COLUMNS}
                                row={stop}
                                onClickCell={() => {}}
                            />
                        </MiniTableStyled.Row>
                    ))}
                </MiniTableStyled.CommonTable>
            </MiniTableStyled.Container>
            <div>
                <TablePagination
                    component="div"
                    size="small"
                    rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                    count={rowsTotal}
                    rowsPerPage={per_page}
                    page={page}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    style={{
                        borderTop      : `1px solid ${theme.palette.semantic.border.primary}`,
                        backgroundColor: theme.palette.semantic.foreground.white.tertiary
                    }}
                />
            </div>
        </Box>
    ) : (
        <EasyNotFound
            rows={rows}
            isLoading={isLoading}
        />
    );
}
