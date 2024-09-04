import React from 'react';
import { getViewsEntity } from '@/views/settings/tabs/Documents/config';
import Documents from '@/store/documents/types';
import TableViews from '@/@core/components/table-views/TableViews';
import { Box } from '@/views/settings/tabs/Documents/components/Tabs/styled';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    value: DocumentModel_DocumentEntityType | '';
    setValue: (value: DocumentModel_DocumentEntityType | '') => void;
    setEntity: React.Dispatch<React.SetStateAction<'' | DocumentModel_DocumentEntityType>>;
    document_types: Documents.DocumentType[];
    isChangeOrder: boolean;
    onSave: () => void;
};
export default function TabsDoc({
    value,
    setValue,
    setEntity,
    document_types,
    isChangeOrder,
    onSave
}: Props) {
    const { t } = useAppTranslation();
    const confirm = useConfirm();

    const VIEWS_ENTITY = getViewsEntity(t);
    const defaultValue = VIEWS_ENTITY.map((i) => i.value).reduce((acc, i) => {
        if (!i) return acc;
        acc[i] = 0;
        return acc;
    }, {} as Record<DocumentModel_DocumentEntityType, number>);

    const handleChange = (newValue: DocumentModel_DocumentEntityType | '') => {
        if (isChangeOrder) {
            confirm({
                body        : 'settings:document_types.dialog.change_order.save.body',
                confirm_text: 'common:button.yes',
                cancel_text : 'common:button.no',
                onConfirm   : () => {
                    onSave();
                    setValue(newValue);
                    const filteredValue =
                        VIEWS_ENTITY.find((item) => item.value === Number(newValue))?.value || '';
                    setEntity(filteredValue);
                },
                onCancel: () => {
                    setValue(newValue);
                    const filteredValue =
                        VIEWS_ENTITY.find((item) => item.value === Number(newValue))?.value || '';
                    setEntity(filteredValue);
                },
                title: 'settings:document_types.dialog.change_order.save.body'
            });
        } else {
            setValue(newValue);
            const filteredValue =
                VIEWS_ENTITY.find((item) => item.value === Number(newValue))?.value || '';
            setEntity(filteredValue);
        }
    };

    const amount = document_types.reduce(
        (acc, { entityType }) => ({ ...acc, [entityType]: acc[entityType] + 1 }),
        { ...defaultValue }
    );

    const allAmount = document_types.length;

    const views = VIEWS_ENTITY.map((item) => ({
        ...item,
        view_id: item.value,
        name   : `${item.label} (${item.value ? amount[item.value] : allAmount})`
    }));

    return (
        <Box
            flexShrink={0}
            width="100%"
            zIndex={1}
        >
            <TableViews
                isScrollable
                showScrollBar
                hideBorder
                selectedViewId={value.toString()}
                views={views.map((item) => ({
                    ...item,
                    viewId: item.view_id.toString()
                }))}
                selectView={(view_id) =>
                    handleChange(view_id as DocumentModel_DocumentEntityType | '')}
            />
        </Box>
    );
}
