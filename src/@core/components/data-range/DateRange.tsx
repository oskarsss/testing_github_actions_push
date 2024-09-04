import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import useAdvancedUpdateFilters, { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import {
    DateRange as DateRangeType,
    DateRangePicker,
    LocalizationProvider
} from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Shortcuts from '@/@core/ui-kits/basic/date-range/Shortcuts/Shortcuts';
import moment from 'moment-timezone';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DAY_OF_WEEK_FORMAT } from '@/@core/fields/inputs/DateInput';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';

type PeriodDateType = {
    start_date: string;
    end_date: string;
};

const transformValue = (value: DateRangeType<moment.Moment>): PeriodDateType => ({
    start_date: value[0]?.format('YYYY-MM-DD') || '',
    end_date  : value[1]?.format('YYYY-MM-DD') || ''
});

type ExtendFields = {
    start_at: string;
    end_at: string;
};

type Props<T extends ExtendFields> = {
    filterId: string;
    selectedFilters: T;
    defaultStartAt: string;
    defaultEndAt: string;
};

export default function DateRange<T extends ExtendFields>({
    filterId,
    selectedFilters,
    defaultStartAt,
    defaultEndAt
}: Props<T>) {
    const filters = useAppSelector((state) => state.filters);
    const { t } = useAppTranslation('core');

    const updateFilters = useAdvancedUpdateFilters({ filter_id: filterId });

    const dateChange = (date: PeriodDateType) => {
        updateFilters({
            ...selectedFilters,
            start_at: date.start_date || '',
            end_at  : date.end_date || '',
            page    : 0
        });
    };

    useEffect(() => {
        if (filters[filterId]) {
            dateChange({
                start_date: defaultStartAt,
                end_date  : defaultEndAt
            });
        }
    }, []);

    const shortcuts = () => (
        <Shortcuts
            setIsOpen={() => {}}
            selectedDate={[
                selectedFilters.start_at ? moment(selectedFilters.start_at) : null,
                selectedFilters.end_at ? moment(selectedFilters.end_at) : null
            ]}
            onChange={(value) => {
                dateChange(transformValue(value));
            }}
        />
    );

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
                dayOfWeekFormatter={(day, date) => moment(date).format(DAY_OF_WEEK_FORMAT)}
                localeText={{
                    start: t('date_range.start'),
                    end  : t('date_range.end')
                }}
                sx={{
                    width   : '300px',
                    minWidth: '300px',

                    '& .MuiFormLabel-root': {
                        color: (theme) => theme.palette.semantic.text.secondary
                    }
                }}
                slotProps={{
                    textField: {
                        size: 'small'
                    },
                    fieldSeparator: {
                        sx(theme) {
                            return {
                                color: theme.palette.semantic.border.secondary
                            };
                        }
                    }
                }}
                value={[
                    selectedFilters.start_at ? moment(selectedFilters.start_at) : null,
                    selectedFilters.end_at ? moment(selectedFilters.end_at) : null
                ]}
                onChange={(value) => {
                    dateChange(transformValue(value));
                }}
                slots={{
                    shortcuts
                }}
            />
        </LocalizationProvider>
    );
}
