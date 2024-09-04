import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import DownloadIcon from '@mui/icons-material/Download';
import { useDownloadDocumentByEntityDialog } from '@/@core/components/documents/dialogs/DownloadDocuments/DownloadDocumentByEntity';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { TestIDs } from '@/configs/tests';
import { useConfirm } from '@/@core/components/confirm-dialog';
import navigateToPage from '@/utils/navigateToPage';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import type { MouseEvent } from 'react';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';

type Props = {
    truck_id?: string;
    trailer_id: string;
};

export const useTrailerOptionsMenu = menuHookFabric(TrailerOptionsMenu);

export default function TrailerOptionsMenu({
    truck_id,
    trailer_id
}: Props) {
    const router = useRouter();
    const [removeTrailerFromTruck, { isLoading }] =
        TrucksGrpcService.useRemoveTrailerFromTruckMutation();
    const editTrailerDialog = useEditTrailerDialog();
    const trailerOptionsMenu = useTrailerOptionsMenu(true);
    const downloadDocumentDialog = useDownloadDocumentByEntityDialog();
    const confirm = useConfirm();
    const [deleteTrailer] = TrailersGrpcService.useDeleteTrailerMutation();

    const remove = () => {
        confirm({
            icon            : <DangerousIcon color="secondary" />,
            title           : 'modals:trailers.delete.title',
            body            : 'modals:trailers.delete.body',
            confirm_text    : 'common:button.confirm',
            max_width_dialog: '600px',
            onConfirm       : () =>
                deleteTrailer({ trailerId: trailer_id }).unwrap().then(trailerOptionsMenu.close),
            cancelTestId : TestIDs.pages.editTrailer.buttons.cancelDeleteTrailer,
            confirmTestId: TestIDs.pages.editTrailer.buttons.confirmDeleteTrailer
        });
    };

    const unassign = () => {
        if (truck_id) {
            removeTrailerFromTruck({
                truckId  : truck_id,
                trailerId: trailer_id
            }).unwrap();
            trailerOptionsMenu.close();
        }
    };

    const edit = () => {
        editTrailerDialog.open({
            trailer_id
        });
        trailerOptionsMenu.close();
    };

    const downloadDocs = () => {
        downloadDocumentDialog.open({
            entity_id     : trailer_id,
            entity_type   : DocumentModel_DocumentEntityType.TRAILER,
            openEditDialog: () => {
                editTrailerDialog.open({
                    trailer_id
                });
            }
        });
        trailerOptionsMenu.close();
    };

    const handleView = (e?: MouseEvent) => {
        navigateToPage(`/trailers/${trailer_id}`, e);

        trailerOptionsMenu.close();
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
                    router.pathname === '/trailers'
                        ? 'common:button.delete'
                        : 'common:button.unassign'
                }
                onClick={router.pathname === '/trailers' ? remove : unassign}
                disabled={isLoading}
                Icon={<DeleteIcon fontSize="small" />}
            />
        </MenuComponents.List>
    );
}
