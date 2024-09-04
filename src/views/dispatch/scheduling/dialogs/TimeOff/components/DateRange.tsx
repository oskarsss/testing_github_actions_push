import { Control, useController } from 'react-hook-form';
import DateRange from '@/@core/ui-kits/basic/date-range/DateRange';
import { PeriodDateType } from '@/@core/ui-kits/basic/date-range/types';

import { DefaultValues } from '@/views/dispatch/scheduling/dialogs/TimeOff/components/defaultValues';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    control: Control<DefaultValues>;
};

const SchedulingDateRangeField = ({ control }: Props) => {
    const { t } = useAppTranslation();
    const {
        fieldState: { error },
        field: {
            onChange: changeStartAt,
            value: start_date
        }
    } = useController({
        name: 'start_at',
        control
    });

    const {
        field: {
            onChange: changeEndAt,
            value: end_date
        }
    } = useController({
        name: 'end_at',
        control
    });

    const onChangeDateRange = (period_options: PeriodDateType) => {
        changeStartAt(period_options.start_date);
        changeEndAt(period_options.end_date);
    };

    return (
        <>
            <DateRange
                required
                label="schedule:dialogs.time_off.fields.date_range.label"
                width="100%"
                variant="filled"
                size="medium"
                onChange={onChangeDateRange}
                date={{ start_date, end_date }}
            />
            {error && (
                <FormHelperText sx={{ color: 'error.main', ml: 4 }}>
                    {t('schedule:dialogs.time_off.fields.date_range.error')}
                </FormHelperText>
            )}
        </>
    );
};

export default SchedulingDateRangeField;
