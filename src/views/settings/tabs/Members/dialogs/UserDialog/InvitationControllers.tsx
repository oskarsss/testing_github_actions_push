import { Button } from '@mui/material';
import React from 'react';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';
import { GetUsersReply_User } from '@proto/users';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { UserStatusGrpcEnumMap } from './helpers';

type Props = {
    user: GetUsersReply_User;
};

export default function InvitationControllers({ user }: Props) {
    const { t } = useAppTranslation();
    const [resendInvite] = UsersGrpcService.useResendInviteMutation();
    const copy = useCopyToClipboard();

    const copyInvite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();

        if (user) {
            copy(`${SYSTEM.TMS_LINK}/join/${user.invite?.token}`);
        }
    };

    const onResendInvite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();

        if (user) {
            resendInvite({ userId: user.userId });
        }
    };

    if (UserStatusGrpcEnumMap[user.status] !== 'invited') {
        return null;
    }

    return (
        <div
            style={{
                display       : 'flex',
                flexDirection : 'row',
                justifyContent: 'space-between',
                alignItems    : 'center'
            }}
        >
            <Button onClick={copyInvite}>
                {t('modals:settings.user.add_update.buttons.copy_invite')}
            </Button>
            <Button onClick={onResendInvite}>
                {t('modals:settings.user.add_update.buttons.resend_invite')}
            </Button>
        </div>
    );
}
