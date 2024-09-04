import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import DateRangePicker from '@/@core/ui-kits/basic/date-range/DateRange';

import { SchedulingActions } from '@/store/dispatch/scheduling/slice';
import { PeriodDateType, ValueType } from '@/@core/ui-kits/basic/date-range/types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import moment from 'moment-timezone';
import { IShortcutsItem } from '@/@core/ui-kits/basic/date-range/Shortcuts/config';
import useUpdateSearchFilters, {
    compareFilters
} from '@/hooks/search-params-filters/useUpdateSearchFilters';
import Router from 'next/router';
import { qsStringify, useAppSearchParams } from '@/hooks/search-params-filters/useAppSearchParams';
import { defaultSearchOptions } from './defaultSearchOptions';

export const ButtonController = styled(Button)(({ theme }) => ({
    minWidth   : 'auto',
    borderColor: theme.palette.semantic.border.secondary,
    padding    : '2px',
    height     : '40px',
    width      : '40px',

    '&:hover': {
        borderColor: theme.palette.semantic.border.secondary
    }
}));

export const Container = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : '5px'
});

const formatDate = (addDays: number, nowDate?: moment.Moment | null): ValueType => {
    const now = nowDate || moment();
    return [
        now.clone().startOf('day'),
        now
            .clone()
            .add(addDays - 1, 'days')
            .endOf('day')
    ];
};

export const useUpdateSchedulingSearchParams = () => {
    const searchParams = useAppSearchParams();

    return useCallback(
        (options: {
            from_date?: string;
            end_date?: string;
            periodDays?: number;
            period_id?: string;
        }) => {
            const {
                from_date,
                end_date,
                periodDays,
                period_id,
                ...filters
            } = searchParams;
            const comparedOptions = compareFilters(options, defaultSearchOptions);

            const stringify = qsStringify({ ...filters, ...comparedOptions });
            Router.push({
                search: stringify
            });
        },
        [searchParams]
    );
};

const customShortcuts: IShortcutsItem[] = [
    {
        label   : 'common:days.today',
        getValue: () => [moment().startOf('day'), moment().endOf('day')]
    },
    {
        label   : 'common:days.yesterday',
        getValue: () => [
            moment().subtract(1, 'day').startOf('day'),
            moment().subtract(1, 'day').endOf('day')
        ]
    },
    {
        label    : 'schedule:header.filters.shortcuts.three_days',
        getValue : (nowDate) => formatDate(3, nowDate),
        is_period: true
    },
    {
        label    : 'schedule:header.filters.shortcuts.one_week',
        getValue : (nowDate) => formatDate(7, nowDate),
        is_period: true
    },
    {
        label    : 'schedule:header.filters.shortcuts.two_weeks',
        getValue : (nowDate) => formatDate(14, nowDate),
        is_period: true
    },
    {
        label    : 'schedule:header.filters.shortcuts.month',
        getValue : (nowDate) => formatDate(30, nowDate),
        is_period: true
    },
    {
        label   : 'schedule:header.filters.shortcuts.this_and_next_week',
        getValue: (nowDate) => {
            const start_date = moment(nowDate).startOf('week');
            const end_date = moment(nowDate).endOf('week').add(1, 'week');
            return [start_date, end_date];
        }
    },
    {
        label   : 'core:basic.date_range.shortcuts.reset',
        getValue: () => [null, null]
    }
];

const RangeDatePicker = () => {
    const {
        from_date,
        end_date,
        periodDays
    } = useAppSelector(
        (state) => state.scheduling.search_options
    );

    const updateSearchOptions = useUpdateSchedulingSearchParams();

    const updateDate = useCallback(
        (date: PeriodDateType) => {
            const {
                start_date,
                end_date
            } = date;

            if (start_date && end_date) {
                updateSearchOptions({
                    from_date: start_date,
                    end_date
                });
            }
        },
        [updateSearchOptions]
    );

    const handlePeriod = useCallback(
        (type: 'next' | 'prev') => {
            const search_options = {
                periodDays,
                from_date: moment(from_date)
                    .add(type === 'next' ? periodDays : -periodDays, 'days')
                    .format('YYYY-MM-DD'),
                end_date: moment(end_date)
                    .add(type === 'next' ? periodDays : -periodDays, 'days')
                    .format('YYYY-MM-DD')
            };
            updateSearchOptions(search_options);

            // dispatch(SchedulingActions.UpdateSearchOptions(search_options));
        },
        [periodDays, from_date, end_date, updateSearchOptions]
    );

    return (
        <Container>
            <ButtonController
                onClick={() => handlePeriod('prev')}
                variant="outlined"
                color="secondary"
            >
                <KeyboardArrowLeftIcon
                    sx={{
                        color: (theme) => theme.palette.semantic.foreground.primary
                    }}
                />
            </ButtonController>

            <DateRangePicker
                date={{
                    start_date: from_date,
                    end_date
                }}
                onChange={updateDate}
                customShortcuts={customShortcuts}
            />

            <ButtonController
                onClick={() => handlePeriod('next')}
                variant="outlined"
                color="secondary"
            >
                <KeyboardArrowLeftIcon
                    sx={{
                        transform: 'rotate(180deg)',
                        color    : (theme) => theme.palette.semantic.foreground.primary
                    }}
                />
            </ButtonController>
        </Container>
    );
};
export default RangeDatePicker;
