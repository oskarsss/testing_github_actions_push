import React, { useCallback, useMemo } from 'react';
import { ExtractData } from '@/store/import/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Import from '@/store/import/types';
import { ImportActions } from '@/store/import/slice';
import HeaderCell from './HeaderCell';
import { Header, WrapRegularHead, WrapStickyHead } from './styled';
import { ImportResult_Column } from '../../../../../../proto_data/ts/v1/import';

type Props = {
    columns: ExtractData['data']['columns'];
};
export default function TableHead({ columns }: Props) {
    const {
        order,
        orderBy
    } = useAppSelector((state) => state.import.filter);
    const dispatch = useAppDispatch();

    const createSortHandler = useCallback(
        (column_id: string) => {
            const isDesc = orderBy === column_id && order === 'desc';
            const filter: Import.Filter = {
                order  : isDesc ? 'asc' : 'desc',
                orderBy: column_id
            };
            dispatch(ImportActions.UpdateFilters(filter));
        },
        [dispatch, order, orderBy]
    );

    const {
        sticky_columns,
        regular_columns
    } = useMemo(() => {
        const sticky_columns: ImportResult_Column[] = [];
        const regular_columns: ImportResult_Column[] = [];
        Object.values(columns).forEach((column) => {
            if (column.sticky) {
                sticky_columns.push(column);
            } else {
                regular_columns.push(column);
            }
        });
        sticky_columns.sort((a, b) => a.position - b.position);
        regular_columns.sort((a, b) => a.position - b.position);
        return {
            sticky_columns,
            regular_columns
        };
    }, [columns]);

    return (
        <Header>
            {sticky_columns.length > 0 && (
                <WrapStickyHead>
                    {sticky_columns.map((column) => (
                        <HeaderCell
                            key={column.id}
                            title={column.name}
                            width={column.width}
                            onClick={() => createSortHandler(column.id)}
                            sort_active={orderBy === column.id}
                            order={order}
                        />
                    ))}
                </WrapStickyHead>
            )}
            <WrapRegularHead>
                {regular_columns.map((column) => (
                    <HeaderCell
                        key={column.id}
                        title={column.name}
                        width={column.width}
                        onClick={() => createSortHandler(column.id)}
                        sort_active={orderBy === column.id}
                        order={order}
                    />
                ))}
            </WrapRegularHead>
        </Header>
    );
}
