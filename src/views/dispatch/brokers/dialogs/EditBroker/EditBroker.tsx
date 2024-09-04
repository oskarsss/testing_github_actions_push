import FullDialog from '@/@core/ui-kits/full-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useBroker } from '@/store/dispatch/brokers/hooks';
import EditBrokerForm from '@/views/dispatch/brokers/dialogs/EditBroker/EditBrokerForm';
import { DefaultValues } from '@/views/dispatch/brokers/dialogs/EditBroker/edit-broker-utils';

type Props = {
    brokerId: string;
    document_id?: string;
    onSuccessfulEdit?: (data: DefaultValues) => void;
};

export const useEditBrokerDialog = hookFabric(EditBroker, FullDialog.Dialog);

function EditBroker({
    brokerId,
    document_id,
    onSuccessfulEdit
}: Props) {
    const dialog = useEditBrokerDialog(true);
    const {
        data,
        isLoading,
        isError,
        refetch
    } = useBroker(brokerId);

    if (isError) {
        return (
            <FullDialog.FailedFetching
                onRetry={refetch}
                onClose={dialog.close}
            />
        );
    }

    if (isLoading || !data) return <FullDialog.FetchingProcess />;

    return (
        <EditBrokerForm
            broker={data}
            document_id={document_id}
            refetch={refetch}
            onSuccessfulEdit={onSuccessfulEdit}
        />
    );
}
