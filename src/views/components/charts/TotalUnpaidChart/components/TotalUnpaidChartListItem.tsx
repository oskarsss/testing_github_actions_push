import { useAppTranslation } from '@/hooks/useAppTranslation';
import TotalUnpaidChartComponents from '@/views/components/charts/TotalUnpaidChart/components/TotalUnpaidChartComponents';
import { ChartTotalUnpaidRetrieveReply_Item } from '@proto/chart';
import { LOAD_INVOICE_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';

type Props = {
    item: ChartTotalUnpaidRetrieveReply_Item;
};

export default function TotalUnpaidChartListItem({ item }: Props) {
    const { t } = useAppTranslation();
    return (
        <TotalUnpaidChartComponents.ListItem key={item.invoiceStatus}>
            <TotalUnpaidChartComponents.ListItemWrapper style={{ flex: '1 1 0' }}>
                <TotalUnpaidChartComponents.Dot
                    status={LOAD_INVOICE_STATUS_GRPC_ENUM[item.invoiceStatus]}
                />
                <TotalUnpaidChartComponents.ListItemLabel>
                    {t(
                        `state_info:loads.invoice_status.${
                            LOAD_INVOICE_STATUS_GRPC_ENUM[item.invoiceStatus]
                        }`
                    )}
                </TotalUnpaidChartComponents.ListItemLabel>
            </TotalUnpaidChartComponents.ListItemWrapper>

            <TotalUnpaidChartComponents.ListItemWrapper>
                <TotalUnpaidChartComponents.ListItemAmount>
                    {item.amountCurrency}
                </TotalUnpaidChartComponents.ListItemAmount>
                <TotalUnpaidChartComponents.ListItemPercentage
                    status={LOAD_INVOICE_STATUS_GRPC_ENUM[item.invoiceStatus]}
                >
                    {item.amountPercentage}
                </TotalUnpaidChartComponents.ListItemPercentage>
            </TotalUnpaidChartComponents.ListItemWrapper>
        </TotalUnpaidChartComponents.ListItem>
    );
}
