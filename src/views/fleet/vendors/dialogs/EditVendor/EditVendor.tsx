import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import VendorsTypes from '@/store/fleet/vendors/types';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';
import { VendorRetrieveReply } from '@proto/vendors';
import EditVendorForm from './EditVendorForm';

export const useEditVendorDialog = hookFabric(EditVendor, FullDialog.Dialog);

type Props = {
    vendor_id: VendorsTypes.VendorRow['vendorId'];
    document_id?: string;
};

function EditVendor({
    vendor_id,
    document_id
}: Props) {
    const dialog = useEditVendorDialog(true);
    const {
        isError,
        isLoading,
        isSuccess,
        refetch,
        vendor
    } =
        VendorsGrpcService.useRetrieveVendorQuery(
            { vendorId: vendor_id },
            {
                refetchOnMountOrArgChange: true,
                selectFromResult         : (result) => ({
                    vendor: result.data?.vendor
                        ? result.data?.vendor
                        : VendorRetrieveReply.create().vendor,
                    ...result
                })
            }
        );

    if (isError) {
        return (
            <FullDialog.FailedFetching
                onRetry={refetch}
                onClose={dialog.close}
            />
        );
    }

    if (isLoading || !isSuccess || !vendor) return <FullDialog.FetchingProcess />;

    return (
        <EditVendorForm
            vendor={vendor}
            refetch={refetch}
            document_id={document_id}
        />
    );
}
