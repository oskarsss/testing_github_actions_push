/* eslint-disable react/jsx-props-no-spreading */
import { IconButton } from '@mui/material';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import { Draggable } from 'react-beautiful-dnd';
import React, { memo } from 'react';
import { PageModel_View_Column } from '@proto/models/model_page';
import ColumnItem from './ColumnItem';
import { UpdateColumnDataCallback } from '../../../context';

interface Props extends PageModel_View_Column {
    index: number;
    updateColumnData: UpdateColumnDataCallback;
    deleteSelectedViewColumn: (columnId: string) => void;
}

const DraggableItem = ({
    index,
    ...col
}: Props) => (
    <Draggable
        key={col.columnId}
        draggableId={col.columnId}
        index={index}
    >
        {(p) => (
            <div
                ref={p.innerRef}
                {...p.draggableProps}
            >
                <ColumnItem {...col}>
                    <IconButton
                        {...p.dragHandleProps}
                        sx={{ cursor: 'grab !important' }}
                        size="small"
                    >
                        <TableEditorIcons.ColumnName />
                    </IconButton>
                </ColumnItem>
            </div>
        )}
    </Draggable>
);

export default memo(DraggableItem);
