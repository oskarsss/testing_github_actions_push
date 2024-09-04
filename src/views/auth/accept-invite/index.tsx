import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import React from 'react';
import { Button, Stack } from '@mui/material';
import SYSTEM from '@/@system';
import { useRouter } from 'next/router';
import { ContainerLogo, Content, Wrap } from '@/views/auth/join/styled';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { onSuccessLogin } from '@/store/auth/api';
import { useAppDispatch } from '@/store/hooks';
import { AppActions } from '@/store/app/slice';
import NewPasswordPageStyled from '../forgot-password/NewPasswordPage/styled';
import AuthContainer from '../components/AuthContainer/AuthContainer';
import AuthLoader from '../components/AuthLoader/AuthLoader';
import AuthLogo from '../components/AuthLogo/AuthLogo';
import AuthContentWrapper from '../components/AuthContentWrapper/AuthContentWrapper';

type Props = { token: string };

export default function AcceptInvite({ token }: Props) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        data,
        error,
        isLoading
    } = authGrpcApi.useRetrieveInviteQuery(
        {
            token
        },
        {
            skip: !token
        }
    );

    const [acceptTrigger, acceptTriggerInvite] = authGrpcApi.useInviteAcceptAndLoginMutation();

    const declineHandler = async () => {
        router.push('/login');
    };

    const acceptHandler = async () => {
        const data = await acceptTrigger({
            inviteToken: token
        }).unwrap();
        router.push('/').then(() => {
            if (data) {
                dispatch(onSuccessLogin(data.token));
                dispatch(AppActions.SelectCompany(data.companyId));
            }
        });
    };

    const { t } = useAppTranslation();
    return (
        <AuthContainer>
            <Wrap>
                <ContainerLogo>
                    <AuthLogo />
                </ContainerLogo>

                <AuthContentWrapper>
                    <Content
                        sx={{
                            ...(data?.isUserRegistered && {
                                display       : 'flex',
                                alignItems    : 'center',
                                justifyContent: 'center',
                                flexDirection : 'column',
                                minHeight     : 250
                            })
                        }}
                    >
                        {(isLoading || acceptTriggerInvite.isLoading) && <AuthLoader />}

                        {error && (
                            <ErrorScreen
                                onClick={() => {
                                    router.push(`mailto:${SYSTEM.SUPPORT_EMAIL}`);
                                }}
                                configType={ErrorScreenType.JOIN_INVITE}
                                withoutBorder
                            />
                        )}

                        {data && (
                            <Stack
                                direction="column"
                                alignItems="flex-start"
                                justifyContent="space-between"
                                flex="1 1 100%"
                            >
                                <Stack
                                    direction="column"
                                    width="100%"
                                >
                                    <NewPasswordPageStyled.Title>
                                        <span>{data.companyName}</span>{' '}
                                        {t('auth:join.header.title', {
                                            name: SYSTEM.TMS_FRIENDLY_NAME
                                        })}
                                    </NewPasswordPageStyled.Title>
                                </Stack>
                                <Stack
                                    direction="row"
                                    width="100%"
                                    gap={10}
                                >
                                    <Button
                                        onClick={declineHandler}
                                        fullWidth
                                        variant="outlined"
                                        color="error"
                                        disabled={acceptTriggerInvite.isLoading}
                                    >
                                        {t('auth:join.buttons.decline')}
                                    </Button>
                                    <Button
                                        onClick={acceptHandler}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={acceptTriggerInvite.isLoading}
                                    >
                                        {t('auth:join.buttons.accept')}
                                    </Button>
                                </Stack>
                            </Stack>
                        )}
                    </Content>
                </AuthContentWrapper>
            </Wrap>
        </AuthContainer>
    );
}
