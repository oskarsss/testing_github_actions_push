import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { useAccount } from '@/store/app/hooks';
import TextInput from '@/@core/fields/inputs/TextInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import { reset_config } from '@/configs/reset-from-config';
import { Form } from '@/views/settings/components/styled';
import Container from '@/views/settings/components/Container/Container';
import { TestIDs, applyTestId } from '@/configs/tests';
import Header from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import AccountGrpcService from '@/@grpcServices/services/account.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Avatar from './Avatar';
import { FormValues, profile_schema } from './schema';

export default function Profile() {
    const { user } = useAccount();
    const [updateAccount, { isLoading }] = AccountGrpcService.useUpdateAccountMutation();
    const { t } = useAppTranslation();

    const defaultValues: FormValues = {
        first_name              : user?.firstName || '',
        last_name               : user?.lastName || '',
        email                   : user?.email || '',
        phone_number            : user?.phoneNumber || '',
        second_step_auth_enabled: !!user?.secondStepAuthEnabled
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues,
        mode    : 'onBlur',
        resolver: yupResolver(profile_schema)
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await updateAccount({
                email                : data.email,
                firstName            : data.first_name,
                lastName             : data.last_name,
                phoneNumber          : data.phone_number,
                secondStepAuthEnabled: data.second_step_auth_enabled
            }).unwrap();
            reset(data, reset_config);
        } catch (error) {
            const defineError = error as Error;

            toast.error(defineError?.message || 'Something went wrong', {
                position: 'top-right',
                duration: 2500
            });
        }
    };

    return (
        <Container>
            <Header
                title="settings:profile.title"
                icon={<SettingIcons.Profile />}
            />

            {/* ------------------------------------ AVATAR ------------------------------------ */}

            <div style={{ display: 'flex', gap: 30 }}>
                <Avatar
                    first_name={user?.firstName}
                    last_name={user?.lastName}
                />
                <Form>
                    {/* ----- FIRST NAME ---------- */}
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:first_name.label_upper"
                        testID={TestIDs.pages.settingsProfile.fields.firstName}
                        name="first_name"
                        placeholder="fields:first_name.placeholder_2"
                        width="calc(50% - 5px)"
                    />

                    {/* ------------------------------------ LAST NAME ---- */}
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:last_name.label_upper"
                        testID={TestIDs.pages.settingsProfile.fields.lastName}
                        name="last_name"
                        placeholder="fields:last_name.placeholder_2"
                        width="calc(50% - 5px)"
                    />

                    {/* ------------------------------------ PHONE --- */}
                    <PhoneInput
                        control={control}
                        errors={errors}
                        label="fields:phone_number.label"
                        testID={TestIDs.pages.settingsProfile.fields.phoneNumber}
                        name="phone_number"
                        placeholder="fields:phone_number.placeholder"
                        width="100%"
                    />

                    {/* ------------------------------------ EMAIL --- */}
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:email.label"
                        name="email"
                        testID={TestIDs.pages.settingsProfile.fields.email}
                        type="email"
                        placeholder="fields:email.placeholder"
                        width="100%"
                    />

                    {/* --------SECOND STEP VERIFICATION ENABLED--- */}
                    <CheckboxInput
                        control={control}
                        errors={errors}
                        name="second_step_auth_enabled"
                        testID={TestIDs.pages.settingsProfile.fields.secondStepVerification}
                        label="settings:profile.fields.second_step_auth_enabled.label"
                    />
                </Form>
            </div>
            {/* --------- BUTTONS ------ */}
            <div style={{ textAlign: 'end' }}>
                <Button
                    disabled={!isDirty || isLoading}
                    onClick={() => reset()}
                    color="error"
                    {...applyTestId(TestIDs.pages.settingsProfile.buttons.cancel)}
                    variant="outlined"
                >
                    {t('settings:profile.buttons.cancel_changes')}
                </Button>
                <LoadingButton
                    disabled={!isDirty}
                    onClick={handleSubmit(onSubmit)}
                    loading={isLoading}
                    type="submit"
                    {...applyTestId(TestIDs.pages.settingsProfile.buttons.update)}
                    sx={{ ml: '20px', fontWeight: 600, minWidth: '120px' }}
                    variant="contained"
                >
                    {t('common:button.update')}
                </LoadingButton>
            </div>
        </Container>
    );
}
