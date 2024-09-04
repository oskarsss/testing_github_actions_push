import { TestIDs } from '@/configs/tests';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { MouseEvent } from 'react';
import { useOptionsMenu } from '@/views/fleet/drivers/Details/menus/Options/Options';
import { latestActivity } from '@/@core/ui-kits/page-headers/components/AvatarGroup/utils';
import { getPublicURL } from '@/configs/storage';
import { useUserPings } from '@/store/streams/events/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useUsersMap } from '@/store/hash_maps/hooks';
import UserMarkup from './UserMarkup';

type Props = {
    type?: string;
    id: string;
    user_id: string;
    onRemove: (config: { id: string; user_id: string }) => Promise<unknown>;
};

export default function User({
    type,
    id,
    user_id,
    onRemove
}: Props) {
    const confirm = useConfirm();
    const optionsMenu = useOptionsMenu();
    const user = useUsersMap(user_id);
    const userPing = useUserPings(user_id);
    const { t } = useAppTranslation();

    // const lastPing = usersPings ? usersPings[0];

    const remove = () => {
        confirm({
            icon: <DangerousIcon color="secondary" />,
            title:
                type === 'driver'
                    ? 'common:profile.right.assigned_users.dialogs.unassign.title'
                    : 'trucks:profile.right.assigned_users.dialogs.unassign.title',
            body:
                type === 'driver'
                    ? 'common:profile.right.assigned_users.dialogs.unassign.body'
                    : 'trucks:profile.right.assigned_users.dialogs.unassign.body',
            confirm_text      : 'common:button.unassign',
            translationOptions: {
                title: {
                    name: user?.firstName || ''
                }
            },
            onConfirm: () => onRemove({ id, user_id })
        });
    };

    const openOptionsMenu = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        optionsMenu.open({
            copy_text : 'common:phone',
            copy_value: user?.phone || '',
            onRemove  : remove,
            test_id   : TestIDs.pages.truckProfile.buttons.removeUser
        })(e);
    };

    const last_seen = latestActivity(userPing?.timestamp || 0, t);

    return (
        <UserMarkup
            full_name={`${user?.firstName || ''} ${user?.lastName || ''}`}
            src={getPublicURL(user?.selfieUrl)}
            last_seen={last_seen}
            onOpenOptionsMenu={openOptionsMenu}
            is_hover_exist={false}
        />
    );
}
