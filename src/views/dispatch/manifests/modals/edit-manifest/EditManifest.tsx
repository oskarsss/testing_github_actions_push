import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import SafetyManifestDetails from '@/views/dispatch/manifests/details';

export const useEditManifestDialog = hookFabric(EditManifest, (props) => (
    <FullDialog.Dialog
        {...props}
        paperStyles={{ width: '100%' }}
    />
));

type Props = {
    manifestId: string;
};

function EditManifest({ manifestId }: Props) {
    const dialog = useEditManifestDialog();
    return (
        <SafetyManifestDetails
            manifestId={manifestId}
            onCloseDialog={dialog.close}
        />
    );
}
