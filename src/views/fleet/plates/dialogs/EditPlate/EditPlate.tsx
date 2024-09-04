import { hookFabric } from '@/utils/dialog-hook-fabric';
import PlatesTypes from '@/store/fleet/plates/types';
import FullDialog from '@/@core/ui-kits/full-dialog';
import PlatesGrpcService from '@/@grpcServices/services/plates.service';
import { PlateRetrieveReply } from '@proto/plates';
import EditPlateForm from './EditPlateForm';

export const useEditPlateDialog = hookFabric(EditPlate, FullDialog.Dialog);

type Props = {
    plate_id: PlatesTypes.Plate['plate_id'];
    document_id?: string;
};
function EditPlate({
    plate_id,
    document_id
}: Props) {
    const dialog = useEditPlateDialog(true);
    const {
        data,
        isError,
        isLoading,
        isSuccess,
        refetch,
        plate
    } =
        PlatesGrpcService.useRetrievePlateQuery(
            { plateId: plate_id },
            {
                refetchOnMountOrArgChange: true,
                selectFromResult         : (result) => ({
                    plate: result.data?.plate
                        ? result.data?.plate
                        : PlateRetrieveReply.create().plate,
                    ...result
                })
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

    if (isLoading || !isSuccess || !plate) return <FullDialog.FetchingProcess />;
    return (
        <EditPlateForm
            plate={plate}
            document_id={document_id}
            refetch={refetch}
        />
    );
}
