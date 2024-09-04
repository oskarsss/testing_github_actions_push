import React from 'react';
import moment from 'moment-timezone';
import { OrdersTableTextCell } from '@/@core/ui-kits/loads/table';

type Props = {
    city: string;
    state: string;
    time: string;
};

const calendarStrings = {
    lastDay : 'M/D HH:mm',
    sameDay : 'HH:mm',
    nextDay : 'M/D HH:mm',
    lastWeek: 'M/D HH:mm',
    nextWeek: 'M/D HH:mm',
    sameElse: 'M/D HH:mm'
};

export function OrdersTableStopCell({
    city,
    state,
    time
}: Props) {
    return (
        <OrdersTableTextCell
            title={`${city.substring(0, 14) || '-'} ${state || '-'}`.substring(0, 20)}
            description={time ? moment(time).calendar(null, calendarStrings) : '-'}
            descriptionSize="medium"
        />
    );
}
