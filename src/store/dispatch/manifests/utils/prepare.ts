import { isCompletedLoadStop, isCompletedManifestStop } from '@/utils/load-stops';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import moment from 'moment-timezone';
import { PreparedMapStop } from '@/views/dispatch/manifests/map/utils';
import ManifestsTypes from '../types';

export const prepareManifestModelMapStops = (stops: ManifestModel_Stop[]) =>
    stops.map(
        (stop): PreparedMapStop => ({
            address           : stop.location?.address || '',
            appointmentStartAt: stop.appointmentStartAtLocal,
            arrivesAt         : 0,
            arrivesAtDate     : '',
            city              : stop.location?.city || '',
            earliness         : 0,
            eta               : 0,
            isCompleted:
                isCompletedLoadStop(stop.loadStopStatus) ||
                isCompletedManifestStop(stop.manifestStopStatus),
            lateness         : 0,
            loadId           : stop.loadId,
            // eslint-disable-next-line max-len
            lonLat           : stop.location ? [stop.location.lon || 0, stop.location.lat] : null,
            arrivesAtTime    : '',
            markerDisplayTime: {
                month: moment(stop.appointmentStartAtLocal).format('MMM'),
                day  : moment(stop.appointmentStartAtLocal).format('D'),
                time : moment(stop.appointmentStartAtLocal).format('H:mm')
            },
            originType: stop.loadStopId
                ? ManifestsTypes.OriginType.LOAD
                : ManifestsTypes.OriginType.MANIFEST,
            stopId            : stop.loadStopId || stop.manifestStopId,
            polylineToNextStop: '',
            sequence          : stop.sequence,
            state             : stop.location?.state || '',
            status            : stop.loadStopStatus || stop.manifestStopStatus,
            type              : stop.manifestStopType || stop.loadStopType,
            arrivedAt         : ''
        })
    );
