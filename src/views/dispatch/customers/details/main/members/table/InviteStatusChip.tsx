import { IChipColors, StatusChipWithDot } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { CustomerModel_User_Status } from '@proto/models/model_customer';

type Props = {
    status: CustomerModel_User_Status;
};

export const CustomerUserStatuses = Object.freeze({
    INVITED : 'invited',
    ACTIVE  : 'active',
    DISABLED: 'disabled',
    DELETED : 'deleted'
});

export type UserStatus = (typeof CustomerUserStatuses)[keyof typeof CustomerUserStatuses];

const USER_STATUS_COLORS: Record<CustomerModel_User_Status, IChipColors> = {
    [CustomerModel_User_Status.ACTIVE]     : 'success',
    [CustomerModel_User_Status.DELETED]    : 'error',
    [CustomerModel_User_Status.DISABLED]   : 'gray',
    [CustomerModel_User_Status.INVITED]    : 'yellow',
    [CustomerModel_User_Status.UNSPECIFIED]: 'yellow'
} as const;

export const UserStatusGrpcEnumMap: Record<CustomerModel_User_Status, UserStatus> = {
    [CustomerModel_User_Status.UNSPECIFIED]: 'disabled',
    [CustomerModel_User_Status.INVITED]    : 'invited',
    [CustomerModel_User_Status.ACTIVE]     : 'active',
    [CustomerModel_User_Status.DISABLED]   : 'disabled',
    [CustomerModel_User_Status.DELETED]    : 'deleted'
} as const;

export default function CustomerMembersStatusChip({ status }: Props) {
    const { t } = useAppTranslation();
    const color = USER_STATUS_COLORS[status] || 'yellow';

    return (
        <StatusChipWithDot
            color={color}
            status={t(`state_info:user.status.${UserStatusGrpcEnumMap[status]}`)}
        />
    );
}
