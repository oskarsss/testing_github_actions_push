import { useStableLinks } from '@/@core/components/table/hooks/helpers';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';

export function useDraftsState() {
    const { emptyArray } = useStableLinks();

    const {
        data,
        isError,
        isLoading,
        isSuccess
    } = LoadDraftsGrpcService.useGetDraftsQuery({});

    return { drafts: data?.loadDrafts || emptyArray, isError, isLoading, isSuccess };
}
