import { hookFabric } from '@/utils/dialog-hook-fabric';
import EditTrailerCompanyForm from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/EditTrailerCompanyForm';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';

export const useEditTrailerCompanyDialog = hookFabric(EditTrailerCompanyDialog);

type Props = {
    trailerCompanyId: string;
};

export default function EditTrailerCompanyDialog({ trailerCompanyId }: Props) {
    const {
        data,
        isError,
        isLoading,
        isSuccess
    } =
        TrailerCompaniesGrpcService.useRetrieveTrailerCompanyQuery(
            { trailerCompanyId },
            {
                refetchOnMountOrArgChange: true
            }
        );

    if (isError) return <DialogComponents.FailedFetching />;

    if (isLoading || !isSuccess || !data.trailerCompany) {
        return <DialogComponents.FetchingProcess />;
    }

    return <EditTrailerCompanyForm company={data.trailerCompany} />;
}
