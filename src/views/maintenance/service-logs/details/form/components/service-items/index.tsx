import { memo } from 'react';
import Table from './table';
import ServiceItemsHeader from './ServiceItemsHeader';

type Props = {
    serviceLogId: string;
    totalAmount: number;
};

function ServiceItems({
    serviceLogId,
    totalAmount
}: Props) {
    return (
        <>
            <ServiceItemsHeader serviceLogId={serviceLogId} />

            <Table
                serviceLogId={serviceLogId}
                totalAmount={totalAmount}
            />
        </>
    );
}

export default memo(ServiceItems);
