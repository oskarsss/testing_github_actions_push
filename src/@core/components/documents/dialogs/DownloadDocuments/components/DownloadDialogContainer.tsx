import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';

type Props = {
    title: string;
    children: React.ReactNode;
    onCancel: () => void;
    submitLoading: boolean;
    submitDisabled: boolean;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function DownloadDialogContainer({
    title,
    children,
    onCancel,
    submitLoading,
    submitDisabled,
    onSubmit
}: Props) {
    return (
        <DialogComponents.Form onSubmit={onSubmit}>
            <DialogComponents.Header
                textVariant="h6"
                title="core:documents.dialogs.download_documents.title"
                translationOptions={{ title }}
            />
            {children}
            <DialogComponents.DefaultActions
                onCancel={onCancel}
                submitLoading={submitLoading}
                submitDisabled={submitDisabled}
                submitText="common:button.download"
            />
        </DialogComponents.Form>
    );
}
