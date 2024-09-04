import React, { useCallback, useMemo, useState } from 'react';
import SettingsGrpcService from '@/@grpcServices/services/settings.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MapSettingsHeader from '@/views/settings/components/MapSections/MapSettingsHeader';
import Container from '@/views/settings/components/Container/Container';
import MapSectionsInputs from '@/views/settings/components/EditableInputsGroup/MapSectionsInputs';
import { Form } from '@/views/settings/components/EditableInputsGroup/styled';

type DefaultValues = {
    ccEmails: string[];
    replyToEmails: string[];
};

const defaultValues: DefaultValues = {
    ccEmails     : [],
    replyToEmails: []
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    ccEmails     : yup.array().of(yup.string().defined()).defined(),
    replyToEmails: yup.array().of(yup.string().defined()).defined()
});

type Props = {
    replyToEmails: string[];
    ccEmails: string[];
};

export default function SettlementsEmails({
    replyToEmails,
    ccEmails
}: Props) {
    const [isEdit, setIsEdit] = useState(false);
    const [updateSettings, { isLoading: loadingUpdate }] =
        SettingsGrpcService.useUpdateSettingsMutation();

    const valuesData: DefaultValues = useMemo(
        () => ({
            ccEmails,
            replyToEmails
        }),
        [ccEmails, replyToEmails]
    );

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            isDirty,
            errors
        }
    } = useForm<DefaultValues>({
        defaultValues: valuesData || defaultValues,
        values       : valuesData,
        resolver     : yupResolver(schema)
    });

    const onCancel = useCallback(() => {
        reset();
        setIsEdit(false);
    }, [reset]);

    const onSubmit = useCallback(
        (settlements: DefaultValues) => {
            updateSettings({
                settlements: {
                    ccEmails     : settlements.ccEmails,
                    replyToEmails: settlements.replyToEmails
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
                title="settings:settlements.general.titles.email_settings"
                isEdit={isEdit}
                isDirty={isDirty}
                isLoading={loadingUpdate}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={onCancel}
                onEdit={() => setIsEdit(true)}
            />
            <Form style={{ alignItems: 'flex-start' }}>
                <MapSectionsInputs.EmailsInput
                    control={control}
                    errors={errors}
                    label="settings:settlements.general.fields.labels.reply_to_emails"
                    placeholder=""
                    name="replyToEmails"
                    isEdit={isEdit}
                />
                <MapSectionsInputs.EmailsInput
                    control={control}
                    errors={errors}
                    label="settings:settlements.general.fields.labels.ccd_emails"
                    placeholder=""
                    name="ccEmails"
                    isEdit={isEdit}
                />
            </Form>
        </Container>
    );
}
