import { memo } from 'react';
import LoadDetailsView from '@/views/dispatch/orders/Details/LoadDetailsView';
import { useAppSelector } from '@/store/hooks';
import { selectOrderById } from '@/store/storage/orders/selectors';

type Props = {
    loadId?: string;
};

function Load({ loadId }: Props) {
    const load = useAppSelector(selectOrderById(loadId || ''));

    if (!load) return null;

    return (
        <LoadDetailsView
            load={load}
            sxContainer={{
                padding: '20px'
            }}
        />
    );
}

export default memo(Load);
