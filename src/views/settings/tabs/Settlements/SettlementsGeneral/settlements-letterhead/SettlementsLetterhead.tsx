import { SettingsRetrieveReply_Settlements } from '@proto/settings';
import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import SettingsGrpcService from '@/@grpcServices/services/settings.service';
import Container from '@/views/settings/components/Container/Container';
import MapSettingsHeader from '@/views/settings/components/MapSections/MapSettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import SettlementsLetterheadFields from '@/views/settings/tabs/Settlements/SettlementsGeneral/settlements-letterhead/SettlementsLetterheadFields';

export type SettlementsLetterheadDefaultValues = Omit<
    SettingsRetrieveReply_Settlements,
    'ccEmails' | 'replyToEmails' | 'addressCountry'
> & {
    ccEmails: string;
    replyToEmails: string;
};

const schema: yup.ObjectSchema<SettlementsLetterheadDefaultValues> = yup.object().shape({
    logoUrl              : yup.string().defined(),
    companyName          : yup.string().defined(),
    phone                : PhoneNumberValidation(false),
    fax                  : PhoneNumberValidation(false),
    email                : EmailValidation(false),
    addressLine1         : yup.string().defined(),
    addressLine2         : yup.string().defined(),
    addressCity          : yup.string().defined(),
    addressState         : yup.string().defined(),
    addressPostalCode    : yup.string().defined(),
    friendlyIdStartNumber: yup.number().defined(),
    ccEmails             : yup.string().defined(),
    replyToEmails        : yup.string().defined()
});

type Props = {
    settlementsData: SettingsRetrieveReply_Settlements;
};

export default function SettlementsLetterhead({ settlementsData }: Props) {
    const [isEdit, setIsEdit] = useState(false);
    const [updateSettings, { isLoading: loadingUpdate }] =
        SettingsGrpcService.useUpdateSettingsMutation();
    const ccEmails = settlementsData.ccEmails.join(', ');
    const replyToEmails = settlementsData.replyToEmails.join(', ');
    const {
        control,
        handleSubmit,
        reset,
        formState: {
            isDirty,
            errors
        }
    } = useForm<SettlementsLetterheadDefaultValues>({
        defaultValues:
            { ...settlementsData, ccEmails, replyToEmails } ||
            SettingsRetrieveReply_Settlements.create(),
        values  : { ...settlementsData, ccEmails, replyToEmails },
        resolver: yupResolver(schema)
    });

    const onCancel = useCallback(() => {
        reset();
        setIsEdit(false);
    }, [reset]);

    const onSubmit = useCallback(
        (settlements: SettlementsLetterheadDefaultValues) => {
            console.debug('onSubmit', settlements);
            const ccEmails = settlements.ccEmails.split(',').map((email) => email.trim());
            const replyToEmails = settlements.replyToEmails.split(',').map((email) => email.trim());
            updateSettings({
                settlements: {
                    ...settlements,
                    ccEmails,
                    replyToEmails
                }
            })
                .unwrap()
                .then(() => {
                    setIsEdit(false);
                });
        },
        [updateSettings]
    );

    return (
        <Container sx={{ mb: '16px' }}>
            <MapSettingsHeader
                title="settings:settlements.general.titles.settlement_letterhead"
                icon={<SettingIcons.SettlementsSettings />}
                isEdit={isEdit}
                isDirty={isDirty}
                isLoading={loadingUpdate}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={onCancel}
                onEdit={() => setIsEdit(true)}
            />
            <SettlementsLetterheadFields
                control={control}
                errors={errors}
                isEdit={isEdit}
            />
        </Container>
    );
}
