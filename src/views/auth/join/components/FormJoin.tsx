import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import PasswordInput from '@/@core/fields/inputs/PasswordInput';

import NewPasswordPageStyled from '@/views/auth/forgot-password/NewPasswordPage/styled';
import { FirstAndLastName, LoadingButton } from '@/views/auth/join/styled';
import { InviteRetrieveReply } from '@proto/auth';
import { setCookie } from 'cookies-next';
import { AUTHORIZED_USER } from '@/store/auth/api';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import { Link, Typography } from '@mui/material';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import { getApiErrorMessage } from '@/store/helpers';
import SYSTEM from '@/@system';
import { useAccount } from '@/store/app/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { schema } from './schema';

type DefaultValues = {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    terms_confirmed: boolean;
};

type Props = {
    data: InviteRetrieveReply;
};

export default function FormJoin({ data }: Props) {
    const { t } = useAppTranslation();
    const router = useRouter();
    const { user } = useAccount();

    const [registerViaInvite, {
        isLoading,
        isSuccess,
        error
    }] =
        authGrpcApi.useRegisterViaInviteMutation();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<DefaultValues>({
        defaultValues: {
            email          : data.email || '',
            first_name     : '',
            last_name      : '',
            phone_number   : '',
            password       : '',
            terms_confirmed: false
        },
        values: user
            ? {
                email          : data.email || '',
                first_name     : user.firstName,
                last_name      : user.lastName,
                phone_number   : user.phoneNumber,
                password       : '',
                terms_confirmed: false
            }
            : undefined,
        mode    : 'onBlur',
        resolver: yupResolver(schema)
    });

    const onSubmit = (payload: DefaultValues) => {
        registerViaInvite({
            email      : payload.email,
            firstName  : payload.first_name,
            lastName   : payload.last_name,
            phoneNumber: payload.phone_number,
            password   : payload.password,
            token      : `${router.query.id}`
        })
            .unwrap()
            .then((response) => {
                if (!response) return;
                window.localStorage.setItem(AUTHORIZED_USER.COMPANY_ID, response.companyId);
                window.localStorage.setItem(AUTHORIZED_USER.ID_TOKEN, response.token);
                setCookie(AUTHORIZED_USER.ID_TOKEN, response.token);
                window.location.replace('/');
            });
    };

    return (
        <>
            <NewPasswordPageStyled.Title>
                <span>{data.companyName}</span>{' '}
                {t('auth:join.header.title', { name: SYSTEM.TMS_FRIENDLY_NAME })}
            </NewPasswordPageStyled.Title>
            <NewPasswordPageStyled.Description>
                {t('auth:join.header.description')}
            </NewPasswordPageStyled.Description>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:email.label"
                    placeholder="fields:email.placeholder"
                    name="email"
                    width="100%"
                    size="medium"
                    disabled
                    required
                />

                <FirstAndLastName>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:first_name.label"
                        name="first_name"
                        placeholder="fields:first_name.placeholder"
                        inputProps={{ autoFocus: true }}
                        width="49%"
                        size="medium"
                        required
                    />
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:last_name.label"
                        name="last_name"
                        placeholder="fields:last_name.placeholder"
                        width="49%"
                        size="medium"
                        required
                    />
                </FirstAndLastName>

                <PhoneInput
                    control={control}
                    errors={errors}
                    label="fields:phone_number.label"
                    name="phone_number"
                    placeholder="fields:phone_number.placeholder"
                    width="100%"
                    required
                />

                <NewPasswordPageStyled.ContainerError style={{ marginTop: '14px' }}>
                    <PasswordInput
                        control={control}
                        errors={errors}
                        label="fields:password.label"
                        name="password"
                        placeholder="fields:password.placeholder"
                        required
                    />
                    {error && <p>{getApiErrorMessage(error) || t('common:error')}</p>}
                </NewPasswordPageStyled.ContainerError>

                <CheckboxInput
                    label={(
                        <Typography
                            variant="caption"
                            sx={{ marginLeft: 2 }}
                        >
                            {t('auth:join.fields.terms_confirmed.label_part_1', {
                                name: SYSTEM.TMS_FRIENDLY_NAME
                            })}{' '}
                            <Link
                                href={SYSTEM.TERMS_LINK}
                                rel="noopener noreferrer"
                                target="_blank"
                                underline="hover"
                            >
                                {t('auth:links.terms')}
                            </Link>
                            {t('auth:join.fields.terms_confirmed.label_part_2')}
                            <Link
                                href={SYSTEM.PRIVACY_LINK}
                                rel="noopener noreferrer"
                                target="_blank"
                                underline="hover"
                            >
                                {t('auth:links.policy')}
                            </Link>
                            .
                        </Typography>
                    )}
                    control={control}
                    errors={errors}
                    name="terms_confirmed"
                    formControlSx={{ mb: '16px' }}
                />
                <LoadingButton
                    type="submit"
                    variant="contained"
                    disabled={isSuccess}
                    loading={isLoading}
                    loadingIndicator={`${t('common:loading')}...`}
                >
                    {t(
                        user
                            ? 'auth:join.buttons.accept_invite'
                            : 'auth:join.buttons.create_account'
                    )}
                </LoadingButton>
            </form>
        </>
    );
}
