import { memo } from 'react';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';
import { Stack } from '@mui/material';
import columns from './columns';

type Props = {
    driverId: string;
};

function Table({ driverId }: Props) {
    const executeAction = () => {};

    const formattedItems: { driverId: string }[] = [{ driverId }];

    return (
        <Stack
            paddingTop="12px"
            width="100%"
        >
            <MiniTable
                turnOffBorder
                columns={columns}
                rows={formattedItems}
                elementKey="driverId"
                executeAction={executeAction}
            />
        </Stack>
    );
}

export default memo(Table);
