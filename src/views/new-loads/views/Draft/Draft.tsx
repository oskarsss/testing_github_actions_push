/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unsafe-optional-chaining */
import { createContext, memo, useCallback, useContext, useEffect, useMemo } from 'react';
import {
    Control,
    FieldErrors,
    UseFormClearErrors,
    UseFormGetValues,
    UseFormReset,
    UseFormSetError,
    UseFormSetValue,
    UseFormWatch,
    useForm
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { load_schema } from '@/views/new-loads/views/schema';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DraftsActions } from '@/store/drafts/slice';
import DraftsTypes from '@/store/drafts/types';
import { LoadsActions, SelectLoadIndexById } from '@/store/dispatch/loads/slice';
import { LinearProgress } from '@mui/material';
import navigateToPage from '@/utils/navigateToPage';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { LoadDraftModel_Status } from '@proto/models/model_load_draft';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import {
    DraftSelectedDraftIdSelector,
    DraftsHasDuplicateErrorSelector,
    DraftsLoadOwnerSelector,
    DraftsSameFriendlyManifestId
} from '@/store/drafts/selectors';
import { api } from '@/store/api';
import { useDraftsMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { qsStringify } from '@/hooks/search-params-filters/useAppSearchParams';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import { OrdersDataActions } from '@/store/storage/orders/slice';
import Toolbar from './draft-toolbar/Toolbar';
import { DraftForm } from './styled';
import { showError } from '../../utils/draft-utils';
import { newLoadDefaultValue } from '../../hooks/useExtractFile';
import DraftFormContainer from './draft-form/DraftFormContainer';
import { useNewLoadsDialog } from '../../NewLoads';

type LoadDraftContextType = {
    control: Control<DraftsTypes.Fields, any>;
    setValue: UseFormSetValue<DraftsTypes.Fields>;
    getValues: UseFormGetValues<DraftsTypes.Fields>;
    watch: UseFormWatch<DraftsTypes.Fields>;
    setError: UseFormSetError<DraftsTypes.Fields>;
    clearErrors: UseFormClearErrors<DraftsTypes.Fields>;
    reset: UseFormReset<DraftsTypes.Fields>;
};

const defaultFn = () => {};

const DraftFormContext = createContext<LoadDraftContextType>({
    setValue   : () => {},
    getValues  : defaultFn as UseFormGetValues<DraftsTypes.Fields>,
    control    : {} as Control<DraftsTypes.Fields, any>,
    watch      : defaultFn as UseFormWatch<DraftsTypes.Fields>,
    setError   : () => {},
    reset      : () => {},
    clearErrors: () => {}
});

const errorMessagesConfig = {
    customerId     : 'new_loads:errors.customerId',
    brokerId       : 'new_loads:errors.brokerId',
    referenceId    : 'new_loads:errors.referenceId',
    typeId         : 'new_loads:errors.typeId',
    equipmentTypeId: 'new_loads:errors.equipmentTypeId',
    stops          : 'new_loads:errors.stops',
    invoiceItems   : 'new_loads:errors.invoiceItems',
    loadedMiles    : 'new_loads:errors.loadedMiles'
} as const;

export const useDraftFormContext = () => useContext(DraftFormContext);

const Draft = () => {
    const dispatch = useAppDispatch();
    const selectedDraftId = useAppSelector(DraftSelectedDraftIdSelector);
    const hasDuplicateError = useAppSelector(DraftsHasDuplicateErrorSelector);
    const sameFriendlyManifestId = useAppSelector(DraftsSameFriendlyManifestId);

    const draftsMap = useDraftsMap();
    const draftStatus = draftsMap[selectedDraftId]?.status;

    const newLoadsDialog = useNewLoadsDialog();
    const { t } = useAppTranslation();

    const [updateDraft, updateLoadState] = LoadDraftsGrpcService.useUpdateDraftMutation();

    const {
        data,
        isLoading
    } = LoadDraftsGrpcService.useRetrieveDraftQuery(
        {
            loadDraftId: selectedDraftId
        },
        {
            refetchOnMountOrArgChange: true,
            skip                     : !selectedDraftId,
            ...(draftStatus === LoadDraftModel_Status.EXTRACTING && {
                pollingInterval: 1000
            })
        }
    );

    const loadOwner = useAppSelector(DraftsLoadOwnerSelector);

    const [createLoad, createLoadState] = LoadDraftsGrpcService.useCreateNewLoadMutation();

    const [deleteDraft] = LoadDraftsGrpcService.useDeleteDraftMutation();

    const resolver = useMemo(() => yupResolver(load_schema(loadOwner)), [loadOwner]);

    const methods = useForm<DraftsTypes.Fields>({
        defaultValues: newLoadDefaultValue,
        values       : data?.loadDraft?.fields,
        resolver,
        disabled     : isLoading,
        mode         : 'onSubmit'
    });

    const updateDraftHandler = useCallback(
        async (value: DraftsTypes.UpdateDraftRequest) => updateDraft(value).unwrap(),
        [updateDraft]
    );

    useEffect(() => {
        if (draftStatus === LoadDraftModel_Status.EXTRACTING) {
            dispatch(DraftsActions.SetExtractLoading(true));

            if (data?.loadDraft?.status === LoadDraftModel_Status.PENDING) {
                dispatch(
                    api.util.invalidateTags([
                        'drafts',
                        'waypoints',
                        { type: 'draft', id: selectedDraftId },
                        { type: 'brokers', id: 'LIST' }
                    ])
                );
            }
        } else {
            dispatch(
                api.util.invalidateTags([
                    'drafts',
                    'waypoints',
                    { type: 'draft', id: selectedDraftId },
                    { type: 'brokers', id: 'LIST' }
                ])
            );
            dispatch(DraftsActions.SetExtractLoading(false));
        }
    }, [draftStatus, data?.loadDraft?.status, dispatch]);

    useEffect(() => {
        methods.clearErrors();
    }, [selectedDraftId]);

    const onErrorForm = (error: FieldErrors<DraftsTypes.Fields>) => {
        const messagesArray = Object.keys(error).reduce((acc, key) => {
            const message =
                t(errorMessagesConfig[key as keyof typeof errorMessagesConfig] || '') ||
                t('new_loads:errors.field_required');
            return [...acc, message];
        }, [] as string[]);

        if (hasDuplicateError) messagesArray.push(t('new_loads:errors.duplicate_load'));

        if (messagesArray.length <= 3) {
            showError(messagesArray.join('\n '), t);
        } else {
            showError(undefined, t);
        }
    };

    const onSubmitForm = async () => {
        if (hasDuplicateError) {
            onErrorForm({});
            return;
        }
        const { load } = await createLoad({
            loadDraftId: selectedDraftId
        }).unwrap();

        if (load) {
            navigateToPage(
                APP_ROUTES_CONFIG.dispatch.orders.path,
                { id: load.friendlyId },
                qsStringify({
                    search: `${load.friendlyId}`
                })
            ).then(() => {
                dispatch(OrdersDataActions.UpdateOrder({ order: load, isCacheUpdate: false }));

                dispatch(SelectLoadIndexById({ orderId: load.loadId }));
                deleteDraft({ loadDraftId: selectedDraftId });

                newLoadsDialog.close().then(() => {
                    dispatch(LoadsActions.LoadCreated(true));
                });
            });
        }
    };

    const formContextValues: LoadDraftContextType = useMemo(
        () => ({
            control    : methods.control,
            setValue   : methods.setValue,
            getValues  : methods.getValues,
            watch      : methods.watch,
            setError   : methods.setError,
            reset      : methods.reset,
            clearErrors: methods.clearErrors
        }),
        [
            methods.control,
            methods.setValue,
            methods.getValues,
            methods.watch,
            methods.setError,
            methods.reset,
            methods.clearErrors
        ]
    );
    return (
        <DraftForm onSubmit={methods.handleSubmit(onSubmitForm, onErrorForm)}>
            {isLoading && (
                <LinearProgress
                    sx={{
                        position: 'absolute',
                        top     : -3,
                        left    : 0,
                        width   : '100%',
                        zIndex  : 100,
                        height  : 3
                    }}
                />
            )}
            <Toolbar
                isCreateLoadLoading={createLoadState.isLoading}
                isUpdateLoading={updateLoadState.isLoading}
                isUpdateSuccess={updateLoadState.isSuccess}
            />
            <DraftFormContext.Provider value={formContextValues}>
                <DraftFormContainer
                    updateDraftHandler={updateDraftHandler}
                    draftStatus={draftStatus}
                    loadDraftFields={data?.loadDraft?.fields}
                />
            </DraftFormContext.Provider>
        </DraftForm>
    );
};

export default memo(Draft);
