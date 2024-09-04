/* eslint-disable react/jsx-no-useless-fragment */
import { useServiceProvidersMap } from '@/store/hash_maps/hooks';
import { memo } from 'react';

type Props = {
    serviceProviderId: string;
};

function ServiceProvider({ serviceProviderId }: Props) {
    const provider = useServiceProvidersMap(serviceProviderId);
    return <>{provider?.name || '-'}</>;
}

export default memo(ServiceProvider);
