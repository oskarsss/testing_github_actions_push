import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { FormControl, FormHelperText, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { ObjectSchema } from 'yup';
import * as yup from 'yup';
import BrokerSelect from '@/@core/fields/select/BrokerSelect/BrokerSelect';
import CustomerSelect from '@/@core/fields/select/CustomerSelect';
import {
    LoadClientReferenceIDCheckDuplicateReply,
    LoadClientReferenceIDCheckDuplicateRequest_EntityType,
    LoadClientUpdateRequest_EntityType
} from '@proto/loads';
import Link from 'next/link';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

export const useEditLoadClientDialog = hookFabric(EditLoadClientDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="550px"
        turnOffCloseButton
        {...props}
    />
));

type DefaultValues = {
    brokerId: string;
    customerId: string;
};

type Props = {
    isBrokerSelected: boolean;
    brokerId: string;
    customerId: string;
    loadId: string;
    referenceId: string;
    onSuccessfulUpdate?: () => void;
};

function EditLoadClientDialog({
    isBrokerSelected,
    brokerId,
    customerId,
    loadId,
    referenceId,
    onSuccessfulUpdate
}: Props) {
    const { t } = useAppTranslation();
    const editLoadClientDialog = useEditLoadClientDialog(true);
    const [updateClient, updateState] = LoadsGrpcService.useUpdateLoadClientMutation();
    const [checkDuplicate, checkDuplicateState] =
        LoadsGrpcService.useClientCheckDuplicateRefIdMutation();
    const [duplicateError, setDuplicateError] =
        useState<LoadClientReferenceIDCheckDuplicateReply | null>(null);

    const schema: ObjectSchema<DefaultValues> = useMemo(() => {
        if (isBrokerSelected) {
            return yup.object().shape({
                brokerId  : yup.string().required(),
                customerId: yup.string().defined()
            });
        }
        return yup.object().shape({
            brokerId  : yup.string().defined(),
            customerId: yup.string().required()
        });
    }, [isBrokerSelected]);

    const {
        control,
        watch,
        setError,
        clearErrors,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        }
    } = useForm<DefaultValues>({
        defaultValues: { brokerId, customerId },
        values       : { brokerId, customerId },
        resolver     : yupResolver(schema)
    });

    const onConfirmHandler = (data: DefaultValues) => {
        const entityType = isBrokerSelected
            ? LoadClientUpdateRequest_EntityType.BROKER
            : LoadClientUpdateRequest_EntityType.CUSTOMER;

        updateClient({
            entityType,
            entityId: isBrokerSelected ? data.brokerId : data.customerId,
            loadId
        })
            .unwrap()
            .then(() => {
                onSuccessfulUpdate?.();
                editLoadClientDialog.close();
            });
    };

    const onCheckDuplicate = useCallback(
        (brokerId = '', customerId = '') => {
            const entityType = isBrokerSelected
                ? LoadClientReferenceIDCheckDuplicateRequest_EntityType.BROKER
                : LoadClientReferenceIDCheckDuplicateRequest_EntityType.CUSTOMER;

            const entityId = isBrokerSelected ? brokerId : customerId;
            const entityTypeLocal = isBrokerSelected ? 'brokerId' : 'customerId';

            if (!entityId) {
                setDuplicateError(null);
                clearErrors(entityTypeLocal);
                return;
            }

            checkDuplicate({ entityId, referenceId, entityType })
                .unwrap()
                .then((res) => {
                    if (res.isDuplicate && res.loadId !== loadId) {
                        setDuplicateError(res);
                        setError(entityTypeLocal, {
                            type   : 'manual',
                            message: ''
                        });
                    } else {
                        setDuplicateError(null);
                        clearErrors(entityTypeLocal);
                    }
                })
                .catch(() => {
                    setDuplicateError(null);
                    clearErrors(entityTypeLocal);
                });
        },
        [checkDuplicate, clearErrors, isBrokerSelected, loadId, referenceId, setError]
    );

    useEffect(() => {
        const subscription = watch((value) => {
            onCheckDuplicate(value.brokerId, value.customerId);
        });
        return () => subscription.unsubscribe();
    }, [onCheckDuplicate, watch]);

    const disabledSubmit =
        !isDirty || !!duplicateError || checkDuplicateState.isLoading || !isValid;

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
                {t(isBrokerSelected ? 'entity:broker' : 'entity:customer')}
            </Typography>
            <FormControl style={{ width: '100%' }}>
                {isBrokerSelected ? (
                    <BrokerSelect
                        control={control}
                        name="brokerId"
                        required
                    />
                ) : (
                    <CustomerSelect
                        control={control}
                        name="customerId"
                        required
                    />
                )}
                {duplicateError?.isDuplicate && (
                    <FormHelperText error>
                        <span>
                            {t('modals:loads.edit_load.fields.errors.duplicate_load_id')}
                            <Tooltip
                                placement="top"
                                title={t('common:tooltips.open_in_new_tab')}
                            >
                                <Link
                                    href={APP_ROUTES_CONFIG.dispatch.orders.details(
                                        duplicateError.loadId
                                    )}
                                    target="_blank"
                                    style={{
                                        color         : 'inherit',
                                        fontWeight    : 'bold',
                                        textDecoration: 'underline',
                                        cursor        : 'pointer',
                                        marginLeft    : '4px'
                                    }}
                                >
                                    {duplicateError.loadFriendlyId}
                                </Link>
                            </Tooltip>
                        </span>
                    </FormHelperText>
                )}
            </FormControl>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={editLoadClientDialog.close} />
                <DialogComponents.SubmitButton
                    disabled={disabledSubmit}
                    loading={updateState.isLoading}
                    text="common:button.confirm"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
