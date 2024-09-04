import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import ServiceLogDetails from '../../details';

type Props = {
    serviceLogId: string;
};

export const useEditServiceLogDialog = hookFabric(EditServiceLog, FullDialog.Dialog);

function EditServiceLog({ serviceLogId }: Props) {
    const dialog = useEditServiceLogDialog(true);

    return (
        <ServiceLogDetails
            serviceLogId={serviceLogId}
            onClose={dialog.close}
        />
    );
}
