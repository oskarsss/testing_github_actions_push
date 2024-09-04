import { Stop } from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-stops/LoadInfoControllerStops';
import { Stack } from '@mui/material';
import LoadInfoControllerStopFirstRow from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-stops/load-info-controller-stop/LoadInfoControllerStopFirstRow';
import LoadInfoControllerStopSecondRow from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-stops/load-info-controller-stop/LoadInfoControllerStopSecondRow';
import StopItemDistance from '@/@core/ui-kits/loads/load-stop/StopItemDistance';

type Props = {
    stop: Stop;
    manifestId: string;
};

export default function LoadInfoControllerStop({
    stop,
    manifestId
}: Props) {
    return (
        <Stack gap="3px">
            <LoadInfoControllerStopFirstRow
                manifestId={manifestId}
                stop={stop}
            />
            <LoadInfoControllerStopSecondRow stop={stop} />
            <StopItemDistance distance={stop.distanceToNextStop} />
        </Stack>
    );
}
