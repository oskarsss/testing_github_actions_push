import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { TestIDs } from '@/configs/tests';
import { TrailerProps } from '@/views/fleet/trailers/Details/types';
import TruckMarkup from '@/views/fleet/drivers/Details/components/Right/components/Truck/TruckMarkup/TruckMarkup';
import { useAssignTruckToTrailerDialog } from '@/@core/components/assign/modals/AssignTruckToTrailer';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useTruckByTrailerId } from '@/store/storage/trucks/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';

export default function Truck({ trailer }: TrailerProps) {
    const trailers = useTrailersMap();
    const hashedTrailer = trailers[trailer.trailerId];
    const assignTruckToTrailerDialog = useAssignTruckToTrailerDialog();
    const confirm = useConfirm();
    const [removeTrailer] = TrucksGrpcService.useRemoveTrailerFromTruckMutation();

    const truck = useTruckByTrailerId(trailer.trailerId || '');
    const isLoading = useAppSelector(TrucksDataSelectors.getIsLoading);

    const removeTruck = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:trailers.unassign.truck.title',
            body              : 'modals:trailers.unassign.truck.body',
            confirm_text      : 'common:button.unassign',
            translationOptions: {
                title: {
                    referenceId: truck?.referenceId || ''
                }
            },
            onConfirm: () => {
                if (!truck) return;

                removeTrailer({
                    truckId  : truck.truckId,
                    trailerId: trailer.trailerId
                }).unwrap();
            }
        });
    };

    const selectTruck = () => {
        assignTruckToTrailerDialog.open({
            trailerId  : hashedTrailer.trailerId,
            referenceId: hashedTrailer.referenceId,
            isDialog   : true
        });
    };

    return (
        <TruckMarkup
            truck_id={truck?.truckId || ''}
            onSelect={selectTruck}
            truck={truck}
            isLoading={isLoading}
            removeTruck={removeTruck}
            testOptions={{
                assignTestId: TestIDs.pages.trailerProfile.buttons.assignTruck,
                removeTestId: TestIDs.pages.trailerProfile.buttons.removeTruck
            }}
        />
    );
}
