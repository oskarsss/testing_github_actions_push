import { useAppSelector } from '@/store/hooks';
import SendLinkPageStyled from '@/views/auth/forgot-password/SendLinkPage/styled';
import AuthContentWrapper from '@/views/auth/components/AuthContentWrapper/AuthContentWrapper';
import AuthContainer from '@/views/auth/components/AuthContainer/AuthContainer';
import { Box } from '@mui/material';
import SYSTEM from '@/@system';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep/SecondStep';

const isRouteMate = process.env.NEXT_PUBLIC_SYSTEM_THEME_TOKEN === 'ROUTE_MATE';
const { LargeLogo } = SYSTEM.ASSETS;

export default function Login() {
    const step = useAppSelector((state) => state.login.step);

    return (
        <AuthContainer>
            <SendLinkPageStyled.Wrapper>
                <Box
                    display="flex"
                    justifyContent="flex-start"
                    sx={{
                        svg: isRouteMate
                            ? {
                                width : '250px !important',
                                height: '100px !important'
                            }
                            : {
                                width : 180,
                                height: 58
                            }
                    }}
                >
                    <LargeLogo />
                </Box>
                <AuthContentWrapper>
                    {step === 1 ? <FirstStep /> : <SecondStep />}
                </AuthContentWrapper>
            </SendLinkPageStyled.Wrapper>
        </AuthContainer>
    );
}
