import { Stack } from '@mui/material';
import React, { useMemo } from 'react';
import LoadInfoControllerStopsHeader from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-stops/LoadInfoControllerStopsHeader';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useStableArray } from '@/hooks/useStable';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import LoadInfoControllerStop from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-stops/load-info-controller-stop/LoadInfoControllerStop';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { formatMiles } from '@/utils/formatting';
import moment from 'moment-timezone';

export type Stop = {
    arrivesAt: number;
    duration: number;
    lateness: number;
    earliness: number;
    eta: number;
} & Omit<ManifestsTypes.AnyPreparedStop, 'arrivesAt' | 'eta'>;

type Props = {
    manifestId?: string;
    loadId?: string;
};

export default function LoadInfoControllerStops({
    manifestId = '',
    loadId = ''
}: Props) {
    const { t } = useAppTranslation();
    const { data: manifestData } = ManifestsGrpcService.useRetrieveManifestTruckRouteQuery(
        {
            manifestId
        },
        { skip: !manifestId }
    );

    const { data: loadData } = LoadsGrpcService.useGetLoadTruckRouteQuery(
        {
            loadId
        },
        { skip: !loadId }
    );

    const manifestStops = useStableArray(manifestData?.stops);
    const loadStops = useStableArray(loadData?.stops);

    const stops = useMemo(() => {
        const stops: Stop[] = [];

        manifestStops.forEach((stop) => {
            if (!stop?.stop) return;
            const preparedStops = getPrepareStops([stop.stop]);
            const preparedStop = preparedStops[0];
            stops.push({
                ...preparedStop,
                arrivesAt: stop.arrivesAt,
                duration : stop.duration,
                lateness : stop.lateness,
                earliness: stop.earliness,
                eta      : stop.eta
            });
        });

        loadStops.forEach((stop) => {
            if (!stop?.stop) return;
            const preparedStops = getPrepareStops([stop.stop]);
            const preparedStop = preparedStops[0];
            stops.push({
                ...preparedStop,
                arrivesAt: stop.arrivesAt,
                duration : stop.duration,
                lateness : stop.lateness,
                earliness: stop.earliness,
                eta      : stop.eta
            });
        });
        return stops;
    }, [manifestStops, loadStops]);

    const data = useMemo(() => {
        let totalDistance = 0;
        let estimatedTotalSeconds = 0;
        const loads = new Set<string>();

        stops.forEach((stop, index) => {
            if (stop.loadId) {
                loads.add(stop.loadId);
            }
            if (stop.distanceToNextStop) {
                totalDistance += stop.distanceToNextStop.miles;
            }
            if (stop.duration) {
                estimatedTotalSeconds += stop.duration;
            }
        });

        const duration = moment.duration(estimatedTotalSeconds, 'seconds');
        const months = duration.months() ? `${duration.months()}${t('common:time.short.m')}` : '';
        const days = duration.days() ? `${duration.days()}${t('common:time.short.d')}` : '';
        const hours = duration.hours() ? `${duration.hours()}${t('common:time.short.h')}` : '';

        return {
            totalDistance: totalDistance
                ? `${formatMiles(totalDistance)} ${t('common:mi')}`
                : undefined,
            loadsCount    : loads.size,
            estimatedTotal: estimatedTotalSeconds ? `${months} ${days} ${hours}`.trim() : undefined
        };
    }, [stops, t]);

    if (!stops.length) return null;
    return (
        <Stack
            direction="column"
            mt="12px"
            pt="12px"
            gap="12px"
            borderTop={(theme) => `1px solid ${theme.palette.semantic.border.secondary}`}
        >
            <LoadInfoControllerStopsHeader
                loadsCount={data.loadsCount}
                totalDistance={data.totalDistance}
                estimatedTotal={data.estimatedTotal}
            />
            <Stack gap="3px">
                {stops.map((stop) => (
                    <LoadInfoControllerStop
                        manifestId=""
                        key={stop.stopId}
                        stop={stop}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
