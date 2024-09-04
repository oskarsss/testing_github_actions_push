import { createAsyncThunk } from '@reduxjs/toolkit';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { RootState } from '@/pages/_app';
import toast from 'react-hot-toast';
import { TrucksDataActions } from '../slice';

const UpdateTruckCacheDataThunk = createAsyncThunk(
    'trucksData/updateTruckCacheData',
    async (
        payload: { truckId: string; data: Partial<TruckModel_Truck>; queryFulfilled: Promise<any> },
        {
            dispatch,
            getState
        }
    ) => {
        const store = getState() as RootState;
        const {
            truckId,
            data,
            queryFulfilled
        } = payload;
        dispatch(
            TrucksDataActions.UpdateTruck({ truck: { truckId, ...data }, isCacheUpdate: true })
        );

        const prevState = store.trucksData.trucksByIdMap[truckId];

        queryFulfilled.catch((error) => {
            const message = error?.error?.data?.message || 'Oops! Something went wrong';
            toast.error(message, {
                duration: 5000,
                position: 'top-right'
            });
            if (prevState) {
                dispatch(TrucksDataActions.UpdateTruck({ truck: prevState, isCacheUpdate: true }));
            }
        });
    }
);

export { UpdateTruckCacheDataThunk };
