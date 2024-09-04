/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
    type MutableRefObject,
    type MouseEventHandler,
    type PropsWithChildren,
    useRef,
    Fragment
} from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableTypes from '@/@core/components/table/types';
import OverflowTooltip from '@/@core/ui-kits/basic/overflow-tooltip/OverflowTooltip';
import EventIcon from '@mui/icons-material/Event';
import { Tooltip, useTheme } from '@mui/material';
import { minWidthCell } from '@/@core/components/table/configs';
import { keyBy } from 'lodash';
import { PageModel_Page } from '@proto/models/model_page';
import TableSelectDeselectAllCheckbox from './TableSelectDeselectAllCheckbox';
import { getColumn } from './table_config';
import { ResizeRefComponent } from './ColumnWidthAdjust/ResizeRefComponent';

export type CustomOrderConfigType = {
    columnId: string;
    order: string;
};

type Props = {
    columns: TableTypes.CustomColumns;
    col: TableTypes.ViewColumn;
    order: TableTypes.Order | TableTypes.Order[];
    orderBy: string | string[];
    updateFilters: (arg: object) => void;
    page?: keyof typeof PageModel_Page;
    hasSticky: boolean;
    tableHeaderActionsConfig?: TableTypes.TableHeaderActions;
    customOrderConfig?: CustomOrderConfigType[];
    isLastStickyCell?: boolean;
};

const getOrderProps = (
    order: TableTypes.Order | TableTypes.Order[],
    orderBy: string | string[],
    column: string,
    customOrderConfig: CustomOrderConfigType[]
) => {
    const isCustomOrder = customOrderConfig.find((config) => config.order === orderBy);
    if (!Array.isArray(order) || !Array.isArray(orderBy)) {
        if (isCustomOrder) {
            return { orderValue: order, orderByValue: isCustomOrder.columnId } as {
                orderValue: TableTypes.Order;
                orderByValue: string;
            };
        }

        return { orderValue: order, orderByValue: orderBy } as {
            orderValue: TableTypes.Order;
            orderByValue: string;
        };
    }

    const propertyIndex = orderBy.indexOf(column);

    return {
        orderValue  : order[propertyIndex],
        orderByValue: orderBy[propertyIndex]
    };
};

export default function TableHeadCell({
    columns,
    col,
    order,
    orderBy,
    updateFilters,
    page,
    hasSticky,
    tableHeaderActionsConfig,
    customOrderConfig = [],
    isLastStickyCell
}: Props) {
    const { palette } = useTheme();

    const column = getColumn(col, columns);

    const wrapperRef = useRef<HTMLDivElement>(null);

    if (!column) {
        // eslint-disable-next-line no-throw-literal
        throw `${col.columnId} not found`;
    }

    const {
        orderValue,
        orderByValue
    } = getOrderProps(
        order,
        orderBy,
        col.columnId,
        customOrderConfig
    );

    const createSortHandler = (column: string) => {
        const isCustomOrder = customOrderConfig.find((config) => config.columnId === column);
        updateFilters({
            order  : orderByValue === column && orderValue === 'desc' ? 'asc' : 'desc',
            orderBy: isCustomOrder ? isCustomOrder.order : column,
            page   : 0
        });
    };

    const handleSort: MouseEventHandler<HTMLDivElement> = (e) => {
        if (column.sortable) {
            e.preventDefault();
            e.stopPropagation();
            createSortHandler(col.columnId);
        }
    };

    const isActiveCell = orderByValue === col.columnId;

    const LabelContainer =
        isActiveCell && column.sortable
            ? ({ children }: PropsWithChildren) => (
                <TableSortLabel
                    active={isActiveCell}
                    direction={orderValue}
                    sx={{ overflow: 'hidden' }}
                >
                    {children}
                </TableSortLabel>
            )
            : Fragment;

    const columnWidth = col.width || column.width;
    const width = columnWidth > minWidthCell ? columnWidth : minWidthCell;

    const isCheckboxColumn = col.columnId === 'multi_select_checkbox' && tableHeaderActionsConfig;

    return (
        <div
            ref={wrapperRef}
            style={{
                position      : 'relative',
                fontSize      : '0.875rem',
                display       : 'flex',
                flexDirection : 'row',
                justifyContent: 'flex-start',
                alignItems    : 'center',
                whiteSpace    : 'nowrap',
                fontWeight    : 600,
                borderLeft    : hasSticky ? 'none' : `1px solid ${palette.semantic.border.secondary}`,
                paddingLeft   : 16,
                paddingRight  : 16,
                margin        : 0,
                minWidth      : width,
                maxWidth      : width,
                cursor        : column.sortable ? 'pointer' : 'default',
                borderRight   : col.borderRight
                    ? `2px solid ${palette.semantic.border.secondary}`
                    : 'none',
                width
            }}
            onClick={handleSort}
        >
            {page && !isCheckboxColumn && (
                <ResizeRefComponent
                    wrapperRef={wrapperRef as MutableRefObject<HTMLDivElement>}
                    col_id={col.columnId}
                    col_type={col.type}
                    isLastStickyCell={isLastStickyCell}
                />
            )}

            <LabelContainer>
                <OverflowTooltip>{col.name}</OverflowTooltip>

                {'headerIcon' in col && 'headerIconTooltip' in col && col.headerIconTooltip && (
                    <Tooltip title={col.headerIconTooltip}>
                        <EventIcon
                            fontSize="small"
                            style={{
                                fontSize    : '17px',
                                marginLeft  : '4px',
                                marginBottom: '-3px'
                            }}
                        />
                    </Tooltip>
                )}
            </LabelContainer>

            {isCheckboxColumn && (
                <TableSelectDeselectAllCheckbox
                    tableName={tableHeaderActionsConfig.tableName}
                    idsList={tableHeaderActionsConfig.idsList}
                />
            )}
        </div>
    );
}
