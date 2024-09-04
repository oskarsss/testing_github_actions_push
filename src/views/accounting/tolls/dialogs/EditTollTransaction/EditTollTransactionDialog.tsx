import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import EditTollTransactionForm from '@/views/accounting/tolls/dialogs/EditTollTransaction/components/EditTollTransactionForm';
import React from 'react';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';

export const useEditTollTransactionDialog = hookFabric(
    EditTollTransactionDialog,
    FullDialog.Dialog
);

type Props = {
    tollId: string;
    onSuccessfulEdit?: () => void;
};

export default function EditTollTransactionDialog({
    tollId,
    onSuccessfulEdit
}: Props) {
    const dialog = useEditTollTransactionDialog(true);

    const {
        data,
        isError,
        isLoading,
        isSuccess,
        refetch
    } = TollsGrpcService.useRetrieveTollQuery(
        { tollId },
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

    if (isLoading || !isSuccess || !data) return <FullDialog.FetchingProcess />;

    return (
        <EditTollTransactionForm
            toll={data}
            onSuccessfulEdit={onSuccessfulEdit}
            closeDialog={dialog.close}
        />
    );
}
