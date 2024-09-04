import { useEditCustomerForm } from '@/views/dispatch/customers/dialogs/EditCustomer/EditCustomerForm';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useEditCustomerDialog } from '@/views/dispatch/customers/dialogs/EditCustomer/EditCustomer';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import type { CustomerModel_Customer } from '@proto/models/model_customer';

type Props = {
    customer: CustomerModel_Customer;
    isMutationLoading: boolean;
    onClose: () => void;
};

export default function EditCustomerHeader({
    customer,
    isMutationLoading,
    onClose
}: Props) {
    const [deleteCustomer, { isLoading }] = CustomersGrpcService.useDeleteCustomerMutation();
    const {
        formState: { isDirty }
    } = useEditCustomerForm();

    const editCustomerDialog = useEditCustomerDialog();

    const onClickDelete = () => {
        deleteCustomer({ customerId: customer.customerId }).unwrap().then(editCustomerDialog.close);
    };

    return (
        <FullDialog.Header>
            <FullDialog.HeaderTitle title="modals:customers.edit.title">
                {' '}
                <FullDialog.CopyText text={customer.name} />
            </FullDialog.HeaderTitle>

            <FullDialog.ActionsWrapper>
                <FullDialog.DeleteButton
                    disabled={isMutationLoading}
                    isLoading={isLoading}
                    onClick={onClickDelete}
                />
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={isMutationLoading}
                    type="update"
                />
                <FullDialog.CloseButton onClose={onClose} />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
