import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { ChevronLeft } from 'mdi-material-ui';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import NewPasswordPageStyled from '@/views/auth/forgot-password/NewPasswordPage/styled';
import { applyTestId, TestIDs } from '@/configs/tests';
import { EmailValidation } from '@/utils/schema-validators';
import AuthContentWrapper from '@/views/auth/components/AuthContentWrapper/AuthContentWrapper';
import AuthContainer from '@/views/auth/components/AuthContainer/AuthContainer';
import AuthLogo from '@/views/auth/components/AuthLogo/AuthLogo';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import Loading from '@/@core/components/page/Loading';
import { useAppSelector } from '@/store/hooks';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { renderError } from '@/utils/render-error';
import type { IntlMessageKey } from '@/@types/next-intl';
import TextInput from '../../../../@core/fields/inputs/TextInput';
import FirstStepStyled from '../../login/FirstStep/styled';
import SendLinkPageStyled from './styled';

type DefaultValues = {
    email: string;
};

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    email: EmailValidation(true)
});

export default function SendLinkPage() {
    const { t } = useAppTranslation();
    const email = useAppSelector((state) => state.login.data.email);
    const [
        sendLinkPassword,
        {
            isLoading: isLoadingPassword,
            isSuccess: isSuccessPassword,
            reset: resetPassword,
            error: errorPassword
        }
    ] = authGrpcApi.useSendResetPasswordLinkMutation();
    const [isShowError, setIsShowError] = useState(false);
    const [countSendLink, setCountSendLink] = useState(0);

    const {
        control,
        watch,
        getValues,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: { email: '' },
        values       : { email },
        resolver     : yupResolver(schema),
        mode         : 'onSubmit'
    });

    useEffect(() => {
        const subscription = watch(() => {
            if (isShowError) {
                setIsShowError(false);
            }
        });
        return () => subscription.unsubscribe();
    }, [isShowError, watch]);

    useEffect(() => {
        if (errorPassword) {
            setIsShowError(true);
        }
    }, [errorPassword]);

    const onSubmit = (data: DefaultValues) => {
        sendLinkPassword({
            ...data,
            partnerId: SYSTEM.PARTNER_ID
        })
            .unwrap()
            .then(() => {
                setCountSendLink((prev) => prev + 1);
            })
            .catch(() => {
                setCountSendLink(0);
            });
    };

    return (
        <AuthContainer>
            <SendLinkPageStyled.Wrapper sx={{ maxWidth: isSuccessPassword ? '600px' : '470px' }}>
                <div>
                    <AuthLogo login />
                </div>

                {!isSuccessPassword ? (
                    <AuthContentWrapper>
                        <FirstStepStyled.Title>
                            {t('auth:forgot_password.send_link.header.title')}
                        </FirstStepStyled.Title>

                        <FirstStepStyled.Description>
                            {t('auth:forgot_password.send_link.header.description')}
                        </FirstStepStyled.Description>

                        <FirstStepStyled.Form onSubmit={handleSubmit(onSubmit)}>
                            <NewPasswordPageStyled.ContainerError>
                                <TextInput
                                    control={control}
                                    errors={errors}
                                    label="fields:email.label"
                                    name="email"
                                    placeholder=""
                                    placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                                    width="100%"
                                    size="medium"
                                    autoFocus
                                    disabled={isSuccessPassword}
                                    testID={TestIDs.pages.login.fields.forgotPassword}
                                />

                                {isShowError && (
                                    <FirstStepStyled.TextError>
                                        {renderError(errorPassword!) || t('common:error')}
                                    </FirstStepStyled.TextError>
                                )}
                            </NewPasswordPageStyled.ContainerError>

                            <LoadingButton
                                sx={{ width: '100%', height: 42, fontWeight: 600 }}
                                type="submit"
                                variant="contained"
                                loading={isLoadingPassword}
                                loadingIndicator={`${t('common:loading')}...`}
                                disabled={isShowError}
                                aria-label="Send rest link"
                                {...applyTestId(TestIDs.pages.login.buttons.sendResetLink)}
                            >
                                {t('auth:forgot_password.send_link.buttons.send_reset_link')}
                            </LoadingButton>
                        </FirstStepStyled.Form>

                        <SendLinkPageStyled.LinkStyled
                            href="/login"
                            aria-label="goToLoginLink"
                            passHref
                            {...applyTestId(TestIDs.pages.login.buttons.backToLogin)}
                        >
                            <ChevronLeft />

                            <span>{t('auth:forgot_password.links.back_to_login')}</span>
                        </SendLinkPageStyled.LinkStyled>
                    </AuthContentWrapper>
                ) : (
                    <AuthContentWrapper
                        styles={{
                            height      : '300px',
                            display     : 'grid',
                            placeContent: 'center',
                            position    : 'relative'
                        }}
                    >
                        {isLoadingPassword && <Loading />}

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            fontSize="23px"
                            sx={{ opacity: isLoadingPassword ? 0.1 : 1 }}
                        >
                            {t(
                                countSendLink <= 1
                                    ? 'auth:forgot_password.send_link.success_header.first_title'
                                    : 'auth:forgot_password.send_link.success_header.second_title',
                                { userName: getValues('email') }
                            )}
                        </Typography>

                        <Typography
                            variant="body2"
                            margin="20px 0"
                            sx={{ opacity: isLoadingPassword ? 0.1 : 1 }}
                        >
                            {t('auth:forgot_password.send_link.success_header.description_part_1')}
                            <SendLinkPageStyled.SpanStyled onClick={handleSubmit(onSubmit)}>
                                {t('auth:forgot_password.send_link.links.resend')}
                            </SendLinkPageStyled.SpanStyled>
                            {t('auth:forgot_password.send_link.success_header.description_part_2')}
                            <SendLinkPageStyled.SpanStyled onClick={resetPassword}>
                                {t('auth:forgot_password.send_link.links.try_different_email')}
                            </SendLinkPageStyled.SpanStyled>
                            .
                        </Typography>
                    </AuthContentWrapper>
                )}
            </SendLinkPageStyled.Wrapper>
        </AuthContainer>
    );
}
