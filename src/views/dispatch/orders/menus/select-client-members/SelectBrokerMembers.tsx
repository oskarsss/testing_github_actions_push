import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import { useStableArray } from '@/hooks/useStable';
import { useAddBrokerMemberDialog } from '@/views/dispatch/brokers/details/main/members/modals/AddBrokerMember';
import SelectClientMembersForm from '@/views/dispatch/orders/menus/select-client-members/components/SelectClientMembersForm';

type Props = {
    assignedMembers?: string[];
    assignedMembersLoading?: boolean;
    brokerId: string;
    orderId: string;
    clientName: string;
    orderFriendlyId: string;
    onCloseMenu: () => void;
};

export default function SelectBrokerMembers({
    assignedMembers,
    assignedMembersLoading,
    brokerId,
    orderId,
    orderFriendlyId,
    clientName,
    onCloseMenu
}: Props) {
    const addBrokerMemberDialog = useAddBrokerMemberDialog();
    const [assignedBrokerUsers, brokerAssignState] =
        LoadsGrpcService.useAssignBrokerUserToOrderMutation();
    const [removeBrokerUsers, brokerRemoveState] =
        LoadsGrpcService.useRemoveBrokerUserFromOrderMutation();
    const { data } = BrokersGrpcService.useGetBrokerUsersQuery({ brokerId });
    const users = useStableArray(data?.users);

    const onAddNewMember = (searchText: string) => {
        addBrokerMemberDialog.open({
            brokerId,
            defaultValues: { firstName: searchText }
        });
    };

    const assignUsersToOrder = async (userIds: string[]) => {
        await assignedBrokerUsers({ loadId: orderId, userIds }).unwrap();
    };

    const removeUsersFromOrder = async (userIds: string[]) => {
        await removeBrokerUsers({ loadId: orderId, userIds }).unwrap();
    };

    return (
        <SelectClientMembersForm
            assignedMembers={assignedMembers}
            clientName={clientName}
            orderFriendlyId={orderFriendlyId}
            onCloseMenu={onCloseMenu}
            onAddNewMember={onAddNewMember}
            loading={brokerAssignState.isLoading || brokerRemoveState.isLoading}
            users={users}
            assignUsersToOrder={assignUsersToOrder}
            removeUsersFromOrder={removeUsersFromOrder}
            assignedMembersLoading={assignedMembersLoading}
        />
    );
}
