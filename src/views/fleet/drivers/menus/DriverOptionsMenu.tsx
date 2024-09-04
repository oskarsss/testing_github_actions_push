import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import { useRouter } from 'next/router';
import { useDownloadDocumentByEntityDialog } from '@/@core/components/documents/dialogs/DownloadDocuments/DownloadDocumentByEntity';
import DangerousIcon from '@mui/icons-material/Dangerous';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useConfirm } from '@/@core/components/confirm-dialog';
import navigateToPage from '@/utils/navigateToPage';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';

type Props = {
    driver_id: string;
    truck_id?: string;
};

export const useDriverOptionsMenu = menuHookFabric(DriverOptionsMenu);

export default function DriverOptionsMenu({
    driver_id,
    truck_id
}: Props) {
    const router = useRouter();
    const confirm = useConfirm();
    const [removeDriverFromTruck, { isLoading }] =
        TrucksGrpcService.useRemoveDriverFromTruckMutation();
    const [deleteDriver] = DriversGrpcService.useDeleteDriverMutation();

    const driverOptionsMenu = useDriverOptionsMenu(true);
    const editDriverDialog = useEditDriverDialog();
    const downloadDocumentDialog = useDownloadDocumentByEntityDialog();

    const remove = () => {
        confirm({
            icon            : <DangerousIcon color="secondary" />,
            title           : 'modals:drivers.delete.title',
            body            : 'modals:drivers.delete.body',
            confirm_text    : 'common:button.delete',
            max_width_dialog: '600px',
            onConfirm       : () =>
                deleteDriver({ driverId: driver_id }).unwrap().then(driverOptionsMenu.close)
        });
    };

    const edit = () => {
        driverOptionsMenu.close();
        editDriverDialog.open({
            driver_id
        });
    };

    const unasign = () => {
        if (truck_id) {
            removeDriverFromTruck({
                truckId : truck_id,
                driverId: driver_id
            }).unwrap();
            driverOptionsMenu.close();
        }
    };

    const downloadDocs = () => {
        downloadDocumentDialog.open({
            entity_id     : driver_id,
            entity_type   : DocumentModel_DocumentEntityType.DRIVER,
            openEditDialog: () => {
                editDriverDialog.open({
                    driver_id
                });
            }
        });
        driverOptionsMenu.close();
    };

    const handleView = () => {
        navigateToPage(`/drivers/${driver_id}`);

        driverOptionsMenu.close();
    };

    return (
        <MenuComponents.List>
            <MenuComponents.Item
                text="common:button.edit"
                onClick={edit}
                Icon={<EditIcon fontSize="small" />}
            />
            <MenuComponents.Item
                Icon={<VisibilityIcon fontSize="small" />}
                text="common:button.details"
                onClick={handleView}
            />
            <MenuComponents.Item
                text="common:button.download_docs"
                onClick={downloadDocs}
                Icon={<DownloadIcon fontSize="small" />}
            />
            <MenuComponents.DangerItem
                text={
                    router.pathname === '/drivers'
                        ? 'common:button.delete'
                        : 'common:button.unassign'
                }
                onClick={router.pathname === '/drivers' ? remove : unasign}
                disabled={isLoading}
                Icon={<DeleteIcon fontSize="small" />}
            />
        </MenuComponents.List>
    );
}
