import { useEffect, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NotFound from '@/@core/components/table/NotFound';
import { getColumn } from '@/@core/components/table/table_config';
import ColumnWidthAdjustProvider from '@/@core/components/table/ColumnWidthAdjust';
import TableTypes from '@/@core/components/table/types';
import TableContextProvider from '@/@core/components/table/contexts/TableContext';
import { TestIDs, applyTestId } from '@/configs/tests';
import { minWidthCell } from '@/@core/components/table/configs';
import { PageModel_View_Column, PageModel_View_Column_Type } from '@proto/models/model_page';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
import styles from './styles/Table.module.scss';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import Pagination from './Pagination';
import TableHeadline from './TableHeadline';
import VerticalLine from './ColumnWidthAdjust/VerticalLine';
import { ColumnAdjustContext } from './ColumnWidthAdjust/ColumnWidthAdjustProvider';
import ColumnWidthAdjustRenderer from './ColumnWidthAdjust/ColumnWidthAdjustRenderer';

/** icons */
import TableActions from './TableActions';
import Preloader from '../../ui-kits/basic/preloader/Preloader';
import { PAGE_ROW_HEIGHT_CONFIG } from './TableEditor/components/TableView/components/PageRowHight/PageRowHeight';

type TableColumns = TableTypes.ViewColumns;

// eslint-disable-next-line max-len
const getSizeAmountComposer =
    (columns: TableColumns) => (acc: number, col: TableColumns[number]) => {
        const columnWidth = col.width || getColumn(col, columns).width;
        const width = columnWidth > minWidthCell ? columnWidth : minWidthCell;
        return acc + width;
    };

// eslint-disable-next-line no-underscore-dangle
let _scrollBarRef: PerfectScrollbar | null = null;

const multiSelectColumnConfig: PageModel_View_Column = {
    columnId    : 'multi_select_checkbox',
    type        : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
    name        : '',
    width       : 70,
    sequence    : 0,
    headerId    : '',
    sticky      : true,
    borderLeft  : false,
    borderRight : false,
    footerTotal : false,
    stickyRight : false,
    friendlyName: ''
};

export default function Table<
    TableRowType extends object = object,
    WithEvent extends boolean = false
>({
    columns,
    headers,
    order,
    orderBy,
    updateFilters,
    view,
    rows,
    totals,
    executeAction,
    isLoading,
    page,
    per_page,
    rows_total,
    pagination,
    disabledYScroll = false,
    sticky_background_enabled = true,
    onUpdateWidth = () => {},
    customRowHeight,
    setCustomRowStyle,
    setMultiSelect = false,
    tableActionsConfig,
    filter_id,
    onCreateItem,
    tableName,
    defaultFilters,
    tableHeaderActionsConfig,
    customOrderConfig,
    pageType,
    isFetching
}: TableTypes.TableProps<TableRowType, WithEvent>) {
    const UpdatedView = useMemo(
        () =>
            setMultiSelect && view && view.columns.length > 0
                ? {
                    ...view,
                    columns: [multiSelectColumnConfig, ...view.columns]
                }
                : view,
        [view]
    );

    useEffect(() => {
        if (_scrollBarRef) {
            _scrollBarRef.updateScroll();
        }
    }, [rows]);

    const size: TableTypes.TableSize = useMemo(() => {
        const amountComposer = getSizeAmountComposer(columns as TableColumns);

        const totalLeftStickySize =
            UpdatedView?.columns.filter((col) => col.sticky).reduce(amountComposer, 0) || 0;

        const totalRegularSize =
            UpdatedView?.columns
                .filter((col) => !col.sticky && !col.stickyRight)
                .reduce(amountComposer, 0) || 0;

        const totalRightStickySize =
            UpdatedView?.columns
                .filter((view_col) => view_col.stickyRight)
                .reduce(
                    (acc, col) =>
                        acc +
                        (col.width || columns[col.columnId as keyof TableRowType]?.width || 100),
                    0
                ) || 0;

        return {
            total       : totalLeftStickySize + totalRegularSize + totalRightStickySize,
            left_sticky : totalLeftStickySize,
            regular     : totalRegularSize,
            right_sticky: totalRightStickySize
        };
    }, [UpdatedView, columns]);

    return (
        <>
            {setMultiSelect && tableActionsConfig && (
                <TableActions tableActionsConfig={tableActionsConfig} />
            )}
            <TableContextProvider executeAction={executeAction}>
                <ColumnWidthAdjustProvider
                    tableName={pageType}
                    view_id={view?.viewId || ''}
                    onUpdateWidth={onUpdateWidth}
                >
                    <ColumnAdjustContext.Consumer>
                        {({
                            updateScroll,
                            containerRef
                        }) => (
                            <div
                                {...applyTestId(TestIDs.components.coreTable)}
                                className={styles.container}
                                style={{
                                    cursor:
                                        view?.columns.length === 0 || rows.length === 0
                                            ? 'auto'
                                            : 'pointer'
                                }}
                            >
                                <PerfectScrollbar
                                    containerRef={(ref) => {
                                        // eslint-disable-next-line no-param-reassign
                                        containerRef.current = ref;
                                    }}
                                    options={{
                                        wheelSpeed      : 1,
                                        wheelPropagation: false,
                                        suppressScrollY : disabledYScroll
                                    }}
                                    ref={(ref) => {
                                        _scrollBarRef = ref;
                                    }}
                                    onScroll={updateScroll}
                                >
                                    {UpdatedView &&
                                        rows.length > 0 &&
                                        !isLoading &&
                                        view?.columns &&
                                        view.columns.length > 0 && (
                                        <ColumnWidthAdjustRenderer>
                                            <TableHeadline
                                                headers={headers}
                                                columns={columns}
                                                view={UpdatedView}
                                                size={size}
                                            />

                                            <TableHead
                                                page={pageType}
                                                isFetching={isFetching}
                                                columns={columns}
                                                order={order}
                                                orderBy={orderBy}
                                                customOrderConfig={customOrderConfig}
                                                updateFilters={updateFilters}
                                                view={UpdatedView}
                                                size={size}
                                                tableHeaderActionsConfig={
                                                    tableHeaderActionsConfig
                                                }
                                            />

                                            <TableBody
                                                viewRowHeight={
                                                    UpdatedView.rowHeight ||
                                                        PAGE_ROW_HEIGHT_CONFIG.small
                                                }
                                                setCustomRowStyle={setCustomRowStyle}
                                                customRowHeight={customRowHeight}
                                                size={size}
                                                view={UpdatedView}
                                                columns={columns}
                                                rows={rows}
                                                sticky_background_enabled={
                                                    sticky_background_enabled
                                                }
                                            />
                                            {totals && UpdatedView && (
                                                <TableFooter
                                                    columns={columns}
                                                    totals={totals}
                                                    view={UpdatedView}
                                                    size={size}
                                                    pagination={pagination}
                                                />
                                            )}
                                        </ColumnWidthAdjustRenderer>
                                    )}

                                    {isLoading || (isFetching && rows.length === 0) ? (
                                        <Preloader />
                                    ) : (
                                        <NotFound
                                            view={view}
                                            tableName={tableName}
                                            defaultFilters={defaultFilters}
                                            updateFilters={updateFilters}
                                            onCreateItem={onCreateItem}
                                            filter_id={filter_id}
                                            rows={rows}
                                            page={pageType}
                                        />
                                    )}
                                </PerfectScrollbar>

                                <VerticalLine />
                            </div>
                        )}
                    </ColumnAdjustContext.Consumer>

                    {!(page === 0 && rows.length === 0) &&
                        pagination &&
                        view?.columns &&
                        view.columns.length > 0 && (
                        <Pagination
                            updateFilters={updateFilters}
                            page={page}
                            per_page={per_page}
                            total={rows_total}
                        />
                    )}
                </ColumnWidthAdjustProvider>
            </TableContextProvider>
        </>
    );
}
