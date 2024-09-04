import { GetUsersReply_User } from '@proto/users';
import Avatar from '@mui/material/Avatar';
import { getPublicURL } from '@/configs/storage';

type Props = {
    user: GetUsersReply_User;
};

export default function DispatcherAvatar({ user }: Props) {
    return (
        <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={getPublicURL(user.selfieThumbUrl)}
            sx={{
                width      : 22,
                height     : 22,
                marginRight: '5px',
                fontSize   : '10px'
            }}
        >
            {user.firstName?.charAt(0).toUpperCase()}
            {user.lastName?.charAt(0).toUpperCase()}
        </Avatar>
    );
}
