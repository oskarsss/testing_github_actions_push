import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { useStableArray } from '@/hooks/useStable';
import { useAddCustomerMemberDialog } from '@/views/dispatch/customers/details/main/members/modals/AddCustomerMember';
import SelectClientMembersForm from '@/views/dispatch/orders/menus/select-client-members/components/SelectClientMembersForm';

type Props = {
    assignedMembers?: string[];
    assignedMembersLoading?: boolean;
    customerId: string;
    orderId: string;
    clientName: string;
    orderFriendlyId: string;
    onCloseMenu: () => void;
};

export default function SelectCustomerMembers({
    assignedMembers,
    assignedMembersLoading,
    customerId,
    orderId,
    orderFriendlyId,
    clientName,
    onCloseMenu
}: Props) {
    const addCustomerMemberDialog = useAddCustomerMemberDialog();
    const [assignedCustomerUsers, customerAssignState] =
        LoadsGrpcService.useAssignCustomerUserToOrderMutation();
    const [removeCustomerUsers, customerRemoveState] =
        LoadsGrpcService.useRemoveCustomerUserFromOrderMutation();

    const customerUsersState = CustomersGrpcService.useGetCustomerUsersQuery({ customerId });
    const users = useStableArray(customerUsersState.data?.users);

    const onAddNewMember = (searchText: string) => {
        addCustomerMemberDialog.open({
            customerId,
            defaultValues: { firstName: searchText }
        });
    };

    const assignUsersToOrder = async (userIds: string[]) => {
        await assignedCustomerUsers({ loadId: orderId, userIds }).unwrap();
    };

    const removeUsersFromOrder = async (userIds: string[]) => {
        await removeCustomerUsers({ loadId: orderId, userIds }).unwrap();
    };

    return (
        <SelectClientMembersForm
            assignedMembers={assignedMembers}
            clientName={clientName}
            orderFriendlyId={orderFriendlyId}
            onCloseMenu={onCloseMenu}
            onAddNewMember={onAddNewMember}
            loading={customerAssignState.isLoading || customerRemoveState.isLoading}
            users={users}
            assignUsersToOrder={assignUsersToOrder}
            removeUsersFromOrder={removeUsersFromOrder}
            assignedMembersLoading={assignedMembersLoading}
        />
    );
}
