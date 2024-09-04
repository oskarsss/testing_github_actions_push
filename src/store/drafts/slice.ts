/* eslint-disable no-param-reassign */
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

export type InitialState = {
    isCreateLoading: boolean;
    isUploadingDocument: boolean;
    selectedDraftId: string;
    sameFriendlyManifestId: boolean;
    hasDuplicateError: boolean;

    loadOwner: 'broker' | 'customer';
    extract: {
        isExtractLoading: boolean;
        extractByDefault: boolean;
    };
    created_load_data: {
        load_id: string;
    };
};

const initialState: InitialState = {
    isCreateLoading       : false,
    isUploadingDocument   : false,
    hasDuplicateError     : false,
    sameFriendlyManifestId: true,
    selectedDraftId       : '',

    loadOwner: 'broker',
    extract  : {
        isExtractLoading: false,
        extractByDefault: true
    },
    created_load_data: {
        load_id: ''
    }
};

const draftsSlice = createSlice({
    name    : 'drafts',
    initialState,
    reducers: {
        ToggleSameFriendlyManifestId(state) {
            state.sameFriendlyManifestId = !state.sameFriendlyManifestId;
        },
        SetCreateLoading(state, action: PayloadAction<boolean>) {
            state.isCreateLoading = action.payload;
        },
        SetUploadingDocument(state, action: PayloadAction<boolean>) {
            state.isUploadingDocument = action.payload;
        },
        SetSelectedDraftId(state, action: PayloadAction<string>) {
            state.selectedDraftId = action.payload;
        },
        SetExtractByDefault(state, action: PayloadAction<boolean>) {
            state.extract.extractByDefault = action.payload;
        },
        SetExtractLoading(state, action: PayloadAction<boolean>) {
            state.extract.isExtractLoading = action.payload;
        },
        SetHasDuplicateError(state, action: PayloadAction<boolean>) {
            state.hasDuplicateError = action.payload;
        },
        SetCreatedLoadData(state, { payload: { load_id } }: PayloadAction<{ load_id: string }>) {
            state.created_load_data.load_id = load_id;
        },
        ResetCreatedLoadData(state) {
            state.created_load_data.load_id = '';
        },
        SetLoadOwner(state, action: PayloadAction<'broker' | 'customer'>) {
            state.loadOwner = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
        builder.addMatcher(
            LoadDraftsGrpcService.endpoints.retrieveDraft.matchFulfilled,
            (state, { payload }) => {
                if (payload.loadDraft?.fields?.brokerId) {
                    state.loadOwner = 'broker';
                    return;
                }
                if (payload.loadDraft?.fields?.customerId) {
                    state.loadOwner = 'customer';
                    return;
                }
                state.loadOwner = 'broker';
            }
        );
    }
});

export const DraftsReducer = draftsSlice.reducer;

export const DraftsActions = draftsSlice.actions;
