import FullDialog from '@/@core/ui-kits/full-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import React from 'react';
import EditFuelTransactionForm from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/components/EditFuelTransactionForm';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';

type Props = {
    fuelTransactionId: string;
    onSuccessfulEdit?: () => void;
};

export const useEditFuelTransactionDialog = hookFabric(EditFuelTransaction, FullDialog.Dialog);

function EditFuelTransaction({
    fuelTransactionId,
    onSuccessfulEdit
}: Props) {
    const dialog = useEditFuelTransactionDialog(true);

    const {
        data,
        isError,
        isLoading,
        isSuccess,
        refetch
    } = FuelGrpcService.useRetrieveFuelQuery(
        { fuelTransactionId },
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

    if (isLoading || !isSuccess || !data?.fuel) return <FullDialog.FetchingProcess />;

    return (
        <EditFuelTransactionForm
            fuel={data.fuel}
            onSuccessfulEdit={onSuccessfulEdit}
        />
    );
}

export default EditFuelTransaction;
