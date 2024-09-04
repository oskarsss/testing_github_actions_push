import Tooltip from '@/layouts/UserLayout/Navigation/components/Tooltip/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import { getPublicURL } from '@/configs/storage';
import AccountGrpcService from '@/@grpcServices/services/account.service';
import { type MouseEventHandler, useMemo } from 'react';
import navigateToPage from '@/utils/navigateToPage';
import { useAllUsers } from '@/@grpcServices/services/users-service/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import clsx from 'clsx';
import styles from './VUIKNavLogout.module.scss';

type Props = {
    isFullVisible: boolean;
};

export default function UserInfo({ isFullVisible }: Props) {
    const router = useRouter();
    const { users: companyUsers } = useAllUsers();
    const { t } = useAppTranslation('navigation');

    const { data: accountData } = AccountGrpcService.endpoints.getAccount.useQueryState({});

    const companyUser = useMemo(
        () => companyUsers.find((companyUser) => companyUser.userId === accountData?.user?.userId),
        [companyUsers, accountData?.user?.userId]
    );

    if (!accountData) {
        return null;
    }

    const { user } = accountData;

    // eslint-disable-next-line no-nested-ternary
    const urlAvatar = user?.selfieThumbUrl
        ? user.selfieThumbUrl.includes('http')
            ? user.selfieThumbUrl
            : getPublicURL(user.selfieThumbUrl)
        : '';

    const goToProfile: MouseEventHandler<HTMLDivElement> = (e) => {
        if (router.pathname !== '/settings') {
            navigateToPage('/settings', e);
        }
    };

    return (
        <Tooltip
            placement="bottom"
            title={isFullVisible ? '' : t('tooltips.go_to_profile')}
            disableHoverListener={isFullVisible}
        >
            <div
                onClick={goToProfile}
                className={clsx(styles.userInfoContent, {
                    [styles.active]: router.pathname !== '/settings'
                })}
            >
                <Tooltip
                    placement="right"
                    disableHoverListener={!isFullVisible}
                    title={`${t('tooltips.go_to_profile')} ${user?.firstName} ${user?.lastName}`}
                >
                    <Avatar
                        alt={`${user?.firstName} ${user?.lastName}`}
                        sx={{ width: 32, height: 32, fontSize: 14 }}
                        src={urlAvatar}
                    >
                        {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
                    </Avatar>
                </Tooltip>

                <div
                    className={clsx(styles.userInfo, {
                        [styles.isFullVisible]: isFullVisible
                    })}
                >
                    <span className={styles.name}>{`${user?.firstName} ${user?.lastName}`}</span>
                    <span className={styles.email}>{companyUser?.title ?? ''}</span>
                </div>
            </div>
        </Tooltip>
    );
}
