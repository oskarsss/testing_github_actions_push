import { useState, useEffect, memo, forwardRef, ElementType } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { PatternFormat } from 'react-number-format';
import { LoadingButton } from '@mui/lab';
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Tooltip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ChevronLeft } from 'mdi-material-ui';
import { onSuccessLogin } from '@/store/auth/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoginActions } from '@/store/auth/login/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { InputBaseComponentProps } from '@mui/material/InputBase/InputBase';
import { VerificationType } from '@proto/auth';
import AuthSigningProcess from '@/views/auth/components/AuthSigningProcess/AuthSigningProcess';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import { getApiErrorMessage } from '@/store/helpers';
import FirstStepStyled from '../FirstStep/styled';
import SecondStepStyled from './styled';

type SecondStepData = {
    verificationCode: string;
    type: VerificationType;
};

const replaceValue = (value: string | undefined): string =>
    value ? value.replace(' - ', '').replaceAll('x', '') : '';

const schema = yup.object().shape({
    verificationCode: yup
        .string()
        .transform(replaceValue)
        .min(6, 'Verification Code must be at least 6 characters')
        .required('Verification Code must be exactly 6 characters'),
    type: yup.number().required()
});

const CodeFormatCustom = forwardRef((props, ref) => (
    <PatternFormat
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
        getInputRef={ref}
        format="### - ###"
        mask="x"
    />
));

const SecondStep = () => {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.login.data);
    const [verification_type, setVerificationType] = useState(VerificationType.EMAIL);
    const loading = useAppSelector((state) => state.login.loading);
    const [isShowError, setIsShowError] = useState(false);
    const [isShowRequestError, setIsShowRequestError] = useState(false);

    const [verifyCode, {
        isLoading: isVerifyLoading,
        isSuccess,
        isError,
        error
    }] =
        authGrpcApi.useVerifyCodeMutation();

    const [requestCode, {
        isLoading: isLoadingRequest,
        error: requestError
    }] =
        authGrpcApi.useRequestCodeMutation();

    const {
        control,
        setValue,
        watch,
        clearErrors,
        handleSubmit,
        formState: { errors }
    } = useForm<SecondStepData>({
        defaultValues: {
            verificationCode: '',
            type            : data.verificationType
        },
        mode    : 'onBlur',
        resolver: yupResolver(schema)
    });

    const resendVerificationCode = async () => {
        await requestCode({
            email           : data.email,
            password        : data.password,
            verificationType: verification_type
        }).unwrap();
        clearErrors('verificationCode');
        setValue('verificationCode', '');
        setValue('type', verification_type);
        setVerificationType((prev) =>
            prev === VerificationType.SMS ? VerificationType.EMAIL : VerificationType.SMS);
    };

    const onRefreshCode = async () => {
        const newData = {
            ...data,
            type:
                verification_type === VerificationType.SMS
                    ? VerificationType.EMAIL
                    : VerificationType.SMS
        };
        try {
            await requestCode(newData).unwrap();
            clearErrors('verificationCode');
            setValue('verificationCode', '');
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (value: SecondStepData) => {
        try {
            const newData = {
                ...data,
                verificationCode: replaceValue(value.verificationCode),
                type            : value.type
            };
            dispatch(LoginActions.SetLoading(true));
            const response = await verifyCode(newData).unwrap();

            dispatch(onSuccessLogin(response?.token ?? ''));
        } catch (error) {
            dispatch(LoginActions.SetLoading(false));
        }
    };

    useEffect(() => {
        const subscription = watch((value) => {
            const formattedValue = replaceValue(value.verificationCode);
            if (formattedValue.length === 6) {
                handleSubmit(onSubmit)();
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        const subscription = watch(() => {
            if (isShowError) {
                setIsShowError(false);
            }
            if (isShowRequestError) {
                setIsShowRequestError(false);
            }
        });
        return () => subscription.unsubscribe();
    }, [isShowError, isShowRequestError, watch]);

    useEffect(() => {
        if (isError) {
            setIsShowError(true);
        }
    }, [isError]);

    useEffect(() => {
        if (requestError) {
            setIsShowRequestError(true);
        }
    }, [requestError]);

    if (loading) return <AuthSigningProcess />;

    return (
        <>
            <FirstStepStyled.Title>{t('auth:second_step.header.title')}</FirstStepStyled.Title>
            <FirstStepStyled.Description>
                {t(
                    verification_type === VerificationType.SMS
                        ? 'auth:second_step.header.descriptions_email'
                        : 'auth:second_step.header.descriptions_phone'
                )}
            </FirstStepStyled.Description>
            <SecondStepStyled.Form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <div>
                    <FormControl
                        style={{ width: '100%', marginBottom: '10px' }}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor="auth-login-v2-verification_code"
                            error={Boolean(errors.verificationCode)}
                        >
                            {t('auth:second_step.fields.verificationCode.label')}
                        </InputLabel>
                        <Controller
                            name="verificationCode"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: {
                                value,
                                onChange
                            } }) => (
                                <OutlinedInput
                                    value={value}
                                    autoFocus
                                    label={t('auth:second_step.fields.verificationCode.label')}
                                    placeholder={t(
                                        'auth:second_step.fields.verificationCode.placeholder'
                                    )}
                                    onChange={onChange}
                                    id="auth-login-v2-verification_code"
                                    error={Boolean(errors.verificationCode)}
                                    type="text"
                                    inputComponent={
                                        CodeFormatCustom as ElementType<InputBaseComponentProps>
                                    }
                                    endAdornment={(
                                        <InputAdornment
                                            position="end"
                                            style={{ marginRight: '5px' }}
                                        >
                                            <Tooltip
                                                title={t(
                                                    'auth:second_step.fields.verificationCode.tooltip'
                                                )}
                                            >
                                                <IconButton
                                                    edge="end"
                                                    onClick={onRefreshCode}
                                                    disabled={isLoadingRequest}
                                                >
                                                    <RefreshIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    )}
                                />
                            )}
                        />

                        {errors.verificationCode && (
                            <FormHelperText
                                sx={{
                                    color     : 'error.main',
                                    position  : 'absolute',
                                    bottom    : '-1.1rem',
                                    whiteSpace: 'nowrap'
                                }}
                                id="stepper-linear-verification_code"
                            >
                                {errors.verificationCode.message}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {isShowError && (
                        <FirstStepStyled.TextError>
                            {getApiErrorMessage(error) || t('common:error')}
                        </FirstStepStyled.TextError>
                    )}

                    {isShowRequestError && (
                        <FirstStepStyled.TextError>
                            {getApiErrorMessage(requestError) || t('common:error')}
                        </FirstStepStyled.TextError>
                    )}
                </div>

                <SecondStepStyled.Bottom>
                    <LoadingButton
                        type="button"
                        variant="outlined"
                        loading={isLoadingRequest}
                        onClick={resendVerificationCode}
                        loadingIndicator={`${t('common:loading')}...`}
                    >
                        {t(
                            verification_type === VerificationType.SMS
                                ? 'auth:second_step.buttons.sms'
                                : 'auth:second_step.buttons.email'
                        )}
                    </LoadingButton>

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        disabled={isSuccess}
                        loading={isVerifyLoading}
                        loadingIndicator={`${t('common:loading')}...`}
                    >
                        {t('auth:second_step.buttons.verify')}
                    </LoadingButton>
                </SecondStepStyled.Bottom>
            </SecondStepStyled.Form>
            <SecondStepStyled.ButtonBack onClick={() => dispatch(LoginActions.SetStep(1))}>
                <ChevronLeft />
                <span>{t('auth:second_step.links.back')}</span>
            </SecondStepStyled.ButtonBack>
        </>
    );
};

export default memo(SecondStep);
