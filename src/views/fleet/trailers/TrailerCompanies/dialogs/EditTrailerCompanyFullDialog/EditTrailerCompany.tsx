import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import EditTrailerCompanyForm from '@/views/fleet/trailers/TrailerCompanies/dialogs/EditTrailerCompanyFullDialog/EditTrailerCompanyForm';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';

export const useEditTrailerCompanyDialog = hookFabric(EditTrailerCompany, FullDialog.Dialog);

type Props = {
    trailerCompanyId: string;
};

function EditTrailerCompany({ trailerCompanyId }: Props) {
    const dialog = useEditTrailerCompanyDialog(true);
    const {
        data,
        isError,
        isLoading,
        isSuccess,
        refetch
    } =
        TrailerCompaniesGrpcService.useRetrieveTrailerCompanyQuery(
            { trailerCompanyId },
            {
                refetchOnMountOrArgChange: true
            }
        );

    if (isError) {
        return (
            <FullDialog.FailedFetching
                onRetry={refetch}
                onClose={dialog.close}
            />
        );
    }

    if (isLoading || !isSuccess || !data?.trailerCompany) {
        return <FullDialog.FetchingProcess />;
    }

    return (
        <EditTrailerCompanyForm
            company={data.trailerCompany}
            refetch={refetch}
        />
    );
}
