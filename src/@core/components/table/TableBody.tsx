import { CSSProperties, memo, useMemo } from 'react';
import { Fixed } from '@/@core/components/table/styled/TableBody';
import TableTypes from '@/@core/components/table/types';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';
import { tableBodyProps } from '@/@core/components/search/search-field/SearchField';
import styles from './styles/TableBody.module.scss';
import Row from './Row';
import { useColumnAdjistContext } from './ColumnWidthAdjust/ColumnWidthAdjustProvider';

type ColumnsByType = {
    sticky_left: TableTypes.ViewColumn[];
    regular: TableTypes.ViewColumn[];
    sticky_right: TableTypes.ViewColumn[];
};

type Props = {
    rows: TableTypes.Rows;
    view: TableTypes.View;
    columns: TableTypes.CustomColumns;
    size: TableTypes.TableSize;
    sticky_background_enabled: boolean;
    customRowHeight?: CSSProperties['height'];
    setCustomRowStyle?: SxProps<Theme>;
    viewRowHeight: number;
};

const TableBody = ({
    rows,
    view,
    columns,
    size,
    sticky_background_enabled,
    customRowHeight,
    setCustomRowStyle,
    viewRowHeight
}: Props) => {
    const { contentRef } = useColumnAdjistContext();

    const cols_by_type: ColumnsByType = useMemo(() => {
        const c_by_type: ColumnsByType = {
            sticky_left : [],
            regular     : [],
            sticky_right: []
        };
        view.columns.forEach((col) => {
            if (col.sticky) {
                c_by_type.sticky_left.push(col);
            } else if (col.stickyRight) {
                c_by_type.sticky_right.push(col);
            } else {
                c_by_type.regular.push(col);
            }
        });

        return c_by_type;
    }, [view.columns]);

    return (
        <div
            className={styles.Container}
            ref={contentRef}
            {...tableBodyProps}
            style={{
                width: size.total
            }}
        >
            {size.left_sticky > 0 && (
                <Fixed width={size.left_sticky}>
                    {rows.map((row, index) => (
                        <Row
                            isSticky
                            setCustomRowStyle={setCustomRowStyle}
                            rowHeight={viewRowHeight}
                            key={row.unique_key}
                            cols={cols_by_type.sticky_left}
                            row={row}
                            columns={columns}
                            type="sticky"
                            index={index}
                            sticky_background_enabled={sticky_background_enabled}
                        />
                    ))}
                </Fixed>
            )}
            <div
                className={styles.Regular}
                style={{
                    width    : size.regular,
                    transform: `translate3d(${size.left_sticky}px, 0px, 0px)`
                }}
            >
                {rows.map((row, index) => (
                    <Row
                        setCustomRowStyle={setCustomRowStyle}
                        rowHeight={viewRowHeight}
                        key={row.unique_key}
                        cols={cols_by_type.regular}
                        row={row}
                        columns={columns}
                        type="normal"
                        index={index}
                    />
                ))}
            </div>
            <div
                className={styles.Fixed__Right}
                style={{
                    transform: `translate3d(${size.regular}px, 0px, 0px)`
                }}
            >
                {rows.map((row, index) => (
                    <Row
                        setCustomRowStyle={setCustomRowStyle}
                        rowHeight={viewRowHeight}
                        key={row.unique_key}
                        cols={cols_by_type.sticky_right}
                        row={row}
                        columns={columns}
                        type="sticky_right"
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(TableBody);
