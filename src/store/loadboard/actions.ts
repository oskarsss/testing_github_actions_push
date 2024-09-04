import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { AppThunkAction } from '../types';
import { LoadboardActions } from './slice';

const LOADBOARD_SELECTED_TAB = 'LOADBOARD_SELECTED_TAB';

export const loadboardInit = (): AppThunkAction<void> => (dispatch) => {
    dispatch(LoadboardGrpcService.endpoints.getSearches.initiate({}))
        .unwrap()
        .then(({ searches }) => {
            const selectedSearchId =
                localStorage.getItem(LOADBOARD_SELECTED_TAB) || searches[0]?.searchId;
            const isExist = searches.find((search) => search.searchId === selectedSearchId);

            if (isExist) {
                dispatch(LoadboardActions.setSelectedSearchId(selectedSearchId));
            }
            if (searches.length) {
                searches.forEach((search) => {
                    dispatch(
                        LoadboardGrpcService.endpoints.getViewedSearchResults.initiate({
                            searchId: search.searchId
                        })
                    );
                });
            }
        });

    dispatch(LoadboardGrpcService.endpoints.getEquipments.initiate({}));
};

export const SelectLoadboardTabAction =
    (searchId: string): AppThunkAction<void> =>
        (dispatch) => {
            localStorage.setItem(LOADBOARD_SELECTED_TAB, searchId);
            dispatch(LoadboardActions.setSelectedSearchId(searchId));
        };
