import { EasyNotFound } from '@/@core/components/table/NotFound';
import { useTrucksPeriod } from '@/store/ifta/hooks';
import MiniTableHeader from '@/@core/ui-kits/basic/mini-table/components/MiniTableHeader';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableCells from '@/@core/ui-kits/basic/mini-table/components/MiniTableCells';
import { TableBody, useTheme } from '@mui/material';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import IFTA_TRUCKS_COLUMNS from './columns';
import TotalCell from './TotalCell';

type Props = {
    periodId: string;
};

export default function TrucksTable({ periodId }: Props) {
    const {
        trucks,
        isLoading,
        isFetching,
        totalFuel,
        totalDistance
    } = useTrucksPeriod(periodId);
    const { palette } = useTheme();

    if (isFetching) {
        return (
            <Preloader
                sx={{
                    width: '100%'
                }}
            />
        );
    }

    return trucks.length ? (
        <MiniTableStyled.Container
            sx={{
                border      : `1px solid ${palette.semantic.border.primary}`,
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
                    columns={IFTA_TRUCKS_COLUMNS}
                />
                <TableBody>
                    {trucks.map((truck, idx) => (
                        <MiniTableStyled.Row
                            row_size="small"
                            key={`trucks_${idx + 1}`}
                        >
                            <MiniTableCells
                                fontSize="medium"
                                columns={IFTA_TRUCKS_COLUMNS}
                                row={{ truck }}
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
                            colSpan={4}
                            sx={{
                                borderBottom: 'none !important',
                                position    : 'sticky',
                                bottom      : 0
                            }}
                        />
                        <TotalCell total={totalFuel || 0} />
                        <TotalCell total={totalDistance || 0} />
                    </MiniTableStyled.Row>
                </TableBody>
            </MiniTableStyled.CommonTable>
        </MiniTableStyled.Container>
    ) : (
        <div>
            <EasyNotFound
                rows={[]}
                isLoading={isLoading}
            />
        </div>
    );
}
