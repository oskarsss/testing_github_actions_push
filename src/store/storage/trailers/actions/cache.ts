import { RootState } from '@/store/types';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { TrailersDataActions } from '../slice';

const UpdateTrailerCacheDataThunk = createAsyncThunk(
    'trailersData/updateTrailerCacheData',
    async (
        payload: {
            trailerId: string;
            data: Partial<TrailerModel_Trailer>;
            queryFulfilled: Promise<any>;
        },
        {
            dispatch,
            getState
        }
    ) => {
        const store = getState() as RootState;
        const {
            trailerId,
            data,
            queryFulfilled
        } = payload;
        dispatch(
            TrailersDataActions.UpdateTrailer({
                trailer      : { trailerId, ...data },
                isCacheUpdate: true
            })
        );

        const prevTrailerIdx = store.trailersData.indexes.trailerIdToIndexesMap[trailerId];
        const prevState = store.trailersData.rows[prevTrailerIdx];

        queryFulfilled.catch((error) => {
            const message = error?.error?.data?.message || 'Oops! Something went wrong';
            toast.error(message, {
                duration: 5000,
                position: 'top-right'
            });
            if (prevState) {
                dispatch(
                    TrailersDataActions.UpdateTrailer({ trailer: prevState, isCacheUpdate: true })
                );
            }
        });
    }
);

export { UpdateTrailerCacheDataThunk };
