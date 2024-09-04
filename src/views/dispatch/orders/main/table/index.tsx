import React, { useCallback, useRef, useState } from 'react';
import {
    useOrdersPageFilters,
    useOrdersPageData
} from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import LoadsTableHeaderRow from '@/views/dispatch/orders/main/table/HeaderRow';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import FastOverlayScrollBar from '@/@core/ui-kits/basic/fast-overlay-scrollbar/FastOverlayScrollBar';
import { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import { useControlsIndexesTable } from '@/hooks/useKeybordControlIndexesTable';
import Pagination from './Pagination';
import LoadsTableBodyRow from './Row';
import EmptyLoadsTable from './EmptyLoadsTable';
import Footer from './Footer';
import styles from './OrdersTable.module.scss';

export default function LoadsTable() {
    const { rows } = useOrdersPageData();

    const [focusedRow, setFocusedRow] = useState(0);
    const scrollBarRef = useRef<OverlayScrollbarsComponentRef | null>(null);

    const isFetching = useAppSelector(OrdersDataSelectors.getOrdersIsFetching);

    const showTotals = useAppSelector((state) => state.loads.settings.showTotals);
    const dispatch = useAppDispatch();

    const setShowTotals = useCallback(() => {
        dispatch(LoadsActions.ToggleShowTotals());
    }, [dispatch]);

    const {
        selected_filters,
        filter_id
    } = useOrdersPageFilters();

    const {
        rowsTotalCounts,
        dynamicRowsIndexesByDay
    } = useOrdersPageData();

    const selectRow = useCallback(
        (index: number) => {
            dispatch(LoadsActions.SelectLoadIndex(index));
        },
        [dispatch]
    );

    const {
        handleKeyDown,
        scrollTop
    } = useControlsIndexesTable({
        total          : rowsTotalCounts,
        perPage        : selected_filters.per_page,
        selectedPage   : selected_filters.page,
        filterId       : filter_id,
        rows,
        selectRow,
        focusedRowId   : focusedRow,
        setFocusedRowId: setFocusedRow,
        scrollBarRef,
        defaultFilters : default_loads_filters
    });

    if (rows.length === 0) {
        return (
            <div className={styles.tableWrapper}>
                <EmptyLoadsTable />
            </div>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <FastOverlayScrollBar
                ref={scrollBarRef}
                onKeyDown={handleKeyDown}
                style={{ flexGrow: 1 }}
            >
                <div className={styles.table}>
                    <LoadsTableHeaderRow isShowPreloader={isFetching} />
                    <div
                        tabIndex={0}
                        className={styles.rowsWrapper}
                        data-scroll-rows
                        onKeyDown={handleKeyDown}
                    >
                        {rows.map((row) => (
                            <LoadsTableBodyRow
                                sortBy={selected_filters.sortBy}
                                dynamicRowsIndexesByDay={dynamicRowsIndexesByDay}
                                key={row}
                                index={row}
                                isFocused={focusedRow === row}
                                setFocusedRowId={setFocusedRow}
                            />
                        ))}
                    </div>
                    <Footer
                        rows={rows}
                        showTotals={showTotals}
                    />
                </div>
            </FastOverlayScrollBar>
            <Pagination
                totalOrdersCount={rowsTotalCounts}
                setShowTotals={setShowTotals}
                showTotals={showTotals}
                scrollTop={scrollTop}
            />
        </div>
    );
}
