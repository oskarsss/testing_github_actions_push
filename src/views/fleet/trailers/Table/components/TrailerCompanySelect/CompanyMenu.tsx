import { useMemo } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import { ObjectSchema } from 'yup';
import { PhoneNumberValidation, EmailValidation } from '@/utils/schema-validators';
import { applyTestId, TestIDs } from '@/configs/tests';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';
import type { TrailerCompanyCreateRequest } from '@proto/trailer.company';

const schema: ObjectSchema<TrailerCompanyCreateRequest> = yup.object().shape({
    name: yup.string().min(2).max(20)
        .required(),
    phoneNumber: PhoneNumberValidation(false),
    email      : EmailValidation(false)
});

const defaultValues = {
    name       : '',
    phoneNumber: '',
    email      : ''
};
type Props = {
    enteredValue?: string;
    onAdded?: (company_id: string) => void;
};

export const useAddTrailerCompanyMenu = menuHookFabric(CompanyMenu);

export default function CompanyMenu({
    enteredValue,
    onAdded
}: Props) {
    const { t } = useAppTranslation();
    const addTrailerCompanyMenu = useAddTrailerCompanyMenu(true);
    const [addCompany, { isLoading }] =
        TrailerCompaniesGrpcService.useCreateTrailerCompanyMutation();

    const dataValues: TrailerCompanyCreateRequest | undefined = useMemo(() => {
        if (!enteredValue) return undefined;
        return {
            ...defaultValues,
            name: enteredValue
        };
    }, [enteredValue]);

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<TrailerCompanyCreateRequest>({
        defaultValues,
        values  : dataValues,
        resolver: yupResolver(schema)
    });

    const save = (values: TrailerCompanyCreateRequest) => {
        addCompany(values)
            .unwrap()
            .then((response) => {
                onAdded?.(response.trailerCompanyId);
                reset();
                addTrailerCompanyMenu.close();
            });
    };

    // Child Form's onSubmit function
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(save)(event);
        event.stopPropagation();
    };

    return (
        <MenuComponents.Form
            onSubmit={onSubmit}
            width="400px"
            padding="24px"
        >
            <Grid
                container
                spacing={5}
            >
                <Grid
                    item
                    sm={12}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        component="div"
                    >
                        {t('common:actions.add_trailer_company')}
                    </Typography>
                </Grid>
                <Grid
                    item
                    sm={12}
                >
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:company_name.label"
                        name="name"
                        placeholder="fields:company_name.placeholder"
                        width="100%"
                        testID={TestIDs.pages.trailerProfile.fields.companyName}
                    />
                </Grid>
                <Grid
                    item
                    sm={12}
                >
                    <PhoneInput
                        control={control}
                        errors={errors}
                        label="fields:phone_number.label"
                        name="phoneNumber"
                        placeholder="fields:phone_number.placeholder"
                        width="100%"
                        testID={TestIDs.pages.trailerProfile.fields.companyPhone}
                    />
                </Grid>
                <Grid
                    item
                    sm={12}
                >
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:email.label"
                        name="email"
                        placeholder=""
                        placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                        width="100%"
                        testID={TestIDs.pages.trailerProfile.fields.companyEmail}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                    <Button
                        size="large"
                        variant="outlined"
                        onClick={addTrailerCompanyMenu.close}
                        style={{ width: '120px', marginRight: '20px' }}
                    >
                        {t('common:button.cancel')}
                    </Button>
                    <LoadingButton
                        size="large"
                        type="submit"
                        variant="contained"
                        style={{ fontWeight: '600', width: '120px' }}
                        loading={isLoading}
                        {...applyTestId(TestIDs.pages.trailerProfile.buttons.confirmAddCompany)}
                    >
                        {t('common:button.add')}
                    </LoadingButton>
                </Grid>
            </Grid>
        </MenuComponents.Form>
    );
}
