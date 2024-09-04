import React, { useState, useEffect } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { FormControl, FormHelperText, Tooltip, Typography } from '@mui/material';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { LoadClientReferenceIDCheckDuplicateRequest_EntityType } from '@proto/loads';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import TextInput from '@/@core/fields/inputs/TextInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

export const useEditReferenceIdDialogDialog = hookFabric(EditReferenceIdDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="346px"
        turnOffCloseButton
        {...props}
    />
));

type FormValues = {
    referenceId: string;
};

type Props = {
    initialValue: string;
    entityType: LoadClientReferenceIDCheckDuplicateRequest_EntityType;
    entityId: string;
    loadId: string;
};

type ErrorStateType = {
    loadId: string;
    loadFriendlyId: string;
} | null;

function EditReferenceIdDialog({
    initialValue,
    entityId,
    entityType,
    loadId
}: Props) {
    const dialog = useEditReferenceIdDialogDialog(true);
    const [error, setError] = useState<ErrorStateType>(null);
    const [checkDuplicate] = LoadsGrpcService.useClientCheckDuplicateRefIdMutation();
    const [update, updateState] = LoadsGrpcService.useUpdateLoadRefIdMutation();
    const { t } = useAppTranslation();

    const {
        control,
        handleSubmit,
        watch,
        formState: {
            errors,
            isDirty
        }
    } = useForm<FormValues>({
        defaultValues: {
            referenceId: initialValue
        },
        values: {
            referenceId: initialValue
        }
    });

    useEffect(() => {
        const subscription = watch((value) => {
            if (!value.referenceId) return;
            if (value.referenceId === initialValue) {
                setError(null);
                return;
            }
            checkDuplicate({ entityId, referenceId: value.referenceId, entityType })
                .unwrap()
                .then((res) => {
                    if (res.isDuplicate) {
                        setError({
                            loadFriendlyId: res.loadFriendlyId,
                            loadId        : res.loadId
                        });
                    } else {
                        setError(null);
                    }
                });
        });
        return () => subscription.unsubscribe();
    }, [checkDuplicate, entityId, entityType, initialValue, watch]);

    const onConfirmHandler = (data: FormValues) => {
        if (error) return;
        update({
            loadId,
            newClientReferenceId: data.referenceId
        });
        dialog.close();
    };

    return (
        <DialogComponents.Form
            onSubmit={handleSubmit(onConfirmHandler)}
            style={{
                display      : 'flex',
                flexDirection: 'column',
                gap          : '0.75rem'
            }}
        >
            <Typography
                fontWeight={600}
                fontSize="18px"
            >
                {t('modals:loads.edit_load.fields.dialog_titles.reference_id')}
            </Typography>
            <FormControl style={{ width: '100%' }}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="referenceId"
                    label="fields:reference_id.label"
                    placeholder="fields:reference_id.placeholder"
                    autoFocus
                />
                {error && (
                    <FormHelperText
                        sx={{ color: 'error.main' }}
                        id="stepper-linear-reference-id"
                        error
                    >
                        <span>
                            {t('modals:loads.edit_load.fields.errors.duplicate_load_id')}{' '}
                            <Tooltip
                                placement="top"
                                title={t('common:tooltips.open_in_new_tab')}
                            >
                                <Link
                                    href={APP_ROUTES_CONFIG.dispatch.orders.details(error.loadId)}
                                    target="_blank"
                                    style={{
                                        color         : 'inherit',
                                        fontWeight    : 'bold',
                                        textDecoration: 'underline',
                                        cursor        : 'pointer'
                                    }}
                                >
                                    {error.loadFriendlyId}
                                </Link>
                            </Tooltip>
                        </span>
                    </FormHelperText>
                )}
            </FormControl>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={!isDirty || !!error}
                    loading={updateState.isLoading}
                    text="common:button.confirm"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
