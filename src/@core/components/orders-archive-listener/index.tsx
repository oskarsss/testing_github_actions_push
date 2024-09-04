import { getArchivedOrdersThunk } from '@/store/storage/orders/actions/thunks';
import { useAppDispatch } from '@/store/hooks';
import moment from 'moment-timezone';
import { useEffect } from 'react';

type Props = {
    startAt: string;
    filterId: string;
};

export default function OrdersArchiveListener({
    startAt,
    filterId
}: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const liveModeBorderDate = moment().subtract(45, 'days').startOf('day');
        if (moment(startAt).isBefore(liveModeBorderDate)) {
            dispatch(getArchivedOrdersThunk({ autoSelectOrder: true, filterId }));
        }
    }, [filterId, startAt]);

    return null;
}
