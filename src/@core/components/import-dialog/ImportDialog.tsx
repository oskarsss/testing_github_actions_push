import ImportType from '@/store/import/types';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useEffect } from 'react';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ImportActions } from '@/store/import/slice';
import { initialImportFilesState } from '@/store/import/actions';
import Import from './Import';

export const useImportDialog = hookFabric(ImportDialog, (props) => (
    <FullDialog.Dialog
        open={props.open}
        onExited={props.onExited}
        onClose={props.onClose}
        paperStyles={{
            maxWidth  : '90vw',
            minWidth  : '1160px',
            width     : 'auto',
            maxHeight : '100%',
            height    : '100%',
            alignItems: 'flex-start',
            overflow  : 'hidden',
            margin    : 0
        }}
    >
        {props.children}
    </FullDialog.Dialog>
));

type Props = {
    category_id?: ImportType.CategoryId;
    isShowSelectType?: boolean;
};
function ImportDialog({
    category_id,
    isShowSelectType = true
}: Props) {
    const dispatch = useAppDispatch();
    const dialog = useImportDialog(true);

    const is_confirm_dialog = useAppSelector((state) => {
        const files = state.import.files_map[state.import.category_id]?.files;
        const step_with_enable = state.import.active_step <= 1;
        return Object.keys(files || {}).length > 0 && step_with_enable;
    });

    useEffect(() => {
        if (is_confirm_dialog) {
            dialog.confirmDialog.enable();
        } else {
            dialog.confirmDialog.disable();
        }
    }, [is_confirm_dialog, dialog.confirmDialog]);

    useEffect(() => {
        if (category_id) {
            dispatch(ImportActions.UpdateCategoryId({ category_id }));
        }
        dispatch(ImportActions.SetActiveStep(0));
    }, [category_id]);

    useEffect(() => {
        dispatch(initialImportFilesState());
    }, []);

    return (
        <Import
            isShowSelectType={isShowSelectType}
            closeDialog={dialog.close}
        />
    );
}
