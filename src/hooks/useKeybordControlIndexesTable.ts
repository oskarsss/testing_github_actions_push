import { useCallback, useEffect } from 'react';
import { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { useUpdateFilters } from './useAdvancedUpdateFilters';

type UseControlsIndexesTable<Row> = {
    total: number;
    perPage: number;
    selectedPage: number;
    rows: Row[];
    selectRow: (row: number) => void;
    scrollBarRef: React.MutableRefObject<OverlayScrollbarsComponentRef | null>;
    defaultFilters: any;
    focusedRowId: number;
    filterId: string;
    setFocusedRowId: (row: number) => void;
};
export function useControlsIndexesTable<Row extends number>({
    total,
    perPage,
    selectedPage,
    rows,
    selectRow,
    scrollBarRef,
    focusedRowId,
    setFocusedRowId,
    filterId
}: UseControlsIndexesTable<Row>) {
    const updateFilters = useUpdateFilters({ filter_id: filterId });

    useEffect(() => {
        const instance = scrollBarRef.current?.osInstance();
        if (instance) {
            instance.elements().target?.focus();
        }
    }, [rows.length]);

    const scrollTop = useCallback(() => {
        const instance = scrollBarRef.current?.osInstance();
        if (!instance) return;
        instance.elements().viewport?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [scrollBarRef]);

    const handleKeyDown: React.KeyboardEventHandler<HTMLTableElement> = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();

                // const preparedManifest = rows.find((el) => el[keyField] === focusedRowId);
                if (focusedRowId) {
                    selectRow(focusedRowId);
                    setFocusedRowId(focusedRowId);
                }
                return;
            }

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const currentIndex = rows.findIndex((el) => el === focusedRowId);
                const newIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
                const newFocusedRowId = rows[newIndex];
                if (newFocusedRowId && newIndex >= 0 && newIndex < rows.length) {
                    setFocusedRowId(newFocusedRowId);
                    const instance = scrollBarRef.current?.osInstance();
                    const scrollElement = instance?.elements().target as HTMLElement;

                    if (!scrollElement) return;
                    const rowsContainer = scrollElement.querySelector(
                        '[data-scroll-rows=true]'
                    ) as HTMLElement;
                    if (!rowsContainer) return;
                    const focusedRow = rowsContainer.children[newIndex] as HTMLElement;
                    if (!focusedRow) return;
                    focusedRow.scrollIntoView({ behavior: 'instant', block: 'center' });
                }
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextPage = selectedPage + 1;
                if (nextPage > total / perPage) return;
                scrollTop();
                updateFilters({ page: nextPage });
            }

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevPage = selectedPage - 1;
                if (prevPage < 0) return;
                scrollTop();
                updateFilters({ page: prevPage });
            }
        },
        [
            focusedRowId,
            selectRow,
            setFocusedRowId,
            rows,
            scrollBarRef,
            selectedPage,
            total,
            perPage,
            scrollTop,
            updateFilters
        ]
    );

    return { handleKeyDown, scrollTop };
}
