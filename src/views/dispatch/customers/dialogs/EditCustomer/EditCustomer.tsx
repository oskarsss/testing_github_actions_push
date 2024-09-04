import FullDialog from '@/@core/ui-kits/full-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import EditCustomerForm from '@/views/dispatch/customers/dialogs/EditCustomer/EditCustomerForm';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';

export const useEditCustomerDialog = hookFabric(EditCustomer, (props) => (
    <FullDialog.Dialog
        open={props.open}
        onClose={props.onClose}
        onExited={() => props.onExited?.()}
        paperStyles={{
            width: '1650px'
        }}
    >
        {props.children}
    </FullDialog.Dialog>
));

type Props = {
    customerId: string;
    document_id?: string;
};

function EditCustomer({
    customerId,
    document_id = ''
}: Props) {
    const dialog = useEditCustomerDialog(true);
    const {
        data,
        isError,
        isLoading,
        isSuccess,
        refetch
    } =
        CustomersGrpcService.useRetrieveCustomerQuery(
            { customerId },
            {
                refetchOnMountOrArgChange: true
            }
        );

    if (isError) {
        return (
            <FullDialog.FailedFetching
                onClose={dialog.close}
                onRetry={refetch}
            />
        );
    }

    if (isLoading || !isSuccess || !data || !data.customer) return <FullDialog.FetchingProcess />;

    return (
        <EditCustomerForm
            refetch={refetch}
            customer={data.customer}
            document_id={document_id}
        />
    );
}
