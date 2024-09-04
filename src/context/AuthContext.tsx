/* eslint-disable no-nested-ternary */
// ** React Imports
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Config
import { AUTHORIZED_USER } from '@/store/auth/api';
import { AppActions } from '@/store/app/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { api } from '@/store/api';
import { deleteCookie } from 'cookies-next';
import Spinner from '@/@core/components/spinner/Spinner';
import UserLayout from '@/layouts/UserLayout/UserLayout';
import BlankLayout from '@/layouts/BlankLayout/BlankLayout';
import { LoginActions } from '@/store/auth/login/slice';
import AccountGrpcService from '@/@grpcServices/services/account.service';
import { LOADS_STORAGE_CONSTANTS } from '@/store/dispatch/loads/slice';
import { TRACKING_LOCAL_STORAGE_CONFIG } from '@/store/dispatch/tracking/slice';

type AuthContextType = {
    logout: () => void;
};

const defaultProvider: AuthContextType = {
    logout: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultProvider);

type Props = {
    children: React.ReactNode;
};

const leadingSlashRegExp = /^\/$/;

const notFoundRoutesRegExp = /^\/404/;
const publicRoutesRegExp =
    /^(\/login)|^(\/forgot-password)|^(\/register)|^(\/join)|^(\/accept-invite)/;

const quickbooksConnectRoutesRegExp = /^(\/join)|^(\/settings\/integrations\/quickbooks\/launch)/;
const quickbooksDisconnectRoutesRegExp =
    /^(\/join)|^(\/settings\/integrations\/quickbooks\/disconnect)/;

const joinRouteRegExp = /^(\/join)|^(\/forgot-password)|^(\/accept-invite)/;

const logoutLogging = (place: string) => console.debug(`${place}--- LOGOUT`);

const AuthProvider = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    const reduxToken = useAppSelector((state) => state.app.token);
    const reduxCompanyId = useAppSelector((state) => state.app.company_id);
    const [credentials, setCredentials] = useState({
        token     : reduxToken,
        company_id: reduxCompanyId
    });

    const [isLoading, setIsLoading] = useState(true);
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [routeLoaded, setRouteLoaded] = useState('');

    const router = useRouter();
    const handleLogout = useCallback(() => {
        const settings = window.localStorage.getItem('settings');
        const company_id = window.localStorage.getItem(AUTHORIZED_USER.COMPANY_ID);
        const loads_views = window.localStorage.getItem(LOADS_STORAGE_CONSTANTS.VIEWS);
        const trucking_views = window.localStorage.getItem(TRACKING_LOCAL_STORAGE_CONFIG.VIEWS);
        let settings_mode = null;

        setIsLoading(true);
        setUserAuthenticated(false);
        setRouteLoaded('');
        dispatch(AppActions.Logout());
        dispatch(AppActions.SelectCompany(''));

        dispatch(api.util.resetApiState());

        if (settings) {
            settings_mode = JSON.parse(settings).mode;
        }

        window.localStorage.clear();
        window.sessionStorage.clear();

        if (settings_mode) {
            window.localStorage.setItem('settings', JSON.stringify({ mode: settings_mode }));
        }
        if (company_id) {
            window.localStorage.setItem(AUTHORIZED_USER.COMPANY_ID, company_id);
        }
        if (loads_views) {
            window.localStorage.setItem(LOADS_STORAGE_CONSTANTS.VIEWS, loads_views);
        }
        if (trucking_views) {
            window.localStorage.setItem(TRACKING_LOCAL_STORAGE_CONFIG.VIEWS, trucking_views);
        }

        deleteCookie(AUTHORIZED_USER.ID_TOKEN);
        deleteCookie('isAuthenticated');
        router.replace('/login').then(() => {
            setRouteLoaded('/login');
        });
    }, []);

    useEffect(() => {
        router.prefetch('/login');
        router.prefetch('/home');
        router.prefetch('/forgot-password');
        router.prefetch('/register');

        // window.getStore = GrpcStoreApi.getState;
    }, []);

    const {
        token,
        company_id
    } = credentials;

    useEffect(() => {
        setCredentials({ token: reduxToken, company_id: reduxCompanyId });

        // If no credentials, do nothing
        if (!token || !company_id) {
            return;
        }

        // If credentials are the same - do nothing
        if (reduxToken === token && reduxCompanyId === company_id) {
            return;
        }

        dispatch(api.util.resetApiState());
        window.sessionStorage.clear();
    }, [token, company_id, dispatch, reduxCompanyId, reduxToken]);

    useEffect(() => {
        const token =
            reduxToken || (window.localStorage.getItem(AUTHORIZED_USER.ID_TOKEN) as string);

        if (!token) {
            if (
                publicRoutesRegExp.test(router.pathname) ||
                quickbooksConnectRoutesRegExp.test(router.pathname) ||
                quickbooksDisconnectRoutesRegExp.test(router.pathname)
            ) {
                setIsLoading(false);
                return;
            }
            logoutLogging('LINE 150: No token found in effect');
            handleLogout();
            return;
        }

        if (!reduxToken) {
            dispatch(AppActions.SetToken(token as string));
        }

        // const company_id = window.localStorage.getItem(AUTHORIZED_USER.COMPANY_ID);
        // if (company_id && reduxCompanyId !== company_id) {
        //     dispatch(AppActions.SelectCompany(company_id));
        // }
        setIsLoading(true);
        setRouteLoaded('');

        // Promise.all([
        dispatch(AccountGrpcService.endpoints.getAccount.initiate({}))
            .unwrap()
            .then((res) => {
                const isHideOnboarding = res.companies.find(
                    (company) => company.companyId === reduxCompanyId
                )?.onboardingCompleted;

                // if (account.token) {

                if (
                    (publicRoutesRegExp.test(router.pathname) &&
                        !joinRouteRegExp.test(router.pathname)) ||
                    leadingSlashRegExp.test(router.pathname) ||
                    notFoundRoutesRegExp.test(router.pathname)
                ) {
                    if (isHideOnboarding) {
                        router.replace('/analytics').then(() => {
                            setUserAuthenticated(true);
                            setRouteLoaded('/analytics');
                        });
                        return;
                    }
                    router.replace('/home').then(() => {
                        setUserAuthenticated(true);
                        setRouteLoaded('/home');
                    });
                    return;
                }
                if (router.pathname === '/home' && isHideOnboarding) {
                    router.replace('/analytics').then(() => {
                        setUserAuthenticated(true);
                        setRouteLoaded('/analytics');
                    });
                    return;
                }
                setUserAuthenticated(true);
                setRouteLoaded(router.pathname);

                // }
            })
            .catch((error) => {
                logoutLogging(JSON.stringify(error));
                logoutLogging('LINE 209: Error in get account');
                if (error.code === 'UNAUTHENTICATED' || error.code === 'UNKNOWN') {
                    console.debug('Correct logout', error);
                    window.localStorage.removeItem(AUTHORIZED_USER.COMPANY_ID);
                    handleLogout();
                    logoutLogging('LINE 212: Correct logout');
                }
            });
    }, [reduxToken, reduxCompanyId]);

    useEffect(() => {
        if (isLoading && routeLoaded === router.pathname) {
            dispatch(LoginActions.SetLoading(false));
            setIsLoading(false);
        }
    }, [isLoading, routeLoaded, router.pathname]);

    const values = useMemo<AuthContextType>(
        () => ({
            logout: handleLogout
        }),
        []
    );

    const Layout = useMemo(() => {
        if (isLoading) {
            return <Spinner />;
        }
        if (userAuthenticated && routeLoaded) {
            return <UserLayout>{children}</UserLayout>;
        }
        return <BlankLayout>{children}</BlankLayout>;
    }, [isLoading, children, routeLoaded]);

    return <AuthContext.Provider value={values}>{Layout}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
