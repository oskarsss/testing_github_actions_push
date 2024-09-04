import { memo } from 'react';
import { useTheme } from '@mui/material/styles';
import { keyBy } from 'lodash';
import { Fixed } from '@/@core/components/table/styled/TableHeadline';
import TableTypes from '@/@core/components/table/types';
import styles from './styles/TableHeadline.module.scss';
import TableHeadlineCell from './TableHeadlineCell';
import { getColumn } from './table_config';

const calculateHeadlines = (
    headers: TableTypes.Headers,
    cols: TableTypes.ViewColumns,
    columns: TableTypes.CustomColumns
) => {
    let current_headline: TableTypes.HeadlineCell;
    const headline_columns: TableTypes.HeadlineCell[] = [];
    const header_by_key = keyBy(headers, 'headerId');
    cols.forEach((col, index) => {
        const column = getColumn(col, columns);
        if (!column) {
            // eslint-disable-next-line no-throw-literal
            throw `${col.columnId} not found`;
        }

        if (!current_headline) {
            current_headline = {
                column_id   : col.columnId,
                header_id   : col.headerId,
                sticky      : col.sticky,
                width       : col.width,
                name        : header_by_key[col.headerId]?.name ?? '',
                color       : header_by_key[col.headerId]?.color ?? '',
                border_left : 'borderLeft' in col ? col.borderLeft : false,
                border_right: col.borderRight
            };
        } else if (current_headline.header_id !== col.headerId) {
            // push to table_columns
            headline_columns.push(current_headline);

            // create next
            current_headline = {
                column_id   : col.columnId,
                header_id   : col.headerId,
                sticky      : col.sticky,
                width       : col.width,
                name        : header_by_key[col.headerId]?.name ?? '',
                color       : header_by_key[col.headerId]?.color ?? '',
                border_left : 'borderLeft' in col ? col.borderLeft : false,
                border_right: col.borderRight
            };
        } else {
            current_headline.width += col.width;
            current_headline.border_right = col.borderRight;
            current_headline.border_left = 'borderLeft' in col ? col.borderLeft : false;
        }

        if (index + 1 === cols.length) {
            headline_columns.push(current_headline);
        }
    });
    return headline_columns;
};

type Props = {
    headers: TableTypes.Headers | null;
    columns: TableTypes.CustomColumns;
    view: TableTypes.View;
    size: TableTypes.TableSize;
};

const TableHeadline = ({
    headers,
    columns,
    view,
    size
}: Props) => {
    const { palette } = useTheme();

    let fixed_headline_columns: TableTypes.HeadlineCell[] = [];
    let headline_columns: TableTypes.HeadlineCell[] = [];
    if (view && view.columns && headers) {
        // eslint-disable-next-line max-len
        fixed_headline_columns = calculateHeadlines(
            headers,
            view.columns.filter((col) => col.sticky),
            columns
        );
        // eslint-disable-next-line max-len
        headline_columns = calculateHeadlines(
            headers,
            view.columns.filter((col) => !col.sticky),
            columns
        );
    }

    // if (fixed_headline_columns.length === 0 && headline_columns.length === 0) {
    //     return null;
    // }

    return (
        <div
            className={styles.Container}
            style={{
                width          : size.total,
                backgroundColor: palette.semantic.foreground.secondary,
                marginBottom   : '-2px'
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
                            backgroundColor: palette.semantic.foreground.secondary
                        }}
                    >
                        {view &&
                            fixed_headline_columns
                                .filter((col) => col.sticky)
                                .map((col) => (
                                    <TableHeadlineCell
                                        hasSticky={false}
                                        key={col.column_id}
                                        col={col}
                                        mode={palette.mode}
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
                        backgroundColor: palette.semantic.foreground.secondary
                    }}
                >
                    {view &&
                        headline_columns
                            .filter((col) => !col.sticky)
                            .map((col) => (
                                <TableHeadlineCell
                                    hasSticky={size.left_sticky > 0}
                                    key={col.column_id}
                                    col={col}
                                    mode={palette.mode}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
};

export default memo(TableHeadline);
