/* eslint-disable consistent-return */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Divider, Grid, Link, Typography, useMediaQuery, Box } from '@mui/material';
import { onSuccessLogin } from '@/store/auth/api';
import TextInput from '@/@core/fields/inputs/TextInput';
import PasswordInput from '@/@core/fields/inputs/PasswordInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import FirstStepStyled from '@/views/auth/sign-up/SignUp.styled';
import { TestIDs, applyTestId } from '@/configs/tests';
import { useAppDispatch } from '@/store/hooks';
import { realisticLookConfetti } from '@/utils/show-confetti';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import CardMedia from '@mui/material/CardMedia';

import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import RegisterGrpcService from '@/@grpcServices/services/register.service';
import StateSelect from '@/@core/fields/select/StateSelect';
import { renderError } from '@/utils/render-error';
import SYSTEM from '@/@system';
import { useEffect } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { SignUpDefaultValues, signUpDefaultValues, hear_about_us_data, schema } from './schema';
import DotInput from './DotInput';

// @ts-ignore
import Registration_loader from '../../../../../public/loading_animation/FINAL_1x1.mp4';

export default function SignUpForm() {
    const { t } = useAppTranslation();
    const tabMediaQuery = useMediaQuery('(min-width:768px)');

    const [signUp, {
        isLoading,
        isError,
        error
    }] = RegisterGrpcService.useRegisterMutation();

    const {
        control,
        setError,
        setValue,
        watch,
        clearErrors,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpDefaultValues>({
        defaultValues : signUpDefaultValues,
        mode          : 'onBlur',
        reValidateMode: 'onBlur',
        resolver      : yupResolver(schema)
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        const subscription = watch((_, { name }) => clearErrors(name));
        return () => subscription.unsubscribe();
    }, [clearErrors, watch]);

    const onSubmit = async (data: SignUpDefaultValues) => {
        signUp({
            addressCity      : data.location_id_city,
            addressLine1     : data.location_id_line1,
            addressPostalCode: data.location_id_postal_code,
            addressState     : data.location_id_state,
            companyName      : data.company_name,
            dot              : data.dot,
            email            : data.email,
            firstName        : data.first_name,
            hearAboutUs      : data?.hear_about_us || '',
            ipAddress        : '',
            lastName         : data.last_name,
            password         : data.password,
            phone            : data.phone_number,
            referralCode     : data?.referral_code || '',
            termsOfServiceAndPrivacyPolicyConfirmed:
                data.terms_of_service_and_privacy_policy_confirmed,
            addressLine2: data.location_id_line2,
            ...(SYSTEM.PARTNER_ID && {
                partnerId: SYSTEM.PARTNER_ID
            })
        })
            .unwrap()
            .then((res) => {
                realisticLookConfetti();
                dispatch(onSuccessLogin(res.token));
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    return !isLoading ? (
        <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FirstStepStyled.ContainerTwoInputs>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:first_name.label"
                    name="first_name"
                    placeholder="auth:sign_up.fields.first_name.placeholder"
                    width={tabMediaQuery ? '244px' : '100%'}
                    size="medium"
                    autoFocus
                    testID={TestIDs.pages.createAccount.fields.firstName}
                    required
                />

                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:last_name.label"
                    name="last_name"
                    placeholder="auth:sign_up.fields.last_name.placeholder"
                    width={tabMediaQuery ? '262px' : '100%'}
                    size="medium"
                    testID={TestIDs.pages.createAccount.fields.lastName}
                    required
                />
            </FirstStepStyled.ContainerTwoInputs>

            <PhoneInput
                testID={TestIDs.pages.createAccount.fields.phoneNumber}
                control={control}
                errors={errors}
                name="phone_number"
                placeholder="fields:phone_number.placeholder"
                label="fields:phone_number.label"
                width="100%"
                required
            />

            <Grid sx={{ margin: '16px 0' }}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:email.label"
                    name="email"
                    placeholder=""
                    placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                    width="100%"
                    size="medium"
                    testID={TestIDs.pages.createAccount.fields.email}
                    required
                />
            </Grid>

            <PasswordInput
                control={control}
                errors={errors}
                label="fields:password.label"
                name="password"
                placeholder="fields:password.placeholder"
                testID={TestIDs.pages.createAccount.fields.password}
                required
            />

            <FirstStepStyled.Dot>
                <DotInput
                    control={control}
                    clearErrors={clearErrors}
                    setError={setError}
                    setValue={setValue}
                />
            </FirstStepStyled.Dot>

            <Grid sx={{ margin: '16px 0' }}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:company_name.label"
                    name="company_name"
                    placeholder="fields:company_name.placeholder"
                    width="100%"
                    required
                />
            </Grid>
            <Grid sx={{ margin: '16px 0' }}>
                <TextInput
                    width="50%"
                    control={control}
                    errors={errors}
                    label="fields:address_line_1.label"
                    name="location_id_line1"
                    placeholder="fields:address_line_1.placeholder"
                    required
                />
                <TextInput
                    width="50%"
                    control={control}
                    errors={errors}
                    label="fields:address_line_2.label"
                    name="location_id_line2"
                    placeholder="fields:address_line_2.placeholder"
                />
            </Grid>
            <Grid sx={{ margin: '16px 0' }}>
                <TextInput
                    width="33%"
                    control={control}
                    errors={errors}
                    label="fields:city.label"
                    name="location_id_city"
                    placeholder="fields:city.placeholder"
                    required
                />
                <StateSelect
                    width="33%"
                    control={control}
                    errors={errors}
                    label="fields:state.label"
                    name="location_id_state"
                    required
                />
                <TextInput
                    width="33%"
                    control={control}
                    errors={errors}
                    label="fields:postal_code.label"
                    name="location_id_postal_code"
                    placeholder="fields:postal_code.label"
                    required
                />
            </Grid>

            {/* ------------------------------------ Optional ------------------------------- */}
            <Divider style={{ marginBottom: '16px' }}>
                <Typography variant="caption">{t('auth:sign_up.sections.optional')}</Typography>
            </Divider>

            <div style={{ paddingBottom: '14px' }}>
                <FirstStepStyled.ContainerTwoInputs style={{ marginBottom: '10px' }}>
                    {/* ------------------------------- SELECT ------------------------------- */}
                    <Box marginBottom={tabMediaQuery ? 0 : '24px'}>
                        <SelectInput
                            errors={errors}
                            control={control}
                            name="hear_about_us"
                            label="auth:sign_up.fields.hear_about_us.label"
                            options={hear_about_us_data}
                            width={tabMediaQuery ? '256px' : '100%'}
                            size="medium"
                            clearButton
                        />
                    </Box>

                    {/* // Hide due to VEK-3313 */}
                    {/* <TextInput */}
                    {/*     control={control} */}
                    {/*     errors={errors} */}
                    {/*     label="auth:sign_up.fields.referral_code.label" */}
                    {/*     name="referral_code" */}
                    {/*     placeholder="auth:sign_up.fields.referral_code.placeholder" */}
                    {/*     width={tabMediaQuery ? '256px' : '100%'} */}
                    {/*     size="medium" */}
                    {/*     testID={TestIDs.pages.createAccount.fields.referalCode} */}
                    {/* /> */}
                </FirstStepStyled.ContainerTwoInputs>
                {isError && (
                    <FirstStepStyled.TextError>
                        {renderError(error) || t('auth:sign_up.error')}
                    </FirstStepStyled.TextError>
                )}
            </div>

            <CheckboxInput
                label={(
                    <Typography
                        variant="caption"
                        sx={{ paddingLeft: 2, textWrap: 'pretty' }}
                    >
                        {t(
                            'auth:sign_up.fields.terms_of_service_and_privacy_policy_confirmed.label_part_1',
                            { name: SYSTEM.TMS_FRIENDLY_NAME }
                        )}{' '}
                        <Link
                            href={SYSTEM.TERMS_LINK}
                            rel="noopener noreferrer"
                            target="_blank"
                            underline="hover"
                        >
                            {t('auth:links.terms')}
                        </Link>{' '}
                        {t(
                            'auth:sign_up.fields.terms_of_service_and_privacy_policy_confirmed.label_part_2'
                        )}{' '}
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
                name="terms_of_service_and_privacy_policy_confirmed"
                formControlSx={{ mb: '16px' }}
            />

            <LoadingButton
                sx={{ width: '100%', height: 42, fontWeight: 600 }}
                type="submit"
                variant="contained"
                loading={isLoading}
                loadingIndicator={`${t('common:loading')}...`}
                {...applyTestId(TestIDs.pages.createAccount.buttons.createAccount)}
            >
                {t('auth:sign_up.buttons.create_account')}
            </LoadingButton>

            <FirstStepStyled.BottomText>
                {t('auth:sign_up.links.sign_in.question')}
                <Link
                    {...applyTestId(TestIDs.pages.login.buttons.backToLogin)}
                    aria-label="goToLoginLink"
                    href="/login"
                >
                    {t('auth:sign_up.links.sign_in.sign_in_instead')}
                </Link>
            </FirstStepStyled.BottomText>
        </form>
    ) : (
        <CardMedia
            component="video"
            src={Registration_loader}
            autoPlay
            loop
            muted
        />
    );
}
