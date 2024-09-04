import { useUsersMap } from '@/store/hash_maps/hooks';
import { SxProps } from '@mui/material';
import AvatarsGroupStyled from '@/@core/components/avatars-group/AvatarGroup.styled';
import UserAvatar from './UserAvatar';

type Props = {
    usersIds: string[];
    maxAvatarCounts?: number;
    avatarStyles?: SxProps;
};

function UsersAvatarsGroup({
    usersIds,
    maxAvatarCounts = 5,
    avatarStyles
}: Props) {
    const usersMap = useUsersMap();
    return (
        <AvatarsGroupStyled.AvatarGroup
            max={maxAvatarCounts}
            total={usersIds.length}
            slotProps={{
                additionalAvatar: {
                    sx: avatarStyles
                }
            }}
        >
            {usersIds.map((userId) => {
                const cachedUser = usersMap[userId];
                if (!cachedUser) return null;

                const initials = `${cachedUser.firstName[0]}${cachedUser.lastName[0]}`;
                return (
                    <UserAvatar
                        userUrl={cachedUser.selfieThumbUrl}
                        initials={initials}
                        tooltipTitle={`${cachedUser.firstName} ${cachedUser.lastName}`}
                        key={userId}
                        styles={avatarStyles}
                    />
                );
            })}
        </AvatarsGroupStyled.AvatarGroup>
    );
}

export default UsersAvatarsGroup;
