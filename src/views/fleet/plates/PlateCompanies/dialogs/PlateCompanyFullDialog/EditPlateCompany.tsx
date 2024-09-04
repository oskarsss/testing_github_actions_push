import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import EditPlateCompanyForm from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompanyFullDialog/EditPlateCompanyForm';
import PlateCompaniesGrpcService from '@/@grpcServices/services/plate-companies.service';

export const useEditPlateCompanyDialog = hookFabric(EditPlateCompany, FullDialog.Dialog);

type Props = {
    plateCompanyId: string;
};

function EditPlateCompany({ plateCompanyId }: Props) {
    const editPlateCompanyDialog = useEditPlateCompanyDialog(true);
    const {
        data,
        isError,
        isLoading,
        refetch
    } =
        PlateCompaniesGrpcService.useRetrievePlateCompanyQuery(
            {
                plateCompanyId
            },
            {
                refetchOnMountOrArgChange: true
            }
        );

    if (isError) {
        return (
            <FullDialog.FailedFetching
                onRetry={refetch}
                onClose={editPlateCompanyDialog.close}
            />
        );
    }

    if (isLoading || !data?.plateCompany) {
        return <FullDialog.FetchingProcess />;
    }

    return (
        <EditPlateCompanyForm
            company={data.plateCompany}
            onClose={editPlateCompanyDialog.close}
            refetch={refetch}
        />
    );
}
