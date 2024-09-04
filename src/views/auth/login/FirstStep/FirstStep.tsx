/* eslint-disable consistent-return */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid';
import { memo, useEffect, useState } from 'react';
import { onSuccessLogin } from '@/store/auth/api';
import TextInput from '@/@core/fields/inputs/TextInput';
import PasswordInput from '@/@core/fields/inputs/PasswordInput';
import { LoginActions } from '@/store/auth/login/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { EmailValidation } from '@/utils/schema-validators';
import { TestIDs, applyTestId } from '@/configs/tests';
import Auth from '@/store/auth/types';
import AuthSigningProcess from '@/views/auth/components/AuthSigningProcess/AuthSigningProcess';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import { RequestCodeReply_Action, VerificationType } from '@proto/auth';
import { renderError } from '@/utils/render-error';
import { useTheme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import FirstStepStyled from './styled';

const defaultValues = {
    email   : '',
    password: '',
    type    : VerificationType.SMS
};

const schema = yup.object().shape({
    email   : EmailValidation(true),
    password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters')
        .max(40, 'Password maximum 40 characters'),
    type: yup.number().required()
});

const FirstStep = () => {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const [requestCode, {
        isLoading: isButtonLoading,
        error
    }] =
        authGrpcApi.useRequestCodeMutation();
    const router = useRouter();
    const loading = useAppSelector((state) => state.login.loading);
    const [isShowError, setIsShowError] = useState(false);

    const theme = useTheme();

    const {
        control,
        handleSubmit,
        watch,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode    : 'onBlur',
        resolver: yupResolver(schema)
    });

    const onSubmit = async (body: Auth.Redux.Login.Data) => {
        dispatch(LoginActions.SetLoading(true));

        try {
            const data = await requestCode(body).unwrap();
            if (!data) {
                dispatch(LoginActions.SetLoading(false));
                return;
            }

            dispatch(LoginActions.SetLoading(false));
            if (data.action === RequestCodeReply_Action.CHANGE_PASSWORD) {
                return router.replace(`${data.changePasswordUrl}`);
            }
            if (data.token) {
                dispatch(onSuccessLogin(data.token));
                return;
            }
            if (!data.token) {
                dispatch(
                    LoginActions.SetData({
                        ...body,
                        verificationType: data?.verificationType ?? VerificationType.SMS
                    })
                );
                dispatch(LoginActions.SetStep(2));
            }
        } catch (error) {
            console.debug('error in first step', error);
            dispatch(LoginActions.SetLoading(false));
        }
    };

    useEffect(() => {
        const subscription = watch(() => {
            if (isShowError) {
                setIsShowError(false);
            }
        });
        return () => subscription.unsubscribe();
    }, [isShowError, watch]);

    useEffect(() => {
        if (error) {
            setIsShowError(true);
        }
    }, [error]);

    const clickLinkForgotPassword = () => {
        dispatch(LoginActions.SetEmail(getValues('email')));
    };

    if (loading) {
        return <AuthSigningProcess />;
    }

    return (
        <>
            <FirstStepStyled.Title>{t('auth:first_step.header.title')}</FirstStepStyled.Title>
            <FirstStepStyled.Description>
                {t('auth:first_step.header.description')}
            </FirstStepStyled.Description>
            <FirstStepStyled.Form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:email.label"
                    name="email"
                    placeholder="fields:email.placeholder"
                    width="100%"
                    size="medium"
                    testID={TestIDs.pages.login.fields.email}
                    inputProps={{
                        inputProps: {
                            autoCapitalize: 'off'
                        }
                    }}
                />

                <Grid sx={{ margin: '16px 0 10px' }}>
                    <PasswordInput
                        control={control}
                        errors={errors}
                        label="fields:password.label"
                        name="password"
                        placeholder="fields:password.placeholder"
                        testID={TestIDs.pages.login.fields.password}
                    />
                </Grid>

                {isShowError && (
                    <FirstStepStyled.TextError>
                        {renderError(error!) || t('common:error')}
                    </FirstStepStyled.TextError>
                )}

                <div className="block">
                    <Link
                        onClick={clickLinkForgotPassword}
                        href="/forgot-password"
                        {...applyTestId(TestIDs.pages.login.links.forgotPassword)}
                        style={{ color: theme.palette.semantic.text.brand.primary }}
                    >
                        {t('auth:first_step.links.forgot_password')}
                    </Link>
                </div>

                <LoadingButton
                    {...applyTestId(TestIDs.pages.login.buttons.login)}
                    sx={{
                        width     : '100%',
                        height    : 42,
                        fontWeight: 600
                    }}
                    type="submit"
                    variant="contained"
                    loading={isButtonLoading}
                    loadingIndicator={`${t('common:loading')}...`}
                >
                    {t('auth:first_step.buttons.login')}
                </LoadingButton>
            </FirstStepStyled.Form>

            {/* ------------------------------ LINK REGISTER ------------------------------ */}
            <FirstStepStyled.Bottom>
                {t('auth:first_step.links.register.question')}
                <Link
                    {...applyTestId(TestIDs.pages.login.buttons.createAccount)}
                    href="/register"
                >
                    {t('auth:first_step.links.register.create_an_account')}
                </Link>
            </FirstStepStyled.Bottom>
        </>
    );
};

export default memo(FirstStep);
