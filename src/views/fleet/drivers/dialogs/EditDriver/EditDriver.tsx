import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import themeConfig from '@/configs/themeConfig';
import { Transition } from '@/@core/components/Transition';
import { Dialog as MUIDialog } from '@mui/material';
import { useDriverById } from '@/store/storage/drivers/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import EditDriverForm from './EditDriverForm';

type Props = {
    driver_id: string;
    document_id?: string;
};

export const useEditDriverDialog = hookFabric(
    EditDriver,
    ({
        onClose,
        onExited,
        name,
        open,
        children
    }) => (
        <MUIDialog
            keepMounted
            open={open}
            TransitionComponent={Transition}
            TransitionProps={{
                timeout: themeConfig.dialogTransitionTimeout,
                onExited
            }}
            id={name}
            onClose={onClose}
            sx={{
                '& .MuiDialog-container': {
                    position      : 'relative',
                    display       : 'flex',
                    justifyContent: 'flex-end',
                    alignItems    : 'center'
                },
                '.MuiDialog-paper': {
                    maxWidth      : 'min(1500px, 90vw)',
                    maxHeight     : '100%',
                    height        : '100%',
                    margin        : 0,
                    display       : 'flex',
                    justifyContent: 'flex-end',
                    alignItems    : 'center',
                    flexShrink    : 1,
                    flexGrow      : 1
                }
            }}
        >
            {children}
        </MUIDialog>
    )
);

function EditDriver({
    driver_id,
    document_id = ''
}: Props) {
    const dialog = useEditDriverDialog(true);
    const driver = useDriverById(driver_id || '');
    const isLoading = useAppSelector(DriversDataSelectors.getIsLoading);

    // if (isError) {
    //     return (
    //         <FullDialog.FailedFetching
    //             onRetry={refetch}
    //             onClose={dialog.close}
    //         />
    //     );
    // }

    if (isLoading) return <FullDialog.FetchingProcess />;

    return (
        <EditDriverForm
            refetch={() => {}}
            driver={driver}
            document_id={document_id}
        />
    );
}

export default EditDriver;
