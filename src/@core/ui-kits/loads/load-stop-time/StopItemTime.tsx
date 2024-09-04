import { checkOnTime, isBadGpc } from '@/@core/ui-kits/loads/load-stop-time/utils';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import CheckInOut, { OnClick } from '@/@core/ui-kits/loads/load-stop-time/CheckInOut';
import React from 'react';
import StopArrivesTime from '@/@core/ui-kits/loads/load-stop-time/StopArrivesTime';
import StopETA from '@/@core/ui-kits/loads/load-stop-time/StopETA';
import StopETALateEarly from '@/@core/ui-kits/loads/load-stop-time/StopETALateEarly';
import { checkHideButtonCheckIn } from '@/views/dispatch/manifests/main/info-panel/stops/utils';
import { useCheckInOutMenu } from '@/@core/ui-kits/loads/load-stop-time/menu/CheckInOut';
import LoadStopsGrpcService from '@/@grpcServices/services/loads-service/load-stops.service';
import ManifestStopsGrpcService from '@/@grpcServices/services/manifests-service/manifest-stops.service';
import StopItemNoTruck from '@/@core/ui-kits/loads/load-stop-time/StopItemNoTruck';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
    driverId: string;
    truckId: string;
    manifestId: string;
};

function StopItemTime({
    stop,
    driverId,
    truckId,
    manifestId
}: Props) {
    const checkInOutMenu = useCheckInOutMenu();
    const on_time = checkOnTime(stop);
    const location = useLocationFleet(driverId, truckId || '');
    const [updateStopTrigger] = LoadStopsGrpcService.useUpdateStopMutation();
    const [updateManifestStopTrigger] = ManifestStopsGrpcService.useUpdateManifestStopMutation();

    const onClickCheckInTime: OnClick = (event, type, defaultTime) => {
        event.preventDefault();
        event.stopPropagation();

        checkInOutMenu.open({
            type,
            stop,
            default_time: defaultTime,

            // TODO: FIXME: ViAMUR - take out to a separate function
            updateStop: async (type, time) => {
                if (stop.originType === ManifestsTypes.OriginType.LOAD) {
                    return updateStopTrigger({
                        loadId            : stop.loadId,
                        stopId            : stop.stopId,
                        referenceId       : stop.referenceId,
                        sequence          : stop.sequence,
                        note              : stop.note,
                        appointmentStartAt: stop.appointmentStartAtLocal,
                        type              : stop.loadStopType,
                        checkedOutAt      : stop.checkedOutAt,
                        checkedInAt       : stop.checkedInAt,
                        arrivedAt         : stop.arrivedAt,
                        appointmentEndAt  : stop.appointmentEndAtLocal,
                        location          : stop.location,
                        manifestId,
                        ...{ [type]: time }
                    }).unwrap();
                }
                return updateManifestStopTrigger({
                    loadId            : stop.loadId,
                    manifestId,
                    manifestStopId    : stop.stopId,
                    note              : stop.note,
                    appointmentStartAt: stop.appointmentStartAtLocal,
                    appointmentEndAt  : stop.appointmentEndAtLocal,
                    checkedInAt       : stop.checkedInAt,
                    checkedOutAt      : stop.checkedOutAt,
                    type              : stop.manifestStopType,
                    referenceId       : stop.referenceId,
                    location          : stop.location,
                    arrivedAt         : stop.arrivedAt,
                    departedAt        : stop.departedAt,
                    ...{ [type]: time }
                }).unwrap();
            }
        })(event as React.MouseEvent<HTMLDivElement>);
    };

    if (!truckId) {
        return <StopItemNoTruck appointmentStartAt={stop.appointmentStartAtLocal} />;
    }

    if (isBadGpc(location)) {
        return (
            <>
                <CheckInOut
                    stop={stop}
                    default_time={stop.appointmentStartAtLocal}
                    type="arrivedAt"
                    on_time={on_time}
                    onClick={onClickCheckInTime}
                />
                <StopsComponents.StopItemTimeDivider />
                <CheckInOut
                    stop={stop}
                    default_time={stop.arrivedAt || stop.appointmentStartAtLocal}
                    type="checkedInAt"
                    on_time={on_time}
                    onClick={onClickCheckInTime}
                />
                <StopsComponents.StopItemTimeDivider />
                <CheckInOut
                    on_time
                    stop={stop}
                    default_time={stop.appointmentStartAtLocal}
                    type="checkedOutAt"
                    onClick={onClickCheckInTime}
                />
            </>
        );
    }

    const checkHideButton = checkHideButtonCheckIn(stop);

    return (
        <>
            {checkHideButton.noCompleted && (
                <>
                    <StopArrivesTime
                        stop_id={stop.stopId}
                        truck_id={truckId}
                    />
                    <StopETA
                        stop_id={stop.stopId}
                        truck_id={truckId}
                    />
                    <StopETALateEarly
                        stop_id={stop.stopId}
                        truck_id={truckId}
                    />
                </>
            )}
            <CheckInOut
                stop={stop}
                default_time={stop.appointmentStartAtLocal}
                type="arrivedAt"
                on_time={on_time}
                onClick={onClickCheckInTime}
                hide={checkHideButton.arrivedAt}
            />
            {checkHideButton.arrivedAt && <StopsComponents.StopItemTimeDivider />}
            <CheckInOut
                stop={stop}
                default_time={stop.arrivedAt || stop.appointmentStartAtLocal}
                type="checkedInAt"
                on_time={on_time}
                onClick={onClickCheckInTime}
                hide={checkHideButton.checkedInAt}
            />
            {!checkHideButton.checkedInAt && <StopsComponents.StopItemTimeDivider />}
            <CheckInOut
                stop={stop}
                default_time={stop.appointmentStartAtLocal}
                type="checkedOutAt"
                on_time
                onClick={onClickCheckInTime}
                hide={checkHideButton.checkedOutAt}
            />
        </>
    );
}

export default React.memo(StopItemTime);
