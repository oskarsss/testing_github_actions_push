/* eslint-disable react/jsx-no-useless-fragment */
import { Stack, useTheme } from '@mui/material';
import LoadsTypes from '@/store/dispatch/loads/types';
import { useBrokersMap, useCustomersMap } from '@/store/hash_maps/hooks';
import { Theme } from '@mui/material/styles/createTheme';
import TopDebtorsChartStyled from '@/views/components/charts/TopDebtorsChart/TopDebtorsChart.styled';
import { ChartTopDebtorsGetReply_Item } from '@proto/chart';

const getBrokersTreeColors = (theme: Theme) => [
    theme.palette.colors.brand[700],
    theme.palette.colors.brand[600],
    theme.palette.colors.brand[500],
    theme.palette.colors.brand[400],
    theme.palette.colors.brand[300],
    theme.palette.colors.brand[200]
];

const getColor = (theme: Theme, amount: number, total: number | undefined) => {
    const COLORS_CHART = getBrokersTreeColors(theme);
    if (total) {
        if (amount <= total / 80) return COLORS_CHART[0];
        if (amount <= total / 60) return COLORS_CHART[1];
        if (amount <= total / 40) return COLORS_CHART[2];
        if (amount <= total / 20) return COLORS_CHART[3];
    }
    return COLORS_CHART[4];
};

const ChartBar = ({
    percentage,
    max_percentage,
    total,
    amount
}: {
    percentage: number;
    max_percentage: number;
    total?: number;
    amount: number;
}) => {
    const theme = useTheme();
    const color = getColor(theme, amount, total);
    return (
        <Stack
            width={`${(percentage * 100) / max_percentage}%`}
            height="16px"
            borderRadius="4px"
            sx={{
                backgroundColor: color
            }}
        />
    );
};

type Props = {
    customerId: string;
    brokerId: string;
};

const ClientCell = ({
    customerId = '',
    brokerId = ''
}: Props) => {
    const broker = useBrokersMap(brokerId);
    const customer = useCustomersMap(customerId);

    if (customer && customerId) {
        return <>{customer.shortName || customer.name || '-'}</>;
    }
    if (broker && brokerId) {
        return <>{broker.shortName || broker.name || '-'}</>;
    }
    return null;
};

const Indicator = ({
    amount,
    total
}: { amount: number; total?: number }) => {
    const theme = useTheme();
    const color = getColor(theme, amount, total);
    return <TopDebtorsChartStyled.Indicator style={{ background: color }} />;
};

type TableRow = ChartTopDebtorsGetReply_Item & { total?: number; max_percentage: number };
export const columns: LoadsTypes.Table.ColumnLoad<TableRow>[] = [
    {
        header_name: '',
        field_name : 'indicator',
        align      : 'center',
        width      : '16px',
        style      : { maxWidth: '24px' },
        renderCell : (row) => (
            <Indicator
                amount={row.amount}
                total={row.total}
            />
        )
    },
    {
        header_name: 'analytics:charts.top_debtors.table.columns.count',
        field_name : 'count',
        align      : 'center',
        width      : '40px',
        renderCell : (row) => row.ordersCount
    },
    {
        header_name: 'analytics:charts.top_debtors.table.columns.client',
        field_name : 'name',
        align      : 'left',
        width      : '180px',
        renderCell : (row) => (
            <ClientCell
                brokerId={row.brokerId}
                customerId={row.customerId}
            />
        )
    },
    {
        header_name: 'analytics:charts.top_debtors.table.columns.loads',
        field_name : 'percentage_formatted',
        align      : 'center',
        width      : '80px',
        renderCell : (row) => row.ordersPercentage
    },
    {
        header_name: 'analytics:charts.top_debtors.table.columns.total',
        field_name : 'amount_formatted',
        align      : 'center',
        width      : '100px',
        renderCell : (row) => row.amountCurrency
    },
    {
        header_name: '',
        field_name : 'charts',
        align      : 'center',
        width      : '146px',
        minWidth   : '146px',
        renderCell : (row) => (
            <ChartBar
                percentage={parseInt(row.ordersPercentage, 10)}
                max_percentage={row.max_percentage}
                amount={row.amount}
                total={row.total}
            />
        )
    }
];
