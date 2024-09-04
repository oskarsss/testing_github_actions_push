import { IconButtonOnline } from '@/views/dispatch/scheduling/components/Table/components/truck/location/styled';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Tooltip from '@mui/material/Tooltip';
import Scheduling from '@/store/dispatch/scheduling/types';
import trucksAvailabilityService from '@/@grpcServices/services/trucks-availability.service';
import { debounce } from 'lodash';
import { useAppDispatch } from '@/store/hooks';
import { SchedulingActions } from '@/store/dispatch/scheduling/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    truck_online: Scheduling.TruckManifestRow['online'];
    truck_id: Scheduling.TruckManifestRow['truckId'];
    scrollTo?: () => void;
};

export default function TruckOnlineButton({
    truck_online,
    truck_id,
    scrollTo
}: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const [setTruckOnline, { isLoading: loadingOnline }] =
        trucksAvailabilityService.useTruckAvailabilitySetOnlineMutation();
    const [setTruckOffline, { isLoading: loadingOffline }] =
        trucksAvailabilityService.useTruckAvailabilitySetOfflineMutation();

    const onChangeTruckOnline = () => {
        if (truck_online) {
            setTruckOffline({
                truckId: truck_id
            })
                .unwrap()
                .then(() => {
                    dispatch(SchedulingActions.setTruckOnline({ truck_id, online: false }));
                });
        } else {
            setTruckOnline({
                truckId: truck_id
            })
                .unwrap()
                .then(() => {
                    dispatch(SchedulingActions.setTruckOnline({ truck_id, online: true }));
                    if (scrollTo) {
                        debounce(scrollTo, 200)();
                    }
                });
        }
    };

    return (
        <Tooltip
            title={
                truck_online
                    ? t('common:tooltips.change_to_offline')
                    : t('common:tooltips.change_to_online')
            }
        >
            <IconButtonOnline
                disabled={loadingOnline || loadingOffline}
                active={truck_online}
                size="small"
                aria-label="online"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    onChangeTruckOnline();
                }}
            >
                <RecordVoiceOverIcon />
            </IconButtonOnline>
        </Tooltip>
    );
}
