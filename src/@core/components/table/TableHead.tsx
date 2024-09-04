import { memo, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Fixed } from '@/@core/components/table/styled/TableHead';
import TableTypes from '@/@core/components/table/types';
import { PageModel_Page } from '@proto/models/model_page';
import { LinearProgress } from '@mui/material';
import styles from './styles/TableHead.module.scss';
import TableHeadCell, { CustomOrderConfigType } from './TableHeadCell';

type Props = {
    columns: TableTypes.CustomColumns;
    view: TableTypes.View;
    order: TableTypes.Order | TableTypes.Order[];
    orderBy: string | string[];
    updateFilters: (filters: object) => void;
    size: TableTypes.TableSize;
    tableHeaderActionsConfig?: TableTypes.TableHeaderActions;
    customOrderConfig?: CustomOrderConfigType[];
    page?: keyof typeof PageModel_Page;
    isFetching?: boolean;
};

const TableHead = ({
    columns,
    view,
    order,
    orderBy,
    updateFilters,
    size,
    tableHeaderActionsConfig,
    customOrderConfig,
    page,
    isFetching
}: Props) => {
    const { palette } = useTheme();

    const ref = useRef<HTMLDivElement>(null);
    const columnsSticky = view?.columns.filter((col) => col.sticky);

    return (
        <div
            ref={ref}
            className={styles.Container}
            style={{
                width       : size.total,
                marginBottom: '-2px'
            }}
        >
            {size.left_sticky > 0 && (
                <Fixed
                    width={size.left_sticky}
                    style={{
                        backgroundColor: palette.semantic.foreground.secondary
                    }}
                >
                    <div
                        className={styles.Row}
                        style={{
                            borderBottom: `1px solid ${palette.semantic.border.secondary}`
                        }}
                    >
                        {columnsSticky?.map((col, index) => (
                            <TableHeadCell
                                customOrderConfig={customOrderConfig}
                                hasSticky={false}
                                key={col.columnId}
                                updateFilters={updateFilters}
                                columns={columns}
                                col={col}
                                orderBy={orderBy}
                                order={order}
                                page={page}
                                tableHeaderActionsConfig={tableHeaderActionsConfig}
                                isLastStickyCell={index === columnsSticky.length - 1}
                            />
                        ))}
                    </div>
                </Fixed>
            )}

            <div
                className={styles.Regular}
                style={{
                    transform: `translate3d(${size.left_sticky}px, 0px, 0px)`
                }}
            >
                <div
                    className={styles.Row}
                    style={{
                        borderBottom: `1px solid ${palette.semantic.border.secondary}`,

                        backgroundColor: palette.semantic.foreground.secondary
                    }}
                >
                    {view?.columns
                        .filter((col) => !col.sticky)
                        .map((col) => (
                            <TableHeadCell
                                customOrderConfig={customOrderConfig}
                                key={col.columnId}
                                hasSticky={size.left_sticky > 0}
                                updateFilters={updateFilters}
                                columns={columns}
                                col={col}
                                orderBy={orderBy}
                                order={order}
                                page={page}
                                tableHeaderActionsConfig={tableHeaderActionsConfig}
                            />
                        ))}
                </div>
            </div>
            {isFetching && (
                <LinearProgress
                    sx={{
                        zIndex                    : 1000,
                        position                  : 'absolute',
                        left                      : 0,
                        right                     : 0,
                        bottom                    : 0,
                        height                    : 4,
                        backgroundColor           : palette.semantic.foreground.brand.tertiary,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: palette.semantic.foreground.brand.primary
                        }
                    }}
                />
            )}
        </div>
    );
};

export default memo(TableHead);
