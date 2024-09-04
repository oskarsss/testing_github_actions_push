import TableBody from '@mui/material/TableBody';
import {
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable
} from 'react-beautiful-dnd';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import columns from '@/views/settings/tabs/Documents/components/Table/columns';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import Documents from '@/store/documents/types';
import DangerousIcon from '@mui/icons-material/Dangerous';

import { useConfirm } from '@/@core/components/confirm-dialog';
import { useEditDocumentTypeDialog } from '@/views/settings/tabs/Documents/dialogs/EditDocumentTypeDialog';
import { useState } from 'react';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import TableRowContent from './TableRowContent';

type Props = {
    value: DocumentModel_DocumentEntityType | '';
    isChangeOrder: boolean;
    entityDocumentTypes: Documents.DocumentType[];
};

export default function TableDropableContent({
    value,
    isChangeOrder,
    entityDocumentTypes
}: Props) {
    const [selectedRowKey, setSelectedRowKey] = useState('');
    const dialog = useEditDocumentTypeDialog();
    const confirm = useConfirm();
    const [deleteType] = DocumentTypesGrpcServices.useDeleteDocumentTypeMutation();

    const executeAction: ExecuteAction<Documents.DocumentType> = (name, {
        row,
        event
    }) => {
        event.preventDefault();
        event.stopPropagation();
        switch (name) {
        case 'edit':
            setSelectedRowKey(row.documentTypeId);
            dialog.open({ item: row });
            break;
        case 'delete':
            confirm({
                icon              : <DangerousIcon color="secondary" />,
                title             : 'settings:document_types.dialog.delete.title',
                body              : 'settings:document_types.dialog.delete.body',
                confirm_text      : 'common:button.delete',
                translationOptions: {
                    title: {
                        documentName: row.title
                    }
                },
                onConfirm: () =>
                    deleteType({
                        documentTypeId: row.documentTypeId
                    })
            });
            break;
        default:
            break;
        }
    };

    return (
        <Droppable droppableId="document-types-table">
            {(droppableProvided) => (
                <TableBody
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                >
                    {[...entityDocumentTypes].map((row, ind) => (
                        <Draggable
                            key={row.documentTypeId}
                            draggableId={row.documentTypeId}
                            index={ind}
                        >
                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                <MiniTableStyled.Row
                                    hover
                                    sx={{
                                        height: '34px',
                                        ...(snapshot.isDragging && {
                                            background: (theme) =>
                                                theme.palette.semantic.foreground.disabled,
                                            border: (theme) =>
                                                `1px solid ${theme.palette.semantic.text.secondary}`,
                                            borderRadius: '4px',
                                            boxShadow   : (theme) => theme.shadows[1],
                                            td          : {
                                                height: '35px'
                                            }
                                        })
                                    }}
                                    row_size="small"
                                    without_border
                                    ref={provided.innerRef}
                                    isSelected={selectedRowKey === row.documentTypeId}
                                    {...provided.draggableProps}
                                >
                                    <TableRowContent
                                        columns={columns}
                                        dragHandleProps={provided.dragHandleProps}
                                        row={row}
                                        executeAction={executeAction}
                                        isEnableDrag={isChangeOrder && value !== ''}
                                    />
                                </MiniTableStyled.Row>
                            )}
                        </Draggable>
                    ))}
                </TableBody>
            )}
        </Droppable>
    );
}
