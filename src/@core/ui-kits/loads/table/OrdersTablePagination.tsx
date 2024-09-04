import React, { memo, PropsWithChildren } from 'react';
import { Button, TablePagination, TablePaginationOwnProps } from '@mui/material';
import styles from './VUIKOrdersTable.module.scss';

type Props = PropsWithChildren & TablePaginationOwnProps;

export const OrdersTablePagination = memo(
    ({
        rowsPerPage,
        count,
        page,
        onPageChange,
        onRowsPerPageChange,
        rowsPerPageOptions,
        children
    }: Props) => (
        <div className={styles.ordersPaginationWrapper}>
            <div className={styles.ordersPaginationButtonWrapper}>{children}</div>
            <TablePagination
                className={styles.ordersPagination}
                rowsPerPageOptions={rowsPerPageOptions}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                    actions: {
                        nextButtonIcon: {
                            'aria-label': 'Next Page'
                        },
                        previousButtonIcon: {
                            'aria-label': 'Previous Page'
                        }
                    }
                }}
                component="div"
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </div>
    )
);
