import { IconButtonStyled } from '@/views/dispatch/scheduling/components/Table/components/truck/location/styled';
import PushPinIcon from '@mui/icons-material/PushPin';
import Tooltip from '@mui/material/Tooltip';
import { useLocalStorage } from 'usehooks-ts';
import { PIN_TRUCKS_STORAGE_KEY } from '@/store/dispatch/scheduling/hooks';
import Scheduling from '@/store/dispatch/scheduling/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    truck_id: Scheduling.TruckManifestRow['truckId'];
    scrollTop: () => void;
};

export default function PinTruckButton({
    truck_id,
    scrollTop
}: Props) {
    const { t } = useAppTranslation();
    const [pinTrucks, setValue] = useLocalStorage<string[]>(PIN_TRUCKS_STORAGE_KEY, []);

    const handlePin = (trackId: string) => {
        let newPinTrucks: string[] = [];
        if (pinTrucks) {
            if (pinTrucks.includes(trackId)) {
                newPinTrucks = pinTrucks.filter((id: string) => id !== trackId);
            } else {
                newPinTrucks = [...pinTrucks, trackId];
                setTimeout(scrollTop, 100);
            }
        } else {
            newPinTrucks.push(trackId);
        }
        setValue(newPinTrucks);
    };
    return (
        <Tooltip
            title={
                pinTrucks.includes(truck_id)
                    ? t('schedule:table.truck.location.tooltips.unpin_the_track')
                    : t('schedule:table.truck.location.tooltips.pin_the_track')
            }
        >
            <IconButtonStyled
                active={pinTrucks.includes(truck_id)}
                size="small"
                aria-label="pin"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    handlePin(truck_id);
                }}
            >
                <PushPinIcon />
            </IconButtonStyled>
        </Tooltip>
    );
}
