import React, {
    FunctionComponent,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo
} from 'react';
import { Options, useConfirm } from '@/@core/components/confirm-dialog/ConfirmDialogContext';
import { useMenuAndDialogContext } from '@/context/DialogAndMenuContext';
import DialogComponents from '@/@core/ui-kits/common-dialog';

type DialogRequiredProps = PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    onExited?: () => void;
    name?: string;
}>;

export type DialogContextConfirmDialog = {
    enable: (confirm?: () => Promise<void>) => void;
    disable: () => void;
    setDirty: (isDirty: boolean, confirm_options?: Partial<Options>) => void;
};

/**
 *
 * @param Component
 * @param DialogWrapper
 * @example
 * const useDialog = hookFabric(Component, DialogWrapper);
 */
export const hookFabric = function <T> (
    Component: React.FunctionComponent<T>,
    DialogWrapper: FunctionComponent<DialogRequiredProps> = DialogComponents.DialogWrapper
) {
    let usedHooks = 0;
    const key = Component.name + Math.random();
    const confirmFunction = { current: () => Promise.resolve() };
    return (calledInDialog = false) => {
        const {
            addWrapper,
            editWrapper,
            removeWrapper,
            setContent,
            removeContent
        } =
            useMenuAndDialogContext<DialogRequiredProps>();

        const forceClose = useCallback(() => {
            editWrapper({ open: false, Props: { open: false }, key });
        }, [editWrapper]);

        const close = useCallback(async () => {
            try {
                await confirmFunction.current();

                editWrapper({
                    open    : false,
                    key,
                    setProps: (props) => ({ ...props, open: false })
                });
            } catch (error) {
                if (error) {
                    console.error(error);
                }
            }
        }, [editWrapper]);

        const mountDialog = useCallback(() => {
            addWrapper({
                Wrapper: DialogWrapper,
                Props  : {
                    open    : false,
                    onClose : close,
                    onExited: () => removeContent(key),
                    name    : key
                },
                key
            });
            return () => {
                removeWrapper(key);
            };
        }, [close, removeContent, addWrapper, removeWrapper]);

        // useEffect(() => {
        //     if (usedHooks[key] === undefined) {
        //         usedHooks[key] = 0;
        //     }
        //     usedHooks[key] += 1;

        //     if (usedHooks[key] === 1) {
        //         const unmount = mountDialog();
        //         return () => {
        //             unmount();
        //             usedHooks[key] = 0;
        //         };
        //     }

        //     if (usedHooks[key] > 1) {
        //         return () => {
        //             usedHooks[key] -= 1;
        //         };
        //     }
        //     return () => {};
        // }, [mountDialog]);
        useEffect(() => {
            if (calledInDialog) {
                return () => {};
            }
            usedHooks += 1;
            let unmount: () => void = () => {};
            if (usedHooks === 1) {
                unmount = mountDialog();
            }

            return () => {
                if (usedHooks <= 1) {
                    unmount();
                    usedHooks = 0;
                    return;
                }
                usedHooks -= 1;
            };
        }, [mountDialog, calledInDialog]);

        const confirm = useConfirm();

        const defaultConfirm = useCallback(
            (option?: Partial<Options>) =>
                confirm({
                    title       : 'core:hook_fabric.confirm.title',
                    body        : 'core:hook_fabric.confirm.body',
                    confirm_text: 'common:button.close',
                    onConfirm   : () => {},
                    ...option
                }),
            [confirm]
        );

        const open = useCallback(
            (props: T) => {
                setContent(
                    key,
                    <Component
                        key={key}
                        {...props}
                    />
                );
            },
            [setContent]
        );

        const confirmDialog: DialogContextConfirmDialog = useMemo(
            () => ({
                enable: (confirm: () => Promise<void> = defaultConfirm) => {
                    confirmFunction.current = async () => {
                        await confirm();
                        forceClose();
                    };
                },
                disable: () => {
                    confirmFunction.current = () => Promise.resolve();
                },
                setDirty: (isDirty: boolean, confirm_options?: Partial<Options>) => {
                    if (isDirty) {
                        confirmFunction.current = async () => {
                            await defaultConfirm(confirm_options);
                            forceClose();
                        };
                    } else {
                        confirmFunction.current = () => Promise.resolve();
                    }
                }
            }),
            [defaultConfirm, forceClose]
        );

        return useMemo(
            () => ({
                open,
                close,
                forceClose,
                confirmDialog
            }),
            [open, close, forceClose, confirmDialog]
        );
    };
};
