/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import Scheduling from '@/store/dispatch/scheduling/types';
import { api } from '@/store/api';

const updateSchedulingSearchOptions = (
    search_options: Scheduling.Redux.SearchOptions
): Scheduling.Redux.SearchOptions => {
    let period_id = 'default';
    let periodDays = 0;

    const {
        from_date,
        end_date
    } = search_options;
    const start = moment(from_date, 'YYYY-MM-DD');
    const end = moment(end_date, 'YYYY-MM-DD');

    const currentDate = moment();

    const startOfNow = currentDate.clone().subtract(1, 'day');
    const endOfNow = currentDate.clone().add(5, 'days');

    const startOfThisWeek = currentDate.clone().startOf('week');
    const endOfThisWeek = currentDate.clone().endOf('week');

    const startOfLastWeek = startOfThisWeek.clone().subtract(1, 'week');
    const endOfLastWeek = endOfThisWeek.clone().subtract(1, 'week');

    const startOfNextWeek = startOfThisWeek.clone().add(1, 'week');
    const endOfNextWeek = endOfThisWeek.clone().add(1, 'week');

    if (start.isSameOrAfter(startOfNow, 'day') && end.isSameOrBefore(endOfNow, 'day')) {
        period_id = 'now';
    } else if (
        start.isSameOrAfter(startOfLastWeek, 'day') &&
        end.isSameOrBefore(endOfLastWeek, 'day')
    ) {
        period_id = 'last_week';
    } else if (
        start.isSameOrAfter(startOfNextWeek, 'day') &&
        end.isSameOrBefore(endOfNextWeek, 'day')
    ) {
        period_id = 'next_week';
    }

    periodDays = end.add(1, 'days').diff(start, 'days');

    return { ...search_options, period_id, periodDays };
};

export const initialState: Scheduling.Redux.InitialState = {
    search_options: {
        period_id : 'now',
        periodDays: 7,
        from_date : moment().subtract(1, 'day').format('YYYY-MM-DD'),
        end_date  : moment().add(5, 'days').format('YYYY-MM-DD')
    },
    truck_online: { truck_id: '', online: false }
};

const schedulingSlice = createSlice({
    name    : 'scheduling',
    initialState,
    reducers: {
        UpdateSearchOptions(state, action: PayloadAction<Scheduling.Redux.SearchOptions>) {
            const search_options = updateSchedulingSearchOptions(action.payload);
            state.search_options = {
                ...state.search_options,
                ...search_options
            };
        },
        setTruckOnline(
            state,
            action: PayloadAction<Scheduling.Redux.InitialState['truck_online']>
        ) {
            state.truck_online = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const SchedulingReducer = schedulingSlice.reducer;

export const SchedulingActions = schedulingSlice.actions;
