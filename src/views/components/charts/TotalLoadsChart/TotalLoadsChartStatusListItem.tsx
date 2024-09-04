import { Stack, Typography } from '@mui/material';
import { LOAD_INVOICE_STATUS_ICONS } from '@/@core/theme/entities/load/invoice_status';
import { memo } from 'react';
import { LoadInvoiceStatus } from '@/models/loads/load';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ChartTotalOrdersGetReply_Item } from '@proto/chart';
import { LOAD_INVOICE_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';

type Props = {
    item: ChartTotalOrdersGetReply_Item;
    itemsLength: number;
    onClick: (invoice_status: LoadInvoiceStatus) => void;
};

function TotalLoadsChartStatusListItem({
    item,
    itemsLength,
    onClick
}: Props) {
    const { t } = useAppTranslation();

    const invoiceStatus = LOAD_INVOICE_STATUS_GRPC_ENUM[item.invoiceStatus];

    const handleClick = () => onClick(invoiceStatus);

    return (
        <Stack
            width={`calc(100% / ${itemsLength})`}
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap="4px"
            sx={{ cursor: 'pointer' }}
            onClick={handleClick}
        >
            <Typography
                display="flex"
                alignItems="center"
            >
                {LOAD_INVOICE_STATUS_ICONS[invoiceStatus]}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={600}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {t(`state_info:loads.invoice_status.${invoiceStatus}`)}
            </Typography>
        </Stack>
    );
}

export default memo(TotalLoadsChartStatusListItem);
