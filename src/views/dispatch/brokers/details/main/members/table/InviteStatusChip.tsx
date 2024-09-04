import { IChipColors, StatusChipWithDot } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { BrokerModel_User_Status } from '@proto/models/model_broker';

type Props = {
    status: BrokerModel_User_Status;
};

export const CustomerUserStatuses = Object.freeze({
    INVITED : 'invited',
    ACTIVE  : 'active',
    DISABLED: 'disabled',
    DELETED : 'deleted'
});

export type UserStatus = (typeof CustomerUserStatuses)[keyof typeof CustomerUserStatuses];

const USER_STATUS_COLORS: Record<BrokerModel_User_Status, IChipColors> = {
    [BrokerModel_User_Status.ACTIVE]     : 'success',
    [BrokerModel_User_Status.DELETED]    : 'error',
    [BrokerModel_User_Status.DISABLED]   : 'gray',
    [BrokerModel_User_Status.INVITED]    : 'yellow',
    [BrokerModel_User_Status.UNSPECIFIED]: 'yellow'
} as const;

export const UserStatusGrpcEnumMap: Record<BrokerModel_User_Status, UserStatus> = {
    [BrokerModel_User_Status.UNSPECIFIED]: 'disabled',
    [BrokerModel_User_Status.INVITED]    : 'invited',
    [BrokerModel_User_Status.ACTIVE]     : 'active',
    [BrokerModel_User_Status.DISABLED]   : 'disabled',
    [BrokerModel_User_Status.DELETED]    : 'deleted'
} as const;

export default function BrokerMembersStatusChip({ status }: Props) {
    const { t } = useAppTranslation();
    const color = USER_STATUS_COLORS[status] || 'yellow';

    return (
        <StatusChipWithDot
            color={color}
            status={t(`state_info:user.status.${UserStatusGrpcEnumMap[status]}`)}
        />
    );
}
