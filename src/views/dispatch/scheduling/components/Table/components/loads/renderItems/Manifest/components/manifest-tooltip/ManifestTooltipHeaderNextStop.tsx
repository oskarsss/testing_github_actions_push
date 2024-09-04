/* eslint-disable max-len */

import Badge from '@/@core/ui-kits/basic/badge/Badge';
import VectorIcons from '@/@core/icons/vector_icons';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { formatMinutes } from '@/utils/formatting';
import { useMemo } from 'react';

type Props = {
    nextStop: ManifestsTypes.AnyPreparedStop;
    truckId: string;
};

export default function ManifestTooltipHeaderNextStop({
    nextStop,
    truckId
}: Props) {
    const truck_route = useManifestTruckRoute(truckId);
    const { t } = useAppTranslation();
    const load_next_eta = truck_route?.find((s) => s.localeStopId === nextStop.stopId);
    const time = useMemo(() => {
        if (!load_next_eta) return undefined;
        const isLate = load_next_eta?.lateness > 0 || load_next_eta?.earliness === 0;
        const isEarly = load_next_eta?.earliness > 0;
        if (!isLate && !isEarly) return undefined;

        const time = isLate ? load_next_eta.lateness : load_next_eta.earliness;
        const format_time = formatMinutes(time, t);

        const isCorrectTime = format_time && format_time !== t('common:not_provided');
        if (!isCorrectTime) return undefined;

        return {
            format_time,
            color: isLate ? ('error' as const) : ('success' as const)
        };
    }, [load_next_eta, t]);
    return (
        <>
            {nextStop.location && (
                <Badge
                    variant="outlined"
                    size="small"
                    text={`${nextStop.location.city || '-'}, ${nextStop.location.state || '-'}`}
                />
            )}
            {load_next_eta && (
                <>
                    <Badge
                        variant="filled"
                        size="small"
                        text={formatMinutes(load_next_eta.eta, t)}
                        backgroundColor={(theme) => theme.palette.semantic.background.secondary}
                        textColor={(theme) => theme.palette.semantic.text.primary}
                        iconColor={(theme) => theme.palette.semantic.foreground.primary}
                        icon={<VectorIcons.LocationIcon />}
                    />
                    {time && (
                        <Badge
                            variant="filled"
                            size="small"
                            text={time.format_time}
                            utilityColor={time.color}
                            backgroundColor={({ palette }) =>
                                palette.utility.foreground[time.color].tertiary}
                            icon={<VectorIcons.RushingTimeIcon />}
                        />
                    )}
                </>
            )}
        </>
    );
}
