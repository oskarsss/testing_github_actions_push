import { useCallback, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import Shortcuts from '@/@core/ui-kits/basic/date-range/Shortcuts/Shortcuts';
import moment from 'moment-timezone';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DAY_OF_WEEK_FORMAT } from '@/@core/fields/inputs/DateInput';

const transformValue = (value: DateRange<moment.Moment>): DateRange<string> => [
    value[0]?.format('YYYY-MM-DD') || '',
    value[1]?.format('YYYY-MM-DD') || ''
];

type Props = {
    labelStart: IntlMessageKey;
    labelEnd: IntlMessageKey;
    date: string[];
    field: string;
    filterId: string;
};

/**
 * DateRange with format="MM/DD/YYYY".
 */
export default function DateRangeComponent({
    labelStart,
    labelEnd,
    date,
    field,
    filterId
}: Props) {
    const updateFilters = useAdvancedUpdateFilters({ filter_id: filterId });
    const { t } = useAppTranslation();

    useEffect(
        () =>
            updateFilters({
                [field]: []
            }),
        []
    );

    const handleChange = useCallback(
        (data: DateRange<string>) => {
            const newData = data[0] && data[1] ? [data[0], data[1]] : [];
            updateFilters({
                [field]: newData,
                page   : 0
            });
        },
        [updateFilters, field]
    );

    const shortcuts = () => (
        <Shortcuts
            setIsOpen={() => {}}
            selectedDate={[date[0] ? moment(date[0]) : null, date[1] ? moment(date[1]) : null]}
            onChange={(value) => {
                handleChange(transformValue(value));
            }}
        />
    );

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
                localeText={{
                    start: t(labelStart),
                    end  : t(labelEnd)
                }}
                sx={{
                    width   : '300px',
                    minWidth: '300px'
                }}
                desktopModeMediaQuery="@media (min-width: 900px)"
                dayOfWeekFormatter={(day, date) => moment(date).format(DAY_OF_WEEK_FORMAT)}
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
                value={[date[0] ? moment(date[0]) : null, date[1] ? moment(date[1]) : null]}
                onChange={(value) => {
                    handleChange(transformValue(value));
                }}
                slots={{
                    shortcuts
                }}
            />
        </LocalizationProvider>
    );
}
