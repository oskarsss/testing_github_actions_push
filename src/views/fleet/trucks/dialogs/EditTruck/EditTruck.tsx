import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useTruckById } from '@/store/storage/trucks/hooks/common';
import EditTruckForm from './EditTruckForm';

type Props = {
    truck_id: string;
    document_id?: string;
};

export const useEditTruckDialog = hookFabric(EditTruck, FullDialog.Dialog);

export default function EditTruck({
    truck_id,
    document_id
}: Props) {
    const truck = useTruckById(truck_id);

    if (!truck) return null;

    return (
        <EditTruckForm
            document_id={document_id}
            truck={truck}
        />
    );
}
