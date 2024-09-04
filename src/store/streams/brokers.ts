import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import { useStableArray } from '@/hooks/useStable';

type Params = {
    search: string;
    skip?: boolean;
};

export const useFMCSABrokers = ({
    search = '',
    skip = false
}: Params) => {
    const {
        error: errorMessage,
        isError,
        isLoading,
        isSuccess,
        refetch,
        isFetching,
        data: _data
    } = BrokersGrpcService.useRequestFMCSABrokersQuery(
        { search },
        {
            skip
        }
    );

    const data = useStableArray(_data?.brokers || []);

    return {
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        errorMessage,
        requestBrokers: refetch
    };
};
