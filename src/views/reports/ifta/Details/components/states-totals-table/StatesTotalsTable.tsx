import { EasyNotFound } from '@/@core/components/table/NotFound';
import { useTotalsPeriod } from '@/store/ifta/hooks';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableHeader from '@/@core/ui-kits/basic/mini-table/components/MiniTableHeader';
import MiniTableCells from '@/@core/ui-kits/basic/mini-table/components/MiniTableCells';
import { TableBody } from '@mui/material';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import TotalCell from '../trucks-table/TotalCell';
import IFTA_TOTALS_COLUMNS from './columns';

type Props = {
    periodId: string;
};

export default function StateTotalsTable({ periodId }: Props) {
    const {
        totals,
        isLoading,
        distanceTotal,
        fuelTotals,
        isFetching
    } = useTotalsPeriod(periodId);

    if (isFetching) {
        return (
            <Preloader
                sx={{
                    width: '100%'
                }}
            />
        );
    }

    return totals.length ? (
        <MiniTableStyled.Container
            sx={{
                border      : ({ palette }) => `1px solid ${palette.semantic.border.primary}`,
                borderRadius: 1
            }}
        >
            <MiniTableStyled.CommonTable
                stickyHeader
                width="100%"
                size="small"
            >
                <MiniTableHeader
                    turnOffBorder
                    columns={IFTA_TOTALS_COLUMNS}
                />
                <TableBody>
                    {totals.map((total, idx) => (
                        <MiniTableStyled.Row
                            row_size="small"
                            key={`total_${idx + 1}`}
                        >
                            <MiniTableCells
                                fontSize="medium"
                                columns={IFTA_TOTALS_COLUMNS}
                                row={total}
                                onClickCell={() => {}}
                            />
                        </MiniTableStyled.Row>
                    ))}
                    <MiniTableStyled.Row
                        tabIndex={-1}
                        row_size="small"
                        sx={{
                            height   : 26,
                            minHeight: 26,
                            maxHeight: 26
                        }}
                    >
                        <MiniTableStyled.Cell
                            colSpan={2}
                            sx={{
                                borderBottom: 'none !important',
                                position    : 'sticky',
                                bottom      : 0
                            }}
                        />
                        <TotalCell total={distanceTotal || 0} />
                        <TotalCell total={fuelTotals || 0} />
                    </MiniTableStyled.Row>
                </TableBody>
            </MiniTableStyled.CommonTable>
        </MiniTableStyled.Container>
    ) : (
        <EasyNotFound
            rows={totals}
            isLoading={isLoading}
        />
    );
}
