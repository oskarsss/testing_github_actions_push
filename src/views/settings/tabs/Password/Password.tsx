import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import PasswordInput from '@/@core/fields/inputs/PasswordInput';
import { useForgotPasswordDialog } from '@/views/settings/tabs/Password/dialogs/ForgotPassword';
import { Form, SubTitle } from '@/views/settings/components/styled';
import Container from '@/views/settings/components/Container/Container';
import { TestIDs, applyTestId } from '@/configs/tests';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import AccountGrpcService from '@/@grpcServices/services/account.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import schema from './schema';

export type SettingsPasswordDefaultValues = {
    current_password: string;
    new_password: string;
    password_confirmation: string;
};

export default function Password() {
    const forgotPasswordDialog = useForgotPasswordDialog();
    const { t } = useAppTranslation();
    const [updatePassword, {
        isLoading,
        isSuccess,
        error
    }] =
        AccountGrpcService.useUpdatePasswordMutation();
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues: {
            current_password     : '',
            new_password         : '',
            password_confirmation: ''
        },
        mode    : 'onBlur',
        resolver: yupResolver<SettingsPasswordDefaultValues>(schema)
    });

    useEffect(() => {
        if (isSuccess) setTimeout(() => reset(), 700);
    }, [isSuccess]);

    const openForgotPasswordDialog = () => {
        forgotPasswordDialog.open({});
    };

    const onSubmit = (data: SettingsPasswordDefaultValues) => {
        updatePassword({
            currentPassword: data.current_password,
            newPassword    : data.new_password
        });
    };

    useEffect(() => {
        if (error && 'error' in error && error.error === 'Current password') {
            setError('current_password', {
                type   : 'manual',
                message: 'Current password is not correct'
            });
        }
    }, [error, setError]);

    return (
        <Container>
            <div>
                <SettingsHeader
                    title="settings:password.title"
                    icon={<SettingIcons.Password />}
                />
                <SubTitle>{t('settings:password.sub_title')}</SubTitle>
            </div>

            <Form style={{ flexDirection: 'column' }}>
                <div
                    style={{
                        display      : 'flex',
                        flexDirection: 'column',
                        alignItems   : 'flex-start'
                    }}
                >
                    <PasswordInput
                        control={control}
                        errors={errors}
                        label="settings:password.fields.current_password.label"
                        placeholder="settings:password.fields.current_password.placeholder"
                        name="current_password"
                        testID={TestIDs.pages.settingsPassword.fields.currentPassword}
                    />
                    <Button
                        onClick={openForgotPasswordDialog}
                        sx={{
                            textTransform: 'capitalize',
                            margin       : '2px 0 0 4px',
                            padding      : 0
                        }}
                    >
                        {t('settings:password.buttons.forgot_password')}
                    </Button>
                </div>

                <PasswordInput
                    control={control}
                    errors={errors}
                    label="settings:password.fields.new_password.label"
                    placeholder="settings:password.fields.new_password.placeholder"
                    testID={TestIDs.pages.settingsPassword.fields.newPassword}
                    name="new_password"
                />

                <PasswordInput
                    control={control}
                    errors={errors}
                    label="settings:password.fields.password_confirmation.label"
                    placeholder="settings:password.fields.password_confirmation.placeholder"
                    name="password_confirmation"
                    testID={TestIDs.pages.settingsPassword.fields.confirmPassword}
                />
            </Form>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                    variant="contained"
                    disabled={!isDirty}
                    loading={isLoading}
                    {...applyTestId(TestIDs.pages.settingsPassword.buttons.changePassword)}
                    onClick={handleSubmit(onSubmit)}
                    sx={{ fontWeight: 600, width: '200px' }}
                >
                    {t('settings:password.buttons.submit')}
                </LoadingButton>
            </div>
        </Container>
    );
}
