import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadboardActions } from '@/store/loadboard/slice';
import { Table, TableBody, TableHead, useTheme } from '@mui/material';
import { useCallback, useRef, useState } from 'react';

import {
    loadboardSelectedLoadIdSelector,
    loadboardSelectedSearchIdSelectors,
    useLoadboardSelectedSearchResultsMap
} from '@/store/loadboard/selectors';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { useStableArray } from '@/hooks/useStable';
import TableHeader from './TableHeader';
import Load from './RenderedRow';
import { FormattedLoadboardRow } from './LoadboardTableContainer';

type Props = { rows: FormattedLoadboardRow[] };

export default function LoadboardTable({ rows }: Props) {
    const { palette } = useTheme();
    const searchId = useAppSelector(loadboardSelectedSearchIdSelectors);
    const viewedLoads = LoadboardGrpcService.useGetViewedSearchResultsQuery({ searchId });
    const viewedLoadsIds = useStableArray(viewedLoads.data?.resultIds);
    const { map } = useLoadboardSelectedSearchResultsMap();

    const [viewLoad] = LoadboardGrpcService.useViewLoadMutation();

    const selectedLoadId = useAppSelector(loadboardSelectedLoadIdSelector);

    const tableRef = useRef<HTMLTableElement | null>(null);

    const dispatch = useAppDispatch();

    const [focusedRowId, setFocusedRowId] = useState<string | null>(rows[0]?.resultId || null);

    const onClickRow = useCallback(
        (resultId: string) => {
            const integrationId = map[resultId]?.loadboard?.loadboardId;
            setFocusedRowId(resultId);
            dispatch(LoadboardActions.setSelectedLoadId({ loadId: resultId }));
            if (integrationId && !viewedLoadsIds.includes(resultId)) {
                viewLoad({ searchId, resultId, integrationId });
            }
        },
        [dispatch, map, searchId, viewLoad, viewedLoadsIds]
    );

    const handleKeyDown: React.KeyboardEventHandler<HTMLTableElement> = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            if (focusedRowId) {
                onClickRow(focusedRowId);
            }
            return;
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const currentIndex = rows.findIndex((el) => el.resultId === focusedRowId);
            const newIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;

            const newFocusedRowId = rows[newIndex]?.resultId;

            if (newFocusedRowId && newIndex >= 0 && newIndex < rows.length) {
                setFocusedRowId(newFocusedRowId);

                if (!tableRef.current) return;
                const focusedRow = tableRef.current.rows[newIndex];

                focusedRow.scrollIntoView({ behavior: 'instant', block: 'center' });
            }
        }
    };

    return (
        <Table
            ref={tableRef}
            onKeyDown={handleKeyDown}
            size="medium"
            stickyHeader
            tabIndex={0}
        >
            <TableHead
                style={{
                    backgroundColor: palette.semantic.foreground.white.primary
                }}
            >
                <TableHeader />
            </TableHead>

            <TableBody>
                {rows.slice(0, 200).map((row) => (
                    <Load
                        onClick={onClickRow}
                        key={row.resultId}
                        load={row}
                        isSelected={row.resultId === selectedLoadId}
                        isFocused={focusedRowId === row.resultId}
                        isViewed={viewedLoadsIds.includes(row.resultId)}
                    />
                ))}
            </TableBody>
        </Table>
    );
}
