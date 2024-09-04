import { useSettings } from '@/store/settings/hooks';
import SettingIcons from '@/views/settings/icons/icons';
import React, { useCallback, useState } from 'react';
import Section from '@/views/settings/components/Section/Section';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import Loading from '@/@core/components/page/Loading';
import * as yup from 'yup';
import { SettingsRetrieveReply_Security } from '@proto/settings';
import SettingsGrpcService from '@/@grpcServices/services/settings.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MapSettingsHeader from '@/views/settings/components/MapSections/MapSettingsHeader';
import Container from '@/views/settings/components/Container/Container';
import MapSectionsInputs from '@/views/settings/components/EditableInputsGroup/MapSectionsInputs';
import { Form } from '@/views/settings/components/EditableInputsGroup/styled';

const schema: yup.ObjectSchema<SettingsRetrieveReply_Security> = yup.object().shape({
    enforceSecondStepAuth: yup.boolean().defined(),
    enforceStrongPassword: yup.boolean().defined()
});

export default function Security() {
    const [isEdit, setIsEdit] = useState(false);
    const [updateSettings, { isLoading: loadingUpdate }] =
        SettingsGrpcService.useUpdateSettingsMutation();

    const {
        securitySections,
        isError,
        isLoading
    } = useSettings();

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            isDirty,
            errors
        }
    } = useForm<SettingsRetrieveReply_Security>({
        defaultValues: securitySections || SettingsRetrieveReply_Security.create(),
        values       : securitySections,
        resolver     : yupResolver(schema)
    });

    const onCancel = useCallback(() => {
        reset();
        setIsEdit(false);
    }, [reset]);

    const onSubmit = useCallback(
        (security: SettingsRetrieveReply_Security) => {
            updateSettings({ security })
                .unwrap()
                .then(() => {
                    setIsEdit(false);
                });
        },
        [updateSettings]
    );

    if (isError) {
        return (
            <Section>
                <FallbackContent
                    icon={<VectorIcons.Cone />}
                    firstText="common:error"
                />
            </Section>
        );
    }

    if (isLoading || !securitySections) {
        return (
            <Section>
                <Loading />
            </Section>
        );
    }

    return (
        <Section>
            <Container sx={{ mb: '16px' }}>
                <MapSettingsHeader
                    title="settings:security.title"
                    icon={<SettingIcons.Security />}
                    isEdit={isEdit}
                    isDirty={isDirty}
                    isLoading={loadingUpdate}
                    onSubmit={handleSubmit(onSubmit)}
                    onCancel={onCancel}
                    onEdit={() => setIsEdit(true)}
                />
                <Form>
                    <MapSectionsInputs.CheckboxInput
                        name="enforceSecondStepAuth"
                        label="settings:security.fields.labels.enforce_second_step_auth"
                        placeholder=""
                        control={control}
                        errors={errors}
                        isEdit={isEdit}
                    />
                    <MapSectionsInputs.CheckboxInput
                        name="enforceStrongPassword"
                        label="settings:security.fields.labels.enforce_strong_password"
                        placeholder=""
                        control={control}
                        errors={errors}
                        isEdit={isEdit}
                    />
                </Form>
            </Container>
        </Section>
    );
}
