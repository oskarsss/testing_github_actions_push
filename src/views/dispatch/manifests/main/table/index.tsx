import { memo, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import FastOverlayScrollBar from '@/@core/ui-kits/basic/fast-overlay-scrollbar/FastOverlayScrollBar';
import { isEqual } from 'lodash';
import { useManifests, useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import { selectSelectedManifestIdx } from '@/store/dispatch/manifests/selectors';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useControlsIndexesTable } from '@/hooks/useKeybordControlIndexesTable';
import ManifestsTableHeaderRow from './HeaderRow';
import ManifestTablePagination from './Pagination';
import Row from './Row';
import EmptyManifestsTable from './empty-state';
import Footer from './Footer';
import styles from './ManifestsTable.module.scss';

function ManifestTable() {
    const selectedManifestId = useAppSelector(selectSelectedManifestIdx);

    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.manifests.isFetching);

    const scrollBarRef = useRef<OverlayScrollbarsComponentRef | null>(null);

    const {
        rows,
        total,
        dynamicRowsIndexesByStartDate
    } = useManifests();

    const {
        selected_filters,
        selected_view_id,
        filter_id
    } = useManifestsFilters();

    const currentFilters = useRef<object | null>(null);

    const selectRow = useCallback(
        (manifestIdx: number) => {
            dispatch(ManifestsActions.SelectManifestIdx(manifestIdx));
        },
        [dispatch]
    );

    const focusedRowId = useAppSelector((state) => state.manifests.table.focusedRow);
    const setFocusedRowId = useCallback(
        (idx: number) => dispatch(ManifestsActions.FocusRow(idx)),
        [dispatch]
    );
    const {
        handleKeyDown,
        scrollTop
    } = useControlsIndexesTable({
        total,
        perPage       : selected_filters.per_page,
        selectedPage  : selected_filters.page,
        rows,
        selectRow,
        focusedRowId,
        filterId      : filter_id,
        setFocusedRowId,
        scrollBarRef,
        defaultFilters: manifestDefaultFilters
    });

    useEffect(() => {
        if (!isEqual(selected_filters, currentFilters.current) && rows.length && !isFetching) {
            const firstManifest = rows[0];

            if (firstManifest !== undefined && selectedManifestId !== firstManifest) {
                dispatch(ManifestsActions.SelectManifestIdx(firstManifest));
                setFocusedRowId(firstManifest);
                currentFilters.current = selected_filters;
            }
        }
    }, [rows, isFetching, selected_filters]);

    useEffect(() => {
        scrollTop();
    }, [scrollTop, selected_view_id]);

    const onClickRow = useCallback(
        (manifestIdx: number) => {
            dispatch(ManifestsActions.SelectManifestIdx(manifestIdx));
            setFocusedRowId(manifestIdx);
        },
        [dispatch, setFocusedRowId]
    );

    if (!rows.length && isFetching) {
        return <Preloader />;
    }

    if (!rows.length) {
        return <EmptyManifestsTable />;
    }

    return (
        <>
            <FastOverlayScrollBar
                ref={scrollBarRef}
                style={{ flexGrow: 1 }}
            >
                <div className={styles.table}>
                    <ManifestsTableHeaderRow isShowPreloader={isFetching && !!rows.length} />
                    <div
                        className={styles.rows}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                        data-scroll-rows
                    >
                        {rows.map((manifestIdx) => (
                            <Row
                                key={manifestIdx}
                                sortBy={selected_filters.sortBy}
                                startsIndexes={dynamicRowsIndexesByStartDate}
                                manifestIdx={manifestIdx}
                                onClick={onClickRow}
                            />
                        ))}
                    </div>
                    <Footer idxList={rows} />
                </div>
            </FastOverlayScrollBar>
            <ManifestTablePagination
                rowsCount={total}
                scrollTop={scrollTop}
            />
        </>
    );
}

export default memo(ManifestTable);
