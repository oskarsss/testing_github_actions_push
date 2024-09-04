import DialogComponents from '@/@core/ui-kits/common-dialog';
import { ReactElement, useEffect, useRef } from 'react';
import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';

type Props = {
    open: boolean;
    icon?: React.ReactNode;
    title: string | IntlMessageKey | ReactElement;
    body: string | IntlMessageKey | ReactElement;
    confirm_text: IntlMessageKey | string;
    cancel_text?: IntlMessageKey | string;
    delete_text?: IntlMessageKey | string;
    confirm_loading: boolean;
    delete_loading: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    onDelete: () => void;
    cancelTestId?: string;
    confirmTestId?: string;
    deleteTestId?: string;
    show_delete_button?: boolean;
    max_width_dialog?: string;
    translationOptions?: {
        title?: IntlOptions;
        body?: IntlOptions;
    };
};

export default function ConfirmDialog({
    open,
    icon,
    title,
    body,
    confirm_text,
    cancel_text,
    delete_text,
    confirm_loading,
    delete_loading,
    onConfirm,
    onCancel,
    onDelete,
    cancelTestId,
    confirmTestId,
    deleteTestId,
    show_delete_button = false,
    max_width_dialog,
    translationOptions
}: Props) {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (open) {
            dialogRef.current?.focus();
            const onKeydown = (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    event.stopPropagation();
                    onConfirm();
                }
            };
            dialogRef.current?.addEventListener('keydown', onKeydown);
            return () => {
                dialogRef.current?.removeEventListener('keydown', onKeydown);
            };
        }
    }, [open]);

    return (
        <DialogComponents.DialogWrapper
            open={open}
            onClose={onCancel}
            maxWidth={max_width_dialog}
            DialogProps={{
                style    : { zIndex: 9999 },
                ref      : dialogRef,
                autoFocus: open,
                tabIndex : open ? 1 : undefined
            }}
        >
            <DialogComponents.Form
                onSubmit={(event) => {
                    event.preventDefault();
                    onConfirm();
                }}
            >
                <DialogComponents.Header
                    textVariant="h6"
                    title={title}
                    translationOptions={translationOptions?.title}
                />

                <DialogComponents.SubHeader
                    text={body}
                    translationOptions={translationOptions?.body}
                />

                <DialogComponents.ActionsWrapper>
                    <DialogComponents.CancelButton
                        onCancel={onCancel}
                        cancel_text={cancel_text}
                        testID={cancelTestId}
                    />
                    {show_delete_button && (
                        <DialogComponents.DeleteButton
                            loading={delete_loading}
                            onClick={onDelete}
                            text={delete_text}
                            deleteTestId={deleteTestId}
                            disabled={confirm_loading}
                        />
                    )}
                    <DialogComponents.SubmitButton
                        text={confirm_text}
                        loading={confirm_loading}
                        disabled={delete_loading}
                        testID={confirmTestId}
                    />
                </DialogComponents.ActionsWrapper>
            </DialogComponents.Form>
        </DialogComponents.DialogWrapper>
    );
}
