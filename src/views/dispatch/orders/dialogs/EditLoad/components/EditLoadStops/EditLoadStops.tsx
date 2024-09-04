import { usePermissions } from '@/store/app/hooks';
import CustomEditLoadHeader from '@/views/dispatch/orders/dialogs/EditLoad/components/reusable_components/CustomEditLoadHeader';
import VectorIcons from '@/@core/icons/vector_icons';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { useAddLoadStopDialog } from '@/views/dispatch/manifests/modals/load-stop/AddLoadStop';
import { useEditLoadStopDialog } from '@/views/dispatch/manifests/modals/load-stop/EditLoadStop';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { useMemo } from 'react';
import { LoadData_Load } from '@proto/loads';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import columns from './columns';
import MilesInput from './MilesInput';
import { useOverrideEmptyMilesDialog } from './dialogs/OverrideEmptyMiles';
import { useOverrideLoadedMilesDialog } from './dialogs/OverrideLoadedMiles';

type Props = {
    load: LoadData_Load;
    invalidateSettlement: () => void;
};

export default function EditLoadStops({
    load,
    invalidateSettlement
}: Props) {
    const editLoadStopMenu = useEditLoadStopDialog();
    const addLoadStopMenu = useAddLoadStopDialog();

    const { hasPermission } = usePermissions();
    const overrideEmptyMilesDialog = useOverrideEmptyMilesDialog();
    const overrideLoadedMilesDialog = useOverrideLoadedMilesDialog();
    const canEditLoadDistance = hasPermission(PERMISSIONS.EDIT_LOAD_DISTANCE);

    const { truckId } = useOrderActiveManifest(load);

    const overrideEmptyMiles = () => {
        if (!canEditLoadDistance) {
            return;
        }

        overrideEmptyMilesDialog.open({
            defaultValue: load.emptyMiles,
            loadId      : load.loadId
        });
    };

    const overrideLoadedMiles = () => {
        if (!canEditLoadDistance) {
            return;
        }

        overrideLoadedMilesDialog.open({
            defaultValue: load.loadedMiles,
            loadId      : load.loadId
        });
    };

    const editStop: MiniTableExecuteActionType<ManifestModel_Stop> = (name, { row }) => {
        editLoadStopMenu.open({
            manifestId: load.activeManifestId,
            stop      : {
                ...row,
                loadId: load.loadId,
                stopId: row.loadStopId || row.manifestStopId
            }
        });
    };

    const add = () => {
        const loadStops = load.manifests.flatMap(
            (manifest) => manifest.stops.filter((stop) => stop.loadId === load.loadId) || []
        );

        addLoadStopMenu.open({
            loadId    : load.loadId,
            sequence  : loadStops.length + 1,
            truckId,
            manifestId: load.activeManifestId,
            invalidateSettlement
        });
    };

    const stops: ManifestModel_Stop[] = useMemo(() => {
        if (!load?.loadId) return [];
        return load.manifests.reduce((acc, manifest) => {
            manifest.stops.forEach((stop) => {
                if (stop.loadId === load.loadId) {
                    acc.push(stop);
                }
            });
            return acc;
        }, [] as ManifestModel_Stop[]);
    }, [load?.manifests, load?.loadId]);

    return (
        <>
            <CustomEditLoadHeader
                icon={<VectorIcons.FullDialogIcons.Route />}
                title="modals:loads.edit_load.stops.title"
                add={add}
                button_text="modals:loads.edit_load.stops.buttons.add_stop"
            >
                <MilesInput
                    onClick={overrideEmptyMiles}
                    label="modals:loads.edit_load.stops.labels.empty_miles_short"
                    disabled={!canEditLoadDistance}
                    value={load.emptyMiles}
                />
                <MilesInput
                    label="modals:loads.edit_load.stops.labels.loaded_miles_short"
                    onClick={overrideLoadedMiles}
                    disabled={!canEditLoadDistance}
                    value={load.loadedMiles}
                />
            </CustomEditLoadHeader>
            <MiniTable
                turnOffBorder
                fontSize="large"
                rows={stops}
                elementKey="loadStopId"
                columns={columns}
                executeAction={editStop}
            />
        </>
    );
}
