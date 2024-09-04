import { useRouter } from 'next/router';

// ** additional
import { ChevronLeft } from 'mdi-material-ui';

import { TestIDs, applyTestId } from '@/configs/tests';
import AuthContentWrapper from '@/views/auth/components/AuthContentWrapper/AuthContentWrapper';
import AuthContainer from '@/views/auth/components/AuthContainer/AuthContainer';
import AuthLogo from '@/views/auth/components/AuthLogo/AuthLogo';
import AuthLoader from '@/views/auth/components/AuthLoader/AuthLoader';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Form from './components/Form';
import NewPasswordPageStyled from './styled';

export default function NewPasswordPage() {
    const { t } = useAppTranslation('auth');
    const {
        isReady,
        query
    } = useRouter();

    const email = query.email as string | undefined;
    const id = query.id as string;

    return (
        <AuthContainer>
            <NewPasswordPageStyled.Wrap>
                <NewPasswordPageStyled.ContainerLogo>
                    <AuthLogo login />
                </NewPasswordPageStyled.ContainerLogo>
                <AuthContentWrapper>
                    <NewPasswordPageStyled.Title>
                        {t('forgot_password.new_password.header.title')}
                    </NewPasswordPageStyled.Title>
                    <NewPasswordPageStyled.Description>
                        {t('forgot_password.new_password.header.description')}
                    </NewPasswordPageStyled.Description>

                    {isReady ? (
                        <Form
                            email={email}
                            id={id}
                        />
                    ) : (
                        <AuthLoader />
                    )}

                    <NewPasswordPageStyled.LinkStyled
                        href="/login"
                        aria-label="goToLoginLink"
                        passHref
                        {...applyTestId(TestIDs.pages.login.buttons.backToLogin)}
                    >
                        <ChevronLeft />
                        <span>{t('forgot_password.links.back_to_login')}</span>
                    </NewPasswordPageStyled.LinkStyled>
                </AuthContentWrapper>
            </NewPasswordPageStyled.Wrap>
        </AuthContainer>
    );
}
