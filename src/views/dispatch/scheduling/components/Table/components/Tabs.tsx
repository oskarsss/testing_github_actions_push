import moment from 'moment-timezone';
import { styled } from '@mui/material/styles';
import { useAccountCompanies } from '@/store/app/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { SchedulingActions } from '@/store/dispatch/scheduling/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useUpdateSchedulingSearchParams } from '../../Header/Filters/RangeDatePicker';

type ButtonStyledProps = {
    isActive: boolean;
};

type search_options = {
    period_id: string;
    periodDays: number;
    from_date?: moment.Moment;
    end_date?: moment.Moment;
};

const Button = styled('button')<ButtonStyledProps>(({
    theme,
    isActive
}) => ({
    width        : 'calc(100% / 3)',
    fontWeight   : isActive ? 600 : 400,
    fontSize     : '16px',
    lineHeight   : '175%',
    textAlign    : 'center',
    letterSpacing: '0.15px',
    color        : isActive
        ? theme.palette.semantic.text.brand.primary
        : theme.palette.semantic.text.secondary,
    backgroundColor: theme.palette.semantic.background.white,
    border         : 'none',
    borderBottom   : '3px solid',
    borderColor    : isActive
        ? theme.palette.semantic.foreground.brand.primary
        : theme.palette.semantic.border.secondary,
    cursor: 'pointer'
}));

const Container = styled('div')(() => ({
    minWidth    : '100%',
    display     : 'flex',
    height      : '56px',
    borderBottom: 'none'
}));

const Tabs = () => {
    const { t } = useAppTranslation('schedule');
    const dispatch = useAppDispatch();
    const { timezone } = useAccountCompanies();
    const { period_id } = useAppSelector((state) => state.scheduling.search_options);

    const updateSearchOptions = useUpdateSchedulingSearchParams();

    const handleChange = (value: string) => {
        const today = moment().tz(timezone);
        const search_options: search_options = {
            period_id : value,
            periodDays: 7
        };
        switch (value) {
        case 'last_week':
            search_options.from_date = today.clone().startOf('week').subtract(1, 'week');
            search_options.end_date = today.clone().endOf('week').subtract(1, 'week');
            break;
        case 'now':
            search_options.from_date = today.clone().subtract(1, 'day');
            search_options.end_date = today.clone().add(5, 'days');
            break;
        case 'next_week':
            search_options.from_date = today.clone().startOf('week').add(1, 'week');
            search_options.end_date = today.clone().endOf('week').add(1, 'week');
            break;
        default:
            break;
        }

        // dispatch(
        //     SchedulingActions.UpdateSearchOptions({
        //         ...search_options,
        //         from_date: search_options.from_date?.format('YYYY-MM-DD'),
        //         end_date : search_options.end_date?.format('YYYY-MM-DD')
        //     })
        // );
        updateSearchOptions({
            ...search_options,
            from_date: search_options.from_date?.format('YYYY-MM-DD'),
            end_date : search_options.end_date?.format('YYYY-MM-DD')
        });
    };

    return (
        <Container>
            <Button
                isActive={period_id === 'last_week'}
                onClick={() => handleChange('last_week')}
                type="button"
            >
                {t('table.header.tabs.las_week')}
            </Button>
            <Button
                isActive={period_id === 'now'}
                onClick={() => handleChange('now')}
                type="button"
            >
                {t('table.header.tabs.now')}
            </Button>
            <Button
                isActive={period_id === 'next_week'}
                onClick={() => handleChange('next_week')}
                type="button"
            >
                {t('table.header.tabs.next_week')}
            </Button>
        </Container>
    );
};

export default Tabs;
