import VectorIcons from '@/@core/icons/vector_icons';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import type { MouseEvent } from 'react';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import { useReAssignTruckToManifestMenu } from '@/@core/components/assign/modals/ReAssignTruckToManifest';
import { useTruckById } from '@/store/storage/trucks/hooks/common';
import { LoadData_Load } from '@proto/loads';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import CustomEditLoadHeader from '../reusable_components/CustomEditLoadHeader';
import UnassignTruckButton from './components/UnassignTruckButton/UnassignTruckButton';
import columns from './columns';
import ChangeTruckButton from './components/ChangeTruckButton/ChangeTruckButton';

type EditLoadTruckItemsProps = {
    load: LoadData_Load;
};

export default function EditLoadTruckItems({ load }: EditLoadTruckItemsProps) {
    const assign = useAssignTruckToManifestMenu();
    const reAssign = useReAssignTruckToManifestMenu();
    const {
        truckId,
        manifest
    } = useOrderActiveManifest(load);
    const truck = useTruckById(truckId);

    const handleAssignTruck = (event: MouseEvent<HTMLButtonElement>) => {
        const activeManifest = load.manifests.find(
            (manifest) => manifest.manifestId === load.activeManifestId
        );
        assign.open({
            stops                   : activeManifest?.stops || [],
            manifestId              : load.activeManifestId,
            manifestFriendlyId      : manifest?.friendlyId || '',
            alertAssignTruckFromLoad: true,
            loadId                  : load.loadId
        })(event);
    };

    const handleReAssignTruck = (event: MouseEvent<HTMLButtonElement>) => {
        reAssign.open({
            manifestId              : load.activeManifestId,
            manifestFriendlyId      : manifest?.friendlyId || '',
            selectedTruckId         : truck?.truckId || '',
            alertAssignTruckFromLoad: true,
            loadId                  : load.loadId
        })(event);
    };

    return (
        <>
            <CustomEditLoadHeader
                icon={<VectorIcons.FullDialogIcons.Truck />}
                title="entity:truck"
                {...(!truck && { add: handleAssignTruck })}
                button_text="common:actions.assign_truck"
            >
                {truck && (
                    <>
                        <ChangeTruckButton onClick={handleReAssignTruck} />

                        <UnassignTruckButton
                            loadId={load.loadId}
                            manifestId={load.activeManifestId}
                            truckReferenceId={truck.referenceId || ''}
                        />
                    </>
                )}
            </CustomEditLoadHeader>

            <MiniTable
                executeAction={() => {}}
                rows={truck ? [truck] : []}
                columns={columns}
                elementKey="referenceId"
                fontSize="large"
                turnOffBorder
            />
        </>
    );
}
