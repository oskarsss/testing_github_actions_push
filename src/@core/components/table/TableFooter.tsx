import { useTheme } from '@mui/material/styles';
import TableTypes from '@/@core/components/table/types';
import styles from './styles/TableFooter.module.scss';
import TableFooterRow from './TableFooterRow';

type Props = {
    columns: TableTypes.CustomColumns;
    totals: TableTypes.Totals;
    view: TableTypes.View;
    size: TableTypes.TableSize;
    pagination?: boolean;
};

export default function TableFooter({
    columns,
    totals,
    view,
    size,
    pagination = false
}: Props) {
    const theme = useTheme();
    const { palette } = theme;

    return (
        <div
            className={styles.Container}
            style={{
                width          : size.total,
                backgroundColor: palette.semantic.foreground.secondary,
                bottom         : 0
            }}
        >
            {size.left_sticky && (
                <div
                    className={styles.Fixed}
                    style={{
                        width          : size.left_sticky,
                        backgroundColor: palette.semantic.foreground.secondary,
                        borderRight    : `4px solid ${palette.semantic.border.secondary}`
                    }}
                >
                    <div
                        className={styles.Row}
                        style={{
                            backgroundColor: palette.semantic.foreground.secondary
                        }}
                    >
                        {view &&
                            view.columns
                                .filter((col) => col.sticky)
                                .map((col) => (
                                    <TableFooterRow
                                        key={col.columnId}
                                        totals={totals}
                                        columns={columns}
                                        col={col}
                                        mode={palette.mode}
                                    />
                                ))}
                    </div>
                </div>
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
                        view.columns
                            .filter((col) => !col.sticky)
                            .map((col) => (
                                <TableFooterRow
                                    key={col.columnId}
                                    totals={totals}
                                    columns={columns}
                                    col={col}
                                    mode={palette.mode}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
}
