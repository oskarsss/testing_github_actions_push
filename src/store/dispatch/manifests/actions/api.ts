import { ManifestsGrpcClient } from '@/@grpcServices/services/manifests-service/manifests.service';
import { RootState } from '@/pages/_app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import { FORMATTED_MANIFEST_STATUS_TO_GRPC_ENUM } from '@/models/manifests/mapping';
import { ManifestGetRequest_SortType } from '@proto/manifests';
import { ManifestsActions } from '../slice';

export const getMeta = (state: RootState) => {
    const {
        company_id,
        token
    } = state.app;

    return {
        company_id,
        Authorization: `Bearer ${token}`
    };
};

export const getUnarchivedManifestsThunk = createAsyncThunk(
    'manifests/getUnarchivedManifests',
    async (p: null, {
        getState,
        dispatch
    }) => {
        const state = getState() as RootState;

        const res = await ManifestsGrpcClient.manifestUnarchivedGet(
            {},
            {
                meta: getMeta(state)
            }
        );
        const { manifests } = res.response;
        dispatch(ManifestsActions.SetAllManifestsList(manifests));
    }
);

export const getArchivedManifestsThunk = createAsyncThunk(
    'manifests/getArchivedManifests',
    async ({ autoSelectManifest }: { autoSelectManifest: boolean }, {
        getState,
        dispatch
    }) => {
        const state = getState() as RootState;

        const selected_filters = state.filters[
            `manifest_${state.pages.manifest}`
        ] as typeof manifestDefaultFilters;

        dispatch(ManifestsActions.ToggleIsFetching(true));

        const res = await ManifestsGrpcClient.manifestGet(
            {
                page      : 0,
                perPage   : 1000000,
                sortType  : ManifestGetRequest_SortType.FIRST_STOP_APPOINTMENT_START_AT_DESC,
                driverIds : [],
                statuses  : [],
                trailerIds: [],
                truckIds  : [],
                startDate : selected_filters.start_at,
                endDate   : selected_filters.end_at,
                loadIds   : [],
                search    : ''
            },
            {
                meta: getMeta(state)
            }
        );

        return {
            originalData: res.response.manifests,
            totals      : res.response.totals,
            autoSelectManifest
        };
    }
);
