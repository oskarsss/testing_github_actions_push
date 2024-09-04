// ** Components Imports
import FirstStepStyled from '@/views/auth/sign-up/SignUp.styled';
import NewPasswordPageStyled from '@/views/auth/forgot-password/NewPasswordPage/styled';
import AuthContentWrapper from '@/views/auth/components/AuthContentWrapper/AuthContentWrapper';
import AuthLogo from '@/views/auth/components/AuthLogo/AuthLogo';
import AuthContainer from '@/views/auth/components/AuthContainer/AuthContainer';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SignUpForm from './components/SignUpForm';

export default function SignUp() {
    const { t } = useAppTranslation('auth');
    return (
        <AuthContainer>
            <FirstStepStyled.Wrap>
                <FirstStepStyled.ContainerLogo>
                    <AuthLogo />
                </FirstStepStyled.ContainerLogo>
                <AuthContentWrapper>
                    <FirstStepStyled.Title>{t('sign_up.header.title')}</FirstStepStyled.Title>

                    <NewPasswordPageStyled.Description>
                        {t('sign_up.header.description')}
                    </NewPasswordPageStyled.Description>

                    <SignUpForm />
                </AuthContentWrapper>
            </FirstStepStyled.Wrap>
        </AuthContainer>
    );
}
