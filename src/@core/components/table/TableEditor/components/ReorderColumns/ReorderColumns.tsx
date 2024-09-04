import React, { useEffect, useMemo, useState } from 'react';
import TableEditorComponents from '@/@core/components/table/TableEditor/TableEditorComponents';
import {
    useTableEditorContext,
    useTableEditorPropsContext,
    useTableEditorQueryContext
} from '@/@core/components/table/TableEditor/context';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TableTypes from '@/@core/components/table/types';
import { Fade } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ColumnsTitles from './components/ColumnsTitles';
import DraggableItem from './components/DraggableItem';

const generateUniqueKey = () => Math.random().toString(36).substr(2, 9);

export default function ReorderColumns() {
    const { viewId } = useTableEditorPropsContext();
    const { t } = useAppTranslation('core');
    const {
        updateSequence,
        selectedViewColumns,
        updateSelectedViewColumns,
        deleteSelectedViewColumn
    } = useTableEditorContext();
    const { views } = useTableEditorQueryContext();
    const [mounted, setMounted] = useState(false);

    const pinnedColumnsAmount = useMemo(
        () => selectedViewColumns.filter((column) => column.sticky).length,
        [selectedViewColumns]
    );

    const columnsViewState = useMemo(() => {
        const splittedColumns = selectedViewColumns.reduce(
            (acc, column) => {
                if (column.sticky) {
                    acc[0] = acc[0].concat(column);
                } else {
                    acc[1] = acc[1].concat(column);
                }
                return acc;
            },
            [[] as typeof selectedViewColumns, [] as typeof selectedViewColumns]
        );
        splittedColumns.forEach((columns) =>
            columns.sort((a, b) => (a.sequence > b.sequence ? 1 : -1)));
        return splittedColumns;
    }, [selectedViewColumns]);

    const sortedColumns = useMemo(() => columnsViewState.flat(), [columnsViewState]);

    useEffect(() => {
        if (views[viewId]?.columns.length > 40) {
            setMounted(false);
        }
    }, [viewId, views]);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    function onDragEnd(result: DropResult) {
        const {
            source,
            destination
        } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sourceId = +source.droppableId.charAt(0);
        const destinationId = +destination.droppableId.charAt(0);

        // if sourceId === 1 => column take out to pinned columns
        // if sourceId === 0 => column take out to unpinned columns
        // -----------------------------------------------------------
        // sourceId === destinationId => column change position in the same list
        // if sourceId === 0 and destinationId === 0 => changes in pinned columns
        // if sourceId === 1 and destinationId === 1 => changes in unpinned columns
        const sourceIndex =
            sourceId === 0 ? source.index : source.index + columnsViewState[0].length;
        const destinationIndex =
            destinationId === 0
                ? destination.index
                : destination.index + columnsViewState[0].length;

        const copy = [...sortedColumns];

        copy.splice(sourceIndex, 1);
        copy.splice(destinationIndex, 0, {
            ...sortedColumns[sourceIndex],
            sticky: destinationId === 0
        });

        const update = copy.map((item, index) => ({
            ...item,
            sequence: index + 1
        }));

        updateSequence(update);
    }

    // if (!mounted) return <Skeleton />;

    return (

    // <React.StrictMode>
    // <Stack

        // // style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', flex: '1 1 0' }}
        // >
        <DragDropContext
            onDragEnd={(props) => {
                onDragEnd(props);
            }}
        >
            {columnsViewState &&
                columnsViewState.map((el, ind) => (
                    <Droppable
                        // eslint-disable-next-line react/no-array-index-key
                        key={ind}
                        droppableId={`${ind}_${generateUniqueKey()}`}
                    >
                        {(provided, snapshot) => (
                            <>
                                <ColumnsTitles
                                    index={ind}
                                    pinnedAmount={pinnedColumnsAmount}
                                />
                                <TableEditorComponents.DraggableArea
                                    is_unpinned={Boolean(ind)}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {el.map((item, index) => (
                                        <DraggableItem
                                            key={item.columnId}
                                            {...item}
                                            updateColumnData={updateSelectedViewColumns}
                                            deleteSelectedViewColumn={deleteSelectedViewColumn}
                                            index={index}
                                        />
                                    ))}
                                    <Fade
                                        in={!snapshot.isDraggingOver}
                                        hidden={el.length > 0}
                                    >
                                        <TableEditorComponents.EmptyColumns>
                                            {t('table.table_editor.empty_columns')}
                                        </TableEditorComponents.EmptyColumns>
                                    </Fade>
                                    {provided.placeholder}
                                </TableEditorComponents.DraggableArea>
                            </>
                        )}
                    </Droppable>
                ))}
        </DragDropContext>

    // {/* </Stack> */}

    // {/* </React.StrictMode> */}
    );
}
