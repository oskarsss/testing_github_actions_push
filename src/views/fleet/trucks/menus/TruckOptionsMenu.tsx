import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import { useDownloadDocumentByEntityDialog } from '@/@core/components/documents/dialogs/DownloadDocuments/DownloadDocumentByEntity';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import navigateToPage from '@/utils/navigateToPage';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import type { MouseEvent } from 'react';
import useCopyToClipboard from '../../../../utils/copy-to-clipboard';

type Props = {
    copy_value: string;
    truck_id: string;
    driver_id?: string;
    trailerId?: string;
};

export const useTruckOptionsMenu = menuHookFabric(TruckOptionsMenu);

export default function TruckOptionsMenu({
    copy_value,
    truck_id,
    driver_id,
    trailerId = ''
}: Props) {
    const { t } = useAppTranslation();
    const editTruckDialog = useEditTruckDialog();
    const downloadDocumentDialog = useDownloadDocumentByEntityDialog();
    const truckOptionsMenu = useTruckOptionsMenu(true);
    const router = useRouter();

    const [removeTrailerFromTruck] = TrucksGrpcService.useRemoveTrailerFromTruckMutation();
    const [removeDriverFromTruck] = TrucksGrpcService.useRemoveDriverFromTruckMutation();
    const confirm = useConfirm();
    const copy = useCopyToClipboard();
    const [deleteTruck] = TrucksGrpcService.useDeleteTruckMutation();

    const remove = () => {
        confirm({
            icon            : <DangerousIcon color="secondary" />,
            title           : 'modals:trucks.delete.title',
            body            : 'modals:trucks.delete.body',
            confirm_text    : 'common:button.delete',
            max_width_dialog: '590px',
            onConfirm       : () =>
                deleteTruck({ truckId: truck_id }).unwrap().then(truckOptionsMenu.close)
        });
    };

    const edit = () => {
        editTruckDialog.open({
            truck_id
        });
        truckOptionsMenu.close();
    };

    const unassingTruck = () => {
        if (router.pathname === '/drivers' && driver_id) {
            removeDriverFromTruck({
                truckId : truck_id,
                driverId: driver_id
            }).unwrap();
            truckOptionsMenu.close();
        } else if (router.pathname === '/trailers' && trailerId) {
            removeTrailerFromTruck({
                truckId: truck_id,
                trailerId
            }).unwrap();
            truckOptionsMenu.close();
        }
    };

    const view = (e: MouseEvent) => {
        truckOptionsMenu.close();

        navigateToPage(`/trucks/${truck_id}`, e);
    };

    const copyHandler = () => {
        copy(copy_value, `${t('common:copy.copied')} ${copy_value}`);
        truckOptionsMenu.close();
    };

    const downloadDocs = () => {
        downloadDocumentDialog.open({
            entity_id     : truck_id,
            entity_type   : DocumentModel_DocumentEntityType.TRUCK,
            openEditDialog: () => {
                editTruckDialog.open({
                    truck_id
                });
            }
        });
        truckOptionsMenu.close();
    };

    return (
        <MenuComponents.List>
            <MenuComponents.Item
                Icon={<EditIcon fontSize="small" />}
                text="common:button.edit"
                onClick={edit}
            />
            {copy_value && (
                <MenuComponents.Item
                    Icon={<ContentCopy fontSize="small" />}
                    text="common:button.copy"
                    onClick={copyHandler}
                />
            )}
            <MenuComponents.Item
                Icon={<VisibilityIcon fontSize="small" />}
                text="common:button.details"
                onClick={(e) => view(e as MouseEvent)}
            />

            <MenuComponents.Item
                Icon={<DownloadIcon fontSize="small" />}
                text="common:button.download_docs"
                onClick={downloadDocs}
            />

            <MenuComponents.DangerItem
                Icon={<DeleteIcon fontSize="small" />}
                text={
                    router.pathname === '/trucks'
                        ? 'common:button.delete'
                        : 'common:button.unassign'
                }
                onClick={router.pathname === '/trucks' ? remove : unassingTruck}
            />
        </MenuComponents.List>
    );
}
