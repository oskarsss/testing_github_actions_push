/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DraftsActions } from '@/store/drafts/slice';
import { useController, useWatch } from 'react-hook-form';
import { TestIDs } from '@/configs/tests';
import { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextInput from '@/@core/fields/inputs/TextInput';
import BrokerSelect from '@/@core/fields/select/BrokerSelect/BrokerSelect';
import CustomerSelect from '@/@core/fields/select/CustomerSelect';
import { Tooltip } from '@mui/material';
import Link from 'next/link';
import { LoadClientRadioGroupValueType } from '@/configs/load-client-radio-groups-config';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import {
    LoadDraftCheckDuplicateRequest,
    LoadDraftCheckDuplicateRequest_EntityType
} from '@proto/load_drafts';
import { DraftsLoadOwnerSelector } from '@/store/drafts/selectors';
import { useBrokersMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import { useDraftFormContext } from '../../Draft';

type Props = {
    radioGroupValue: LoadClientRadioGroupValueType;
};

const ClientSelectGroup = ({ radioGroupValue }: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const loadOwner = useAppSelector(DraftsLoadOwnerSelector);

    const [checkDuplicate] = LoadDraftsGrpcService.useCheckDraftDuplicateMutation();

    const {
        control,
        setValue
    } = useDraftFormContext();

    const {
        formState: { errors }
    } = useController({ name: 'referenceId', control });

    const brokersMap = useBrokersMap();

    const brokeId = useWatch({ name: 'brokerId', control });

    const customerId = useWatch({ name: 'customerId', control });

    const referenceId = useWatch({ name: 'referenceId', control });

    const [duplicateData, setDuplicateData] = useState({
        duplicate       : false,
        load_id         : '',
        load_friendly_id: ''
    });
    const entityId = loadOwner === 'broker' ? brokeId : customerId;

    const onCheckDuplicate = (data: Omit<LoadDraftCheckDuplicateRequest, 'entityType'>) => {
        checkDuplicate({
            entityId: data.entityId,
            entityType:
                loadOwner === 'broker'
                    ? LoadDraftCheckDuplicateRequest_EntityType.BROKER
                    : LoadDraftCheckDuplicateRequest_EntityType.CUSTOMER,
            referenceId: data.referenceId
        })
            .unwrap()
            .then((res) => {
                if (res.isDuplicate) {
                    dispatch(DraftsActions.SetHasDuplicateError(res.isDuplicate));
                    setDuplicateData({
                        duplicate       : res.isDuplicate,
                        load_id         : res.loadId.toString(),
                        load_friendly_id: res.loadFriendlyId.toString()
                    });
                } else {
                    dispatch(DraftsActions.SetHasDuplicateError(false));
                    setDuplicateData({
                        duplicate       : false,
                        load_id         : '',
                        load_friendly_id: ''
                    });
                }
            })
            .catch((err) => {
                setDuplicateData({
                    duplicate       : false,
                    load_id         : '',
                    load_friendly_id: ''
                });
                console.error('CHECK DUPLICATE', err);
            });
    };

    const onChangeBrokerHandler = (value: string) => {
        const broker = brokersMap[value];
        if (broker) {
            setValue('brokerContactEmail', broker.email);
        }
    };

    useEffect(() => {
        onCheckDuplicate({
            referenceId: referenceId.trim() || '',
            entityId
        });
    }, [referenceId, entityId, loadOwner]);

    const duplicateError = useMemo(() => {
        if (referenceId && duplicateData.duplicate && entityId) {
            return {
                referenceId: {
                    message: `${t('new_loads:draft.form.fields.reference_id.error')} ${
                        duplicateData.load_friendly_id
                    }`,
                    type: 'custom'
                }
            };
        }

        return {};
    }, [referenceId, duplicateData.duplicate, duplicateData.load_friendly_id, entityId]);

    return (
        <>
            <Grid
                item
                xs={9}
                style={{ position: 'relative' }}
            >
                {radioGroupValue === 'customer_id' ? (
                    <CustomerSelect
                        control={control}
                        required
                        key={customerId}
                        name="customerId"
                        testID={TestIDs.pages.createLoad.fields.customer}
                    />
                ) : (
                    <BrokerSelect
                        onChangeAction={onChangeBrokerHandler}
                        name="brokerId"
                        required
                        key={brokeId}
                        control={control}
                        inputTestID={TestIDs.pages.createLoad.fields.broker}
                    />
                )}
            </Grid>
            <Grid
                item
                xs={3}
            >
                <TextInput
                    width="100%"
                    name="referenceId"
                    label="new_loads:draft.form.fields.reference_id.label"
                    testID={TestIDs.pages.createLoad.fields.loadRef}
                    control={control}
                    errors={errors.referenceId ? errors : duplicateError}
                    placeholder="new_loads:draft.form.fields.reference_id.placeholder"
                    ErrorComponent={
                        duplicateData.duplicate ? (
                            <span>
                                {t('new_loads:draft.form.fields.reference_id.error')}{' '}
                                <Tooltip
                                    placement="top"
                                    title="View load"
                                >
                                    <Link
                                        href={`${
                                            APP_ROUTES_CONFIG.dispatch.orders.path
                                        }?${new URLSearchParams({
                                            search: `order_id:${duplicateData.load_friendly_id}`
                                        })}`}
                                        target="_blank"
                                        style={{
                                            color         : 'inherit',
                                            fontWeight    : 'bold',
                                            textDecoration: 'underline',
                                            cursor        : 'pointer'
                                        }}
                                    >
                                        {duplicateData.duplicate
                                            ? duplicateData.load_friendly_id
                                            : errors.referenceId?.message}
                                    </Link>
                                </Tooltip>
                            </span>
                        ) : (
                            errors.referenceId?.message
                        )
                    }
                />
            </Grid>
        </>
    );
};

export default ClientSelectGroup;
