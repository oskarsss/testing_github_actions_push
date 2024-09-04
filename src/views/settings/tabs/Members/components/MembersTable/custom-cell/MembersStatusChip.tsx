import { USER_STATUS_COLORS } from '@/@core/theme/entities/user/status';
import { UserStatusGrpcEnumMap } from '@/views/settings/tabs/Members/dialogs/UserDialog/helpers';
import React from 'react';
import { UserModel_Status } from '@proto/models/model_user';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { StatusChipWithDot } from '@/@core/theme/chip';

type Props = {
    status: UserModel_Status;
};

export default function MembersStatusChip({ status }: Props) {
    const { t } = useAppTranslation();
    const color = USER_STATUS_COLORS[UserStatusGrpcEnumMap[status]] || 'yellow';

    return (
        <StatusChipWithDot
            color={color}
            status={t(`state_info:user.status.${UserStatusGrpcEnumMap[status]}`)}
        />
    );
}
