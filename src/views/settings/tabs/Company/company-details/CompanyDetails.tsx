import SettingIcons from '@/views/settings/icons/icons';
import React, { useCallback, useState } from 'react';
import Container from '@/views/settings/components/Container/Container';
import MapSettingsHeader from '@/views/settings/components/MapSections/MapSettingsHeader';
import { useForm } from 'react-hook-form';
import { SettingsRetrieveReply_Company } from '@proto/settings';
import SettingsGrpcService from '@/@grpcServices/services/settings.service';
import CompanyDetailsFields from '@/views/settings/tabs/Company/company-details/CompanyDetailsFields';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import AccountGrpcService from '@/@grpcServices/services/account.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AddressModel_Country } from '@proto/models/model_address';

const schema: yup.ObjectSchema<Omit<SettingsRetrieveReply_Company, 'addressCountry'>> = yup
    .object()
    .shape({
        name             : yup.string().defined(),
        phone            : PhoneNumberValidation(false),
        fax              : PhoneNumberValidation(false),
        lightLogoUrl     : yup.string().defined(),
        darkLogoUrl      : yup.string().defined(),
        email            : EmailValidation(false),
        billingEmail     : EmailValidation(false),
        addressLine1     : yup.string().defined(),
        addressLine2     : yup.string().defined(),
        addressCity      : yup.string().defined(),
        addressState     : yup.string().defined(),
        addressPostalCode: yup.string().defined(),
        timezone         : yup.string().defined()
    });

type Props = {
    companyData: SettingsRetrieveReply_Company;
};

export default function CompanyDetails({ companyData }: Props) {
    const dispatch = useAppDispatch();
    const company_id = useAppSelector((state) => state.app.company_id);
    const [isEdit, setIsEdit] = useState(false);
    const [updateSettings, { isLoading: loadingUpdate }] =
        SettingsGrpcService.useUpdateSettingsMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            isDirty,
            errors
        }
    } = useForm<SettingsRetrieveReply_Company>({
        defaultValues: companyData || SettingsRetrieveReply_Company.create(),
        values       : companyData,
        resolver     : yupResolver(schema)
    });

    const onCancel = useCallback(() => {
        reset();
        setIsEdit(false);
    }, [reset]);

    const onSubmit = useCallback(
        (data: SettingsRetrieveReply_Company) => {
            updateSettings({ company: data })
                .unwrap()
                .then(() => {
                    dispatch(
                        AccountGrpcService.util.updateQueryData(
                            'getAccount',
                            {},
                            (getAccountData) => {
                                const companies = getAccountData.companies.map((company) => {
                                    if (company.companyId === company_id) {
                                        return {
                                            ...company,
                                            ...data,
                                            phoneNumber: data.phone
                                        };
                                    }
                                    return company;
                                });

                                return {
                                    ...getAccountData,
                                    companies
                                };
                            }
                        )
                    );
                    setIsEdit(false);
                });
        },
        [company_id, updateSettings, dispatch]
    );

    return (
        <Container sx={{ mb: '16px' }}>
            <MapSettingsHeader
                title="settings:company.titles.company_details"
                icon={<SettingIcons.Company />}
                isEdit={isEdit}
                isDirty={isDirty}
                isLoading={loadingUpdate}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={onCancel}
                onEdit={() => setIsEdit(true)}
            />
            <CompanyDetailsFields
                control={control}
                errors={errors}
                isEdit={isEdit}
            />
        </Container>
    );
}
