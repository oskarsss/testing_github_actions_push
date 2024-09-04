import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo } from 'react';
import { useChartTopDebtors } from '@/store/charts/hooks';
import { InfoBlock } from '@/views/components/charts/styledComponents';
import AnalyticsEmptyScreen from '@/views/analytics/components/EmptyScreen/AnalyticsEmptyScreen';
import { columns } from '@/views/components/charts/TopDebtorsChart/columns';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { openNewWindowWithQueryParams } from '@/utils/open-new-window';
import { FilterIdMap } from '@/@core/components/filters/types';
import { FilterModel_FilterID } from '@proto/models/model_filter_type';
import ChartContainer from '../ChartContainer';
import TopDebtorsChartStyled from './TopDebtorsChart.styled';

const Header = () => {
    const { t } = useAppTranslation();
    return (
        <Typography
            fontWeight={600}
            fontSize="24px"
        >
            {t('analytics:charts.top_debtors.title')}
        </Typography>
    );
};

const TopDebtorsChart = () => {
    const { t } = useAppTranslation();
    const {
        items,
        total,
        isLoading
    } = useChartTopDebtors();

    if (!items.length) {
        return (
            <ChartContainer
                header={<Header />}
                isLoading={isLoading}
                styleContent={{ height: '100%' }}
            >
                <AnalyticsEmptyScreen type="top_debtors" />
            </ChartContainer>
        );
    }

    const max_percentage = items.reduce(
        (acc, item) => Math.max(acc, parseInt(item.ordersPercentage, 10)),
        0
    );

    const onClickRow = (broker_id: string) => {
        openNewWindowWithQueryParams('billing', {
            [FilterIdMap[FilterModel_FilterID.FILTER_BROKER]]: [broker_id]
        });
    };

    return (
        <ChartContainer
            header={<Header />}
            isLoading={isLoading}
        >
            <InfoBlock>
                <div>{t('analytics:charts.top_debtors.info.all_debtors')}</div>
                <span>{total ?? ''}</span>
            </InfoBlock>
            <TopDebtorsChartStyled.TableInfo>
                <Table
                    stickyHeader
                    sx={{ minWidth: 432 }}
                    aria-label="sticky table"
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TopDebtorsChartStyled.HeadCell
                                    size="small"
                                    align={column.align}
                                    key={column.field_name}
                                >
                                    {t(column.header_name)}
                                </TopDebtorsChartStyled.HeadCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <TableRow
                                key={row.brokerId}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },

                                    transition: 'background-color 0.3s',
                                    cursor    : 'pointer',
                                    '&:hover' : {
                                        backgroundColor: (theme) =>
                                            theme.palette.semantic.foreground.secondary
                                    }
                                }}
                                onClick={() => onClickRow(row.brokerId)}
                            >
                                {columns.map((column) => (
                                    <TopDebtorsChartStyled.BodyCell
                                        size="small"
                                        component="th"
                                        scope="row"
                                        key={column.field_name}
                                        align={column.align}
                                        style={column.style}
                                        width={column.width}
                                        sx={{ minWidth: column.minWidth, maxWidth: column.width }}
                                    >
                                        {column.renderCell({
                                            ...row,
                                            total,
                                            max_percentage
                                        })}
                                    </TopDebtorsChartStyled.BodyCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TopDebtorsChartStyled.TableInfo>
        </ChartContainer>
    );
};

export default memo(TopDebtorsChart);
