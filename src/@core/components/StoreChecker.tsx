import { useAppSelector } from '@/store/hooks';
import { memo } from 'react';

const StoreChecker = memo(() => {
    const store = useAppSelector((state) => state.api.queries);
    console.debug('store', store);
    return null;
});

export default StoreChecker;
