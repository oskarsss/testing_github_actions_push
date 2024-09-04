import LoadCharacteristicsStyled from '@/views/dispatch/orders/Details/sections/load-characteristics/LoadCharacteristics.styled';
import { getPublicURL } from '@/configs/storage';
import { useAllUsers } from '@/@grpcServices/services/users-service/hooks';

type Props = {
    dispatcher_id: string;
};

export default function LoadDispatcherCharacteristic({ dispatcher_id }: Props) {
    const { users } = useAllUsers();
    const dispatcher = users.find((user) => user.userId === dispatcher_id);

    if (!dispatcher_id || !dispatcher) return '-';
    return (
        <LoadCharacteristicsStyled.LoadInfoItemBadge>
            <LoadCharacteristicsStyled.LoadInfoItemAvatar src={getPublicURL(dispatcher.selfieUrl)}>
                {dispatcher.firstName[0]}
                {dispatcher.lastName[0]}
            </LoadCharacteristicsStyled.LoadInfoItemAvatar>
            <LoadCharacteristicsStyled.LoadInfoItemValue
                color="primary"
                textWrap="nowrap"
                fontWeight={500}
            >
                {`${dispatcher.firstName} ${dispatcher.lastName}`}
            </LoadCharacteristicsStyled.LoadInfoItemValue>
        </LoadCharacteristicsStyled.LoadInfoItemBadge>
    );
}
