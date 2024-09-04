import { menuHookFabric } from '@/utils/menu-hook-fabric';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import SelectBrokerMembers from '@/views/dispatch/orders/menus/select-client-members/SelectBrokerMembers';
import SelectCustomerMembers from '@/views/dispatch/orders/menus/select-client-members/SelectCustomerMembers';

export const useSelectClientMembersMenu = menuHookFabric(SelectClientMembersMenu, {
    cleanContentOnClose: true
});

type Props = {
    brokerId: string;
    customerId: string;
    clientName: string;
    orderId: string;
    orderFriendlyId: string;
};

function SelectClientMembersMenu({
    brokerId,
    customerId,
    clientName,
    orderId,
    orderFriendlyId
}: Props) {
    const menu = useSelectClientMembersMenu(true);
    const {
        data,
        isLoading
    } = LoadsGrpcService.useGetUsersAssignedToOrderQuery({
        loadId: orderId
    });

    if (brokerId) {
        return (
            <SelectBrokerMembers
                assignedMembers={data?.userIds}
                brokerId={brokerId}
                orderId={orderId}
                clientName={clientName}
                orderFriendlyId={orderFriendlyId}
                onCloseMenu={menu.close}
                assignedMembersLoading={isLoading}
            />
        );
    }

    if (customerId) {
        return (
            <SelectCustomerMembers
                assignedMembers={data?.userIds}
                customerId={customerId}
                orderId={orderId}
                clientName={clientName}
                orderFriendlyId={orderFriendlyId}
                onCloseMenu={menu.close}
                assignedMembersLoading={isLoading}
            />
        );
    }

    return null;
}
