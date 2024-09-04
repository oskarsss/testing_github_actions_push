/* eslint-disable no-useless-return */
import PasswordInput from '@/@core/fields/inputs/PasswordInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import NewPasswordPageStyled from '@/views/auth/forgot-password/NewPasswordPage/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getApiErrorMessage } from '@/store/helpers';
import SYSTEM from '@/@system';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAccount } from '@/store/app/hooks';
import { schema } from './schema';

export type DefaultValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

type Props = {
    email: string | undefined;
    id: string;
};

export default function NewPasswordPageForm({
    email,
    id
}: Props) {
    const { t } = useAppTranslation();
    const router = useRouter();
    const { user } = useAccount();
    const [resetPassword, {
        isLoading,
        isSuccess,
        error
    }] = authGrpcApi.useResetPasswordMutation();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<DefaultValues>({
        defaultValues: {
            email          : email || '',
            password       : '',
            confirmPassword: ''
        },
        values: user
            ? {
                email          : user.email,
                password       : '',
                confirmPassword: ''
            }
            : undefined,
        mode    : 'onBlur',
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: DefaultValues) => {
        resetPassword({
            ...data,
            token: id
        })
            .unwrap()
            .then(() => {
                if (user) {
                    router.replace('/home');
                    return;
                }
                router.replace('/login');
            });
    };

    return (
        <NewPasswordPageStyled.Form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                control={control}
                errors={errors}
                label="fields:email.label"
                name="email"
                placeholder=""
                placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                width="100%"
                size="medium"
            />

            <Grid sx={{ margin: '16px 0' }}>
                <PasswordInput
                    control={control}
                    errors={errors}
                    label="fields:password.label"
                    name="password"
                    placeholder="fields:password.placeholder"
                />
            </Grid>

            <NewPasswordPageStyled.ContainerError>
                <PasswordInput
                    control={control}
                    errors={errors}
                    label="auth:forgot_password.new_password.fields.confirmPassword.label"
                    name="confirmPassword"
                    placeholder="auth:forgot_password.new_password.fields.confirmPassword.placeholder"
                />

                {error && <p>{getApiErrorMessage(error) || t('common:error')}</p>}
            </NewPasswordPageStyled.ContainerError>

            {isSuccess ? (
                <NewPasswordPageStyled.ContainerSuccess>
                    <CheckCircleIcon
                        color="success"
                        fontSize="large"
                    />
                </NewPasswordPageStyled.ContainerSuccess>
            ) : (
                <LoadingButton
                    sx={{ width: '100%', height: 42, fontWeight: 600 }}
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                    loadingIndicator={`${t('common:loading')}...`}
                >
                    {t('auth:forgot_password.new_password.buttons.update_password')}
                </LoadingButton>
            )}
        </NewPasswordPageStyled.Form>
    );
}
