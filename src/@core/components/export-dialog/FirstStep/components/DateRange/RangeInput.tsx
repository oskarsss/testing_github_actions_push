import { FieldError } from 'react-hook-form';
import { PeriodDateType } from '@/@core/ui-kits/basic/date-range/types';
import FormHelperText from '@mui/material/FormHelperText';
import DateRangeInput from '@/@core/ui-kits/basic/date-range/DateRange';
import React from 'react';

export type Props = {
    error?: FieldError;
    start_date: string;
    end_date: string;
    onChangeDateRange: (id: string, start_at: string, end_at: string) => void;
};
const RangeInput = ({
    onChangeDateRange,
    start_date,
    end_date,
    error
}: Props) => {
    const change = (data: PeriodDateType) => {
        if (data.start_date && data.end_date) {
            onChangeDateRange('custom', data.start_date, data.end_date);
        }
    };

    return (
        <>
            <DateRangeInput
                onChange={change}
                width={250}
                date={{
                    start_date,
                    end_date
                }}
            />
            {error && (
                <FormHelperText sx={{ color: 'error.main' }}>
                    <span>{error.message}</span>
                </FormHelperText>
            )}
        </>
    );
};

export default RangeInput;
