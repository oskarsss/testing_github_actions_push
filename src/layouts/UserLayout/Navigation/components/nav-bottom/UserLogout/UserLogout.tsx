import { useState } from 'react';
import { CircularProgress, Dialog } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store/hooks';
import { LoginActions } from '@/store/auth/login/slice';
import UserInfo from '@/layouts/UserLayout/Navigation/components/nav-bottom/UserLogout/UserInfo';
import Logout from '@/layouts/UserLayout/Navigation/components/nav-bottom/UserLogout/Logout';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import clsx from 'clsx';
import AuthProcessing from '@/@core/ui-kits/basic/auth-processing';
import styles from './VUIKNavLogout.module.scss';

type Props = {
    isFullVisible: boolean;
};

export default function UserLogout({ isFullVisible }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation('navigation');
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useAuth();

    const exit = () => {
        dispatch(LoginActions.SetStep(1));
        setIsLoading(true);
        setTimeout(logout, 1000);
    };

    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.wrapperFullVisible]: isFullVisible
            })}
        >
            <UserInfo isFullVisible={isFullVisible} />

            <Logout
                isFullVisible={isFullVisible}
                onClick={exit}
            />

            <Dialog open={isLoading}>
                <AuthProcessing
                    text={t('signing_out')}
                    className={styles.logoutProcessing}
                />
            </Dialog>
        </div>
    );
}
