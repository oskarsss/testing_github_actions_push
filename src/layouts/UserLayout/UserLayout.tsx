/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode, useEffect } from 'react';
import moment from 'moment-timezone';
import { useLayoutSettings } from '@/hooks/useLayoutSettings';

import { Analytics } from '@vercel/analytics/react';

import { Toaster } from 'react-hot-toast';

import NewLoadsButton from '@/views/new-loads/NewLoadsLayoutBtn';

// import { useUserPing } from '@/services/streams/users';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store/hooks';

// import { EventsStream } from '@/services/streams/events/events';
import { IntercomProvider } from 'react-use-intercom';
import { useAccount, useAccountCompanies } from '@/store/app/hooks';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';

// import EventsGrpcService from '@/services/streams/events/events';
import LoadboardStreams from '@/views/loadboard/streams/LoadboardStreams';
import VerticalNavItems from './Navigation/navigation_config';
import Reminder from './Reminder/Reminder';
import Navigation from './Navigation/Navigation';
import EventStream from './EventStream';
import styles from './UserLayout.module.scss';
import UserLayoutStyled from './UserLayout.styled';

moment.updateLocale('en', {
    week: {
        dow: 1
    }
});

type Props = {
    children: ReactNode;
};

const hideNavWhenRouteRegExp = /^(\/join)|^(\/forgot-password)/;

export default function UserLayout({ children }: Props) {
    const dispatch = useAppDispatch();
    const [postPing] = UsersGrpcService.usePingUserMutation();
    const route = useRouter();

    // useEffect(() => {
    //     const deviceId = getDeviceId();
    //     dispatch(EventsGrpcService.endpoints.listen.initiate({ deviceId }));
    // }, [dispatch]);

    // const isHideOnboarding = useAppSelector(appHideOnboardingSelector);

    const { user } = useAccount();
    const { company } = useAccountCompanies();

    // ** Hooks
    const {
        settings,
        saveSettings
    } = useLayoutSettings();

    useEffect(() => {
        const hasFocus = () => typeof document !== 'undefined' && document.hasFocus();

        const ping = () => setInterval(() => postPing({}), 60000);

        let intervalId: false | null | NodeJS.Timeout = hasFocus() && ping();

        if (hasFocus()) postPing({});

        const onFocus = () => {
            if (!intervalId) {
                intervalId = ping();

                postPing({});
            }
        };

        const onBlur = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);

            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    const navConfig = VerticalNavItems();

    return (
        <IntercomProvider
            appId="mhnikz73"
            autoBoot
            autoBootProps={{
                avatar: {
                    type    : '',
                    imageUrl: user?.selfieUrl || ''
                },
                name   : `${user?.firstName} ${user?.lastName}` || '',
                email  : user?.email || '',
                phone  : user?.phoneNumber || '',
                userId : user?.userId || '',
                company: {
                    companyId: company?.companyId || '',
                    name     : company?.name || ''
                }
            }}
        >
            <div className={styles.wrapper}>
                {settings.navHidden || hideNavWhenRouteRegExp.test(route.pathname) ? null : (
                    <Navigation
                        saveSettings={saveSettings}
                        navItems={navConfig}
                        settings={settings}
                    />
                )}
                <div className={styles.content}>
                    <Reminder />
                    <EventStream />
                    {children}
                </div>
            </div>

            <NewLoadsButton />
            <Analytics />
            {/* <Intercom /> */}
            <UserLayoutStyled.ReactHotToast>
                <Toaster toastOptions={{ className: 'react-hot-toast' }} />
            </UserLayoutStyled.ReactHotToast>
        </IntercomProvider>
    );
}
