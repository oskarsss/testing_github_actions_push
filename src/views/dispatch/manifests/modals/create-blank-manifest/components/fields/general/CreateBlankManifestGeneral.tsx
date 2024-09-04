import { Stack } from '@mui/material';
import { StepTitle } from '@/views/new-loads/views/Draft/styled';
import Step1Icon from '@/views/new-loads/icons/Step1Icon';
import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import React, { memo } from 'react';
import { useCreateBlankManifestForm } from '@/views/dispatch/manifests/modals/create-blank-manifest/helpers';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function CreateBlankManifestGeneral() {
    const {
        control,
        formState: { errors }
    } = useCreateBlankManifestForm();

    const { t } = useAppTranslation();
    return (
        <Stack gap="inherit">
            <StepTitle>
                <Step1Icon />
                {`1. ${t('modals:manifests.create_blank.block.general.title')}`}
            </StepTitle>
            <FullDialog.Fields>
                <FullDialog.Field xs={12}>
                    <TextInput
                        errors={errors}
                        control={control}
                        width="100%"
                        label="modals:manifests.create_blank.block.general.fields.title.label"
                        name="title"
                        placeholder="modals:manifests.create_blank.block.general.fields.title.placeholder"
                    />
                </FullDialog.Field>

                <FullDialog.Field xs={12}>
                    <TextInput
                        width="100%"
                        errors={errors}
                        control={control}
                        label="modals:manifests.create_blank.block.general.fields.gross_amount.label"
                        name="grossAmount"
                        placeholder="modals:manifests.create_blank.block.general.fields.gross_amount.placeholder"
                        required
                    />
                </FullDialog.Field>
            </FullDialog.Fields>
        </Stack>
    );
}

export default memo(CreateBlankManifestGeneral);
