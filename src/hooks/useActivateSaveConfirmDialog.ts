// import { useConfirm } from '@/@core/components/confirm-dialog';
// import { DialogContextConfirmDialog } from '@/utils/dialog-hook-fabric';
// import { useEffect, useRef } from 'react';
//
// type Props = {
//     confirmDialog: DialogContextConfirmDialog;
//     isActive: boolean;
//     onCancel: () => void;
//     onConfirm: () => void;
// };
//
// const useActivateSaveConfirmDialog = ({
//     confirmDialog,
//     isActive,
//     onCancel,
//     onConfirm
// }: Props) => {
//     const confirm = useConfirm();
//     const dialogClose = useRef(onCancel);
//     const dialogConfirm = useRef(onConfirm);
//
//     // Lifehack )))
//     dialogClose.current = onCancel;
//     dialogConfirm.current = onConfirm;
//
//     useEffect(() => {
//         if (isActive) {
//             confirmDialog.enable(() =>
//                 confirm({
//                     title       : 'Close or Save & Close',
//                     body        : 'You have unsaved changes.
//                     Do you want to save them before you exit?',
//                     confirm_text: 'Save & Close',
//                     cancel_text : 'Close',
//                     onConfirm   : dialogConfirm.current,
//                     onCancel    : dialogClose.current
//                 }));
//         } else {
//             confirmDialog.disable();
//         }
//     }, [isActive, confirmDialog, confirm]);
// };
//
// export default useActivateSaveConfirmDialog;
