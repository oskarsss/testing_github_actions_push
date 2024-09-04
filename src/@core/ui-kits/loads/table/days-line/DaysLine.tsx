import { Collapse, Stack, styled, Typography } from '@mui/material';
import moment from 'moment-timezone';
import React, { memo } from 'react';
import { useAppSelector } from '@/store/hooks';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { TFunction } from '@/@types/next-intl';
import { CompactedDaysLine } from './CompactedDaysLine';
import { WideDaysLine } from './WideDaysLine';

function formatDate(date: string | undefined, t: TFunction) {
    if (!date) return { primary: '', secondary: '' };
    const inputDate = moment(date);
    const today = moment();
    const tomorrow = moment().add(1, 'days');
    const yesterday = moment().subtract(1, 'days');

    let secondaryDate = inputDate.format('ddd, MMM D');
    let primaryDate;

    if (inputDate.isSame(today, 'day')) {
        primaryDate = t('common:days.today');
    } else if (inputDate.isSame(yesterday, 'day')) {
        primaryDate = t('common:days.yesterday');
    } else if (inputDate.isSame(tomorrow, 'day')) {
        primaryDate = t('common:days.tomorrow');
    } else {
        primaryDate = inputDate.format('MMM D');
        secondaryDate = inputDate.format('ddd');
    }

    return { primary: primaryDate, secondary: secondaryDate };
}

export const AppointmentDateBox = styled('div')(({ theme }) => ({
    position       : 'relative',
    width          : '100%',
    height         : '1px',
    zIndex         : 1,
    backgroundColor: theme.palette.utility.foreground.blue_dark.primary
}));

export const AppointmentDateBadge = styled('div')(({ theme }) => ({
    position    : 'absolute',
    zIndex      : 1,
    left        : 0,
    top         : 0,
    fontSize    : '10px',
    maxHeight   : '15px',
    borderRadius: '0 2px 2px 0',
    padding     : '0 2px',
    color       : theme.palette.utility.foreground.blue_dark.tertiary,
    fontWeight  : 700,
    background  : theme.palette.utility.foreground.blue_dark.primary
}));

type Props = {
    appointmentStartAt?: string;
    isFirstOfPeriod?: boolean;
    type: 'loads' | 'tracking' | 'manifests';
    countItems?: number;
};

export const OrdersTableDaysLine = memo(
    ({
        appointmentStartAt,
        isFirstOfPeriod,
        type,
        countItems
    }: Props) => {
        const { t } = useAppTranslation();
        const showDaysLines = useAppSelector((state) => state[type]?.settings.showDaysLines);
        const daysLinesType = useAppSelector((state) => state[type]?.settings.daysLinesType);

        const date = formatDate(appointmentStartAt, t);
        const isToday = moment(appointmentStartAt).isSame(moment(), 'day');

        const show = !!appointmentStartAt && isFirstOfPeriod && showDaysLines;
        return (
            <>
                <WideDaysLine
                    collapseIn={Boolean(show && daysLinesType === 'wide')}
                    primaryDate={date.primary}
                    secondaryDate={date.secondary}
                    text={type === 'manifests' ? t('entity:manifests') : t('entity:orders')}
                    countItems={countItems}
                    isToday={isToday}
                />
                {show && daysLinesType === 'compacted' && <CompactedDaysLine date={date.primary} />}
            </>
        );
    }
);
