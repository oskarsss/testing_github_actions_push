/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import Documents from '@/store/documents/types';
import { useConfirm } from '@/@core/components/confirm-dialog';

import TabsDoc from '@/views/settings/tabs/Documents/components/Tabs/Tabs';
import Header from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import { getViewsEntity } from '@/views/settings/tabs/Documents/config';
import TableWrapper from '@/views/settings/tabs/Documents/components/Table/TableWrapper';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import { useActiveDocumentTypes } from '@/store/documents/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAddDocumentTypeDialog } from '../../dialogs/AddDocumentTypeDialog';
import ChangeOrderAction from './ChangeOrderAction';

type Props = {
    value: DocumentModel_DocumentEntityType | '';
    setValue: (value: DocumentModel_DocumentEntityType | '') => void;
};

export default function DocumentsTable({
    value,
    setValue
}: Props) {
    const { t } = useAppTranslation();
    const VIEWS_ENTITY = getViewsEntity(t);
    const [entity_type, setEntity] = useState<DocumentModel_DocumentEntityType | ''>(
        VIEWS_ENTITY[0].value
    );
    const [isChangeOrder, setIsChangeOrder] = useState(false);

    const confirm = useConfirm();

    const [updateDocumentTypesOrder] =
        DocumentTypesGrpcServices.useUpdateDocumentTypeSequenceMutation();
    const addTypeDialog = useAddDocumentTypeDialog();

    const openTypeDialog = () => {
        const entity_type: DocumentModel_DocumentEntityType =
            value === '' ? DocumentModel_DocumentEntityType.TRUCK : value;
        addTypeDialog.open({ entity_type });
    };

    const {
        documentTypes,
        isLoading
    } = useActiveDocumentTypes();

    const entity_document_types = useMemo(
        () =>
            entity_type
                ? documentTypes
                    .filter((item) => item.entityType === Number(entity_type))
                    .sort((a, b) => a.sequence - b.sequence)
                : documentTypes,
        [entity_type, documentTypes]
    );

    const [entityDocumentTypes, setEntityDocumentTypes] =
        useState<Documents.DocumentType[]>(entity_document_types);

    useEffect(() => {
        setEntityDocumentTypes(entity_document_types);
    }, [entity_document_types]);

    const isDisabledCancel = useMemo(
        () => JSON.stringify(entity_document_types) === JSON.stringify(entityDocumentTypes),
        [entity_document_types, entityDocumentTypes]
    );

    const onClickCancel = () => {
        if (isDisabledCancel) {
            setIsChangeOrder(false);
            return;
        }
        confirm({
            body        : 'settings:document_types.dialog.change_order.cancel.body',
            confirm_text: 'common:button.yes',
            cancel_text : 'common:button.no',
            onConfirm   : () => {
                setIsChangeOrder(false);
                setEntityDocumentTypes(entity_document_types);
            },
            title: 'settings:document_types.dialog.change_order.cancel.title'
        });
    };

    const onClickSave = () => {
        if (!entity_type) {
            return;
        }

        updateDocumentTypesOrder({
            documentTypeSequences: entityDocumentTypes.map((item, index) => ({
                documentTypeId: item.documentTypeId,
                sequence      : index
            }))
        }).then(() => {
            setIsChangeOrder(false);
        });
    };

    return (
        <>
            <Header
                onClick={openTypeDialog}
                title="settings:document_types.header.title"
                icon={<SettingIcons.DocumentTypes />}
            >
                {value !== '' && (
                    <ChangeOrderAction
                        disabledSave={isDisabledCancel}
                        disabledChange={entityDocumentTypes?.length <= 1}
                        isChangeOrder={isChangeOrder}
                        onCancel={onClickCancel}
                        onChangeOrder={setIsChangeOrder}
                        onSave={onClickSave}
                    />
                )}
            </Header>

            <TabsDoc
                isChangeOrder={isChangeOrder && !isDisabledCancel}
                value={value}
                setValue={setValue}
                setEntity={setEntity}
                onSave={onClickSave}
                document_types={documentTypes}
            />

            <TableWrapper
                isLoading={isLoading}
                value={value}
                isChangeOrder={isChangeOrder}
                entityDocumentTypes={entityDocumentTypes}
                setEntityDocumentTypes={setEntityDocumentTypes}
                openTypeDialog={openTypeDialog}
            />
        </>
    );
}
