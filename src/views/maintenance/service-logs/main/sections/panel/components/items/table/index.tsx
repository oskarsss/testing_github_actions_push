import { memo, useMemo } from 'react';
import { Stack } from '@mui/material';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { useAppSelector } from '@/store/hooks';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';
import { ServiceLogItemGetReply } from '@proto/service_log_item';
import { useServiceLogItemTypesMap } from '@/store/hash_maps/hooks';
import columns from './columns';

type Props = {
    items: ServiceLogItemGetReply;
};

function Table({ items }: Props) {
    const serviceLogItemTypes = useServiceLogItemTypesMap();
    const selectedServiceLog = useAppSelector((state) => state.serviceLogs.selectedServiceLog);

    const formattedItems = useMemo(
        () =>
            items.baseItem.map((item) => ({
                ...item,
                itemTypeName: serviceLogItemTypes[item.itemTypeId]?.name
            })),
        [items.baseItem, serviceLogItemTypes]
    );

    return (
        <Stack
            padding="16px"
            gap="12px"
            bgcolor="semantic.foreground.white.tertiary"
            borderRadius="8px"
        >
            <MiniTable
                turnOffBorder
                stickyHeader
                rows={formattedItems}
                elementKey="serviceLogItemId"
                columns={columns}
                executeAction={() => {}}
                ComponentAfterContent={(
                    <TotalsRow
                        without_border
                        columns={columns}
                        info_config={{
                            total: getFormattedAmountOfMoney(selectedServiceLog?.totalAmount)
                        }}
                    />
                )}
            />
        </Stack>
    );
}

export default memo(Table);
