import { memo } from 'react';
import { Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import UsersAvatarsGroup from '@/@core/components/avatars-group/users-avatars-group/UsersAvatarsGroup';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { useUsersMap } from '@/store/hash_maps/hooks';

type Props = {
    users: string[];
};

function TruckUsers({ users }: Props) {
    const { t } = useAppTranslation();
    const usersMap = useUsersMap();

    if (!users.length) {
        return (
            <Typography
                variant="body2"
                textTransform="uppercase"
            >
                {t('common:empty.no_users')}
            </Typography>
        );
    }

    return (
        <UsersAvatarsGroup
            usersIds={users}
            avatarStyles={{
                fontSize: '10px',
                width   : 22,
                height  : 22
            }}
        />
    );
}

export default memo(TruckUsers);
