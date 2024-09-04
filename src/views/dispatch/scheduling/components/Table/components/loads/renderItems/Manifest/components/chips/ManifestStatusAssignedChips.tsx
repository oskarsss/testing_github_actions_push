import VectorIcons from '@/@core/icons/vector_icons';
import { formatMiles, formatMinutes } from '@/utils/formatting';
import React from 'react';
import moment from 'moment-timezone';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Badge from '@/@core/ui-kits/basic/badge/Badge';

type Props = {
    totalMiles: number;
    appointmentAt: string;
};

export default function ManifestStatusAssignedChips({
    totalMiles,
    appointmentAt
}: Props) {
    const { t } = useAppTranslation();
    const diff = moment(appointmentAt).diff(moment(), 'minutes');
    const date_is_until = moment(appointmentAt).isBefore(moment());
    const time = date_is_until ? moment(appointmentAt).format('MMM DD') : formatMinutes(diff, t);

    return (
        <>
            <Badge
                variant="filled"
                utilityColor="warning"
                size="small"
                icon={<VectorIcons.LoadIcons.CircleClock />}
                text={time || '-'}
            />

            <Badge
                variant="filled"
                utilityColor="warning"
                size="small"
                icon={<VectorIcons.NavIcons.TruckingIcon sx={{ fill: 'currentColor' }} />}
                text={`${formatMiles(totalMiles)}${t('common:mi')}`}
            />
        </>
    );
}
