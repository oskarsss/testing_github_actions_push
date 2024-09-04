import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import {
    Container,
    ReorderItem
} from '@/@core/ui-kits/loads/loads-page-views/edit-view-filter/styled';
import { IconButton } from '@mui/material';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import React from 'react';
import { ManifestView } from '@/store/dispatch/manifests/models';

type Props = {
    sortedViews: ManifestView[];
    setSortedViews: (views: ManifestView[]) => void;
};

export default function DragDropFilter({
    sortedViews,
    setSortedViews
}: Props) {
    const onDragEnd = (result: DropResult) => {
        const {
            source,
            destination
        } = result;

        if (!destination) {
            return;
        }

        const new_items = Array.from(sortedViews);
        const [removed] = new_items.splice(source.index, 1);
        new_items.splice(destination.index, 0, removed);

        setSortedViews(new_items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="views">
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {sortedViews.map((item, index) => (
                            <Draggable
                                draggableId={item.view_id}
                                key={item.view_id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <ReorderItem>
                                            <IconButton
                                                {...provided.dragHandleProps}
                                                size="small"
                                            >
                                                <TableEditorIcons.ColumnName />
                                            </IconButton>
                                            <span>{item.name}</span>
                                        </ReorderItem>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
}
