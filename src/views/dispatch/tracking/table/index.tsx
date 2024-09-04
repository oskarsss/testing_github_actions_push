import {
    useTrackingPageData,
    useTrackingFilters
} from '@/@grpcServices/services/loads-service/service-hooks/tracking-service-hooks';
import { trackingSelectedLoadIdxSelector } from '@/store/dispatch/tracking/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TrackingActions } from '@/store/dispatch/tracking/slice';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { isEqual } from 'lodash';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import FastOverlayScrollBar from '@/@core/ui-kits/basic/fast-overlay-scrollbar/FastOverlayScrollBar';
import { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { OrdersTableFetchingProgress } from '@/@core/ui-kits/loads/table';
import { useControlsIndexesTable } from '@/hooks/useKeybordControlIndexesTable';
import Footer from './Footer';
import Pagination from './Pagination';
import Row from './Row';
import styles from './TrackingTable.module.scss';
import HeaderRow from './HeaderRow';
import EmptyLoadsTable from './EmptyLoadsTable';

function TrackingLoadsTable() {
    const selectedLoadId = useAppSelector(trackingSelectedLoadIdxSelector);
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(OrdersDataSelectors.getOrdersIsFetching);

    const currentFilters = useRef<null | object>(null);

    const showTotals = useAppSelector((state) => state.tracking.settings.showTotals);

    const scrollBarRef = useRef<OverlayScrollbarsComponentRef | null>(null);
    const [focusedRow, setFocusedRow] = useState<number>(0);

    const {
        filter_id,
        selected_filters
    } = useTrackingFilters();

    const {
        rows,
        rowsTotalCounts,
        dynamicRowsIndexesByDay
    } = useTrackingPageData();

    const handleClickRow = useCallback(
        (row: number) => {
            dispatch(TrackingActions.SelectLoadIndex(row));
            setFocusedRow(row);
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
        rows,
        filterId       : filter_id,
        focusedRowId   : focusedRow,
        setFocusedRowId: setFocusedRow,
        selectRow      : handleClickRow,
        defaultFilters : default_loads_filters,
        scrollBarRef
    });

    useEffect(() => {
        if (!isEqual(selected_filters, currentFilters.current) && rows.length) {
            const firstLoad = rows[0];
            if (firstLoad !== undefined && selectedLoadId !== firstLoad) {
                dispatch(TrackingActions.SelectLoadIndex(rows[0]));

                currentFilters.current = selected_filters;
            }
        }
    }, [rows, selectedLoadId, selected_filters]);

    if (rows.length === 0) {
        return (
            <EmptyLoadsTable
                filterId={filter_id}
                selectedFilters={selected_filters}
                defaultFilters={default_loads_filters}
            />
        );
    }

    return (
        <>
            <FastOverlayScrollBar
                ref={scrollBarRef}
                style={{ flexGrow: 1 }}
                onKeyDown={handleKeyDown}
            >
                <div className={styles.table}>
                    <HeaderRow
                        filterId={filter_id}
                        sortBy={selected_filters.sortBy}
                    />

                    <div
                        className={styles.rows}
                        tabIndex={0}
                        data-scroll-rows
                    >
                        {isFetching && rows.length ? <OrdersTableFetchingProgress /> : null}
                        {rows.map((row) => (
                            <Row
                                dynamicIndexesByFirstDate={dynamicRowsIndexesByDay}
                                key={row}
                                sortBy={selected_filters.sortBy}
                                index={row}
                                onClickRow={handleClickRow}
                                isFocused={focusedRow === row}
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
                totalsOrdersCount={rowsTotalCounts}
                scrollTop={scrollTop}
            />
        </>
    );
}

export default TrackingLoadsTable;
