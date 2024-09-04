import { createContext, useContext, useCallback, useState, ReactElement } from 'react';

import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import ConfirmDialog from './ConfirmDialog';

export type Options = {
    open?: boolean;
    icon?: React.ReactNode;
    title: string | IntlMessageKey | ReactElement;
    body: string | IntlMessageKey | ReactElement;
    confirm_text: string | IntlMessageKey;
    cancel_text?: IntlMessageKey;
    delete_text?: IntlMessageKey;
    onConfirm:
        | (() => void | Promise<unknown>)
        | (() => {
              unwrap?: () => Promise<unknown>;
          });
    onCancel?: () => void;
    onDelete?:
        | (() => void | Promise<unknown>)
        | (() => {
              unwrap?: () => Promise<unknown>;
          });
    cancelTestId?: string;
    confirmTestId?: string;
    deleteTestId?: string;
    max_width_dialog?: string;
    translationOptions?: {
        title?: IntlOptions;
        body?: IntlOptions;
    };
};

type ConfirmContextValues = (options: Options) => Promise<void>;

const ConfirmDialogContext = createContext<ConfirmContextValues>(() => new Promise(() => {}));

export const useConfirm = () => {
    const context = useContext(ConfirmDialogContext);

    if (context === undefined) {
        throw new Error('ConfirmDialog provider is not within Provider');
    }

    return context;
};

const default_options: Options = {
    open         : false,
    icon         : null,
    title        : '',
    body         : '',
    confirm_text : '',
    cancel_text  : 'common:button.cancel',
    onConfirm    : () => {},
    onCancel     : () => {},
    cancelTestId : '',
    confirmTestId: '',
    deleteTestId : ''
};

type Props = {
    children: React.ReactNode;
};
// eslint-disable-next-line import/prefer-default-export
export const ConfirmProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState(false);
    const [delete_loading, setDeleteLoading] = useState(false);
    const [options, setOptions] = useState<Options>(default_options);

    const onClose = useCallback(() => {
        setOptions((prev) => ({
            ...prev,
            open: false
        }));
    }, []);

    const confirm = useCallback(
        async (options: Options) =>
            new Promise<void>((resolve, reject) => {
                setOptions({
                    ...default_options,
                    ...options,
                    onConfirm: async () => {
                        await options.onConfirm?.();
                        resolve();
                    },
                    onCancel: async () => {
                        options.onCancel?.();
                        reject();
                    },
                    ...(options.onDelete
                        ? {
                            onDelete: async () => {
                                await options.onDelete?.();
                                resolve();
                            }
                        }
                        : {}),
                    open: true
                });
            }),
        []
    );

    const onConfirm = useCallback(async () => {
        setLoading(true);
        try {
            const promise = options.onConfirm();
            if (!promise) return;
            if ('unwrap' in promise) {
                await promise.unwrap?.();
            } else {
                await promise;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            onClose();
        }
    }, [options, onClose]);

    const onDelete = useCallback(async () => {
        setDeleteLoading(true);
        try {
            const promise = options.onDelete?.();
            if (!promise) return;
            if ('unwrap' in promise) {
                await promise.unwrap?.();
            } else {
                await promise;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDeleteLoading(false);
            onClose();
        }
    }, [options, onClose]);

    const onCancel = useCallback(() => {
        if (options.onCancel) {
            options.onCancel();
        }
        onClose();
    }, [options, onClose]);

    return (
        <>
            <ConfirmDialogContext.Provider value={confirm}>
                {children}
            </ConfirmDialogContext.Provider>
            <ConfirmDialog
                open={options.open || false}
                icon={options.icon}
                title={options.title}
                body={options.body}
                confirm_text={options.confirm_text}
                confirm_loading={loading}
                delete_loading={delete_loading}
                cancel_text={options.cancel_text}
                delete_text={options.delete_text}
                onConfirm={onConfirm}
                onCancel={onCancel}
                onDelete={onDelete}
                cancelTestId={options.cancelTestId}
                confirmTestId={options.confirmTestId}
                deleteTestId={options.deleteTestId}
                show_delete_button={!!options.onDelete}
                max_width_dialog={options.max_width_dialog}
                translationOptions={options.translationOptions}
            />
        </>
    );
};

export default ConfirmDialogContext;
