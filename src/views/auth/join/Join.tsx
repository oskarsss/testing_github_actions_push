import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import AuthContainer from '@/views/auth/components/AuthContainer/AuthContainer';
import AuthContentWrapper from '@/views/auth/components/AuthContentWrapper/AuthContentWrapper';
import AuthLoader from '@/views/auth/components/AuthLoader/AuthLoader';
import AuthLogo from '@/views/auth/components/AuthLogo/AuthLogo';
import { ContainerLogo, Content, Wrap } from '@/views/auth/join/styled';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import SYSTEM from '@/@system';
import { Stack } from '@mui/material';
import FormJoin from './components/FormJoin';
import NewPasswordPageStyled from '../forgot-password/NewPasswordPage/styled';
import RegisteredUserJoin from './components/RegisteredUserJoin';

export default function Join() {
    const router = useRouter();

    const { id } = router.query;

    const {
        data,
        error,
        isLoading
    } = authGrpcApi.useRetrieveInviteQuery({
        token: id as string
    });

    useEffect(() => {
        if (!id && router.isReady) {
            router.replace('/register');
        }
    }, [id, router]);

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
                        {isLoading && <AuthLoader />}

                        {error && (
                            <ErrorScreen
                                onClick={() => {
                                    router.push(`mailto:${SYSTEM.SUPPORT_EMAIL}`);
                                }}
                                configType={ErrorScreenType.JOIN_INVITE}
                                withoutBorder
                            />
                        )}

                        {data && <FormJoin data={data} />}
                        {/* {data && data.isUserRegistered && (
                            <RegisteredUserJoin 
                                token={id as string}
                                data={data} />
                        )} */}
                    </Content>
                </AuthContentWrapper>
            </Wrap>
        </AuthContainer>
    );
}
