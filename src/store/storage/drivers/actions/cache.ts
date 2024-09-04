import { RootState } from '@/store/types';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { DriversDataActions } from '../slice';

const UpdateDriverDataCache = createAsyncThunk(
    'driversData/updateDriverDataCache',
    async (
        payload: {
            driverId: string;
            data: Partial<DriverModel_Driver>;
            queryFulfilled: Promise<any>;
        },
        {
            dispatch,
            getState
        }
    ) => {
        const store = getState() as RootState;
        const {
            driverId,
            data,
            queryFulfilled
        } = payload;
        dispatch(
            DriversDataActions.UpdateDriver({
                driver       : { driverId, ...data },
                isCacheUpdate: true
            })
        );

        const prevDriverIdx = store.driversData.indexes.driverIdToIndexesMap[driverId];
        const prevState = store.driversData.rows[prevDriverIdx];

        queryFulfilled.catch((error) => {
            const message = error?.error?.data?.message || 'Oops! Something went wrong';
            toast.error(message, {
                duration: 5000,
                position: 'top-right'
            });
            if (prevState) {
                dispatch(
                    DriversDataActions.UpdateDriver({ driver: prevState, isCacheUpdate: true })
                );
            }
        });
    }
);

export { UpdateDriverDataCache };
