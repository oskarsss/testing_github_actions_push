import { memo } from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';
import { GetLoadsRequest_SortBy } from '@proto/loads';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import {
    OrdersTableFetchingProgress,
    OrdersTableHeaderCell,
    OrdersTableHeaderRow
} from '@/@core/ui-kits/loads/table';
import loadsTableColumns from './columns/columns';
import styles from './OrdersTable.module.scss';

const {
    LATEST,
    OLDEST,
    SMART_DISPATCH,
    GROSS_AMOUNT_ASC,
    GROSS_AMOUNT_DESC,
    TRUCK_NUMBER_ASC,
    TRUCK_NUMBER_DESC,
    LOADED_MILES_DESC,
    LOADED_MILES_ASC,
    UNKNOWN
} = GetLoadsRequest_SortBy;

const sorting_directions: Record<GetLoadsRequest_SortBy, 'asc' | 'desc'> = {
    [TRUCK_NUMBER_DESC]: 'desc',
    [TRUCK_NUMBER_ASC] : 'asc',
    [GROSS_AMOUNT_DESC]: 'desc',
    [GROSS_AMOUNT_ASC] : 'asc',
    [LOADED_MILES_ASC] : 'asc',
    [LOADED_MILES_DESC]: 'desc',
    [SMART_DISPATCH]   : 'asc',
    [OLDEST]           : 'asc',
    [LATEST]           : 'desc',
    [UNKNOWN]          : 'asc'
};

const sorting_columns: Record<string, Record<'asc' | 'desc', GetLoadsRequest_SortBy>> = {
    truck: {
        asc : TRUCK_NUMBER_ASC,
        desc: TRUCK_NUMBER_DESC
    },
    total: {
        asc : GROSS_AMOUNT_ASC,
        desc: GROSS_AMOUNT_DESC
    },
    miles: {
        asc : LOADED_MILES_ASC,
        desc: LOADED_MILES_DESC
    },
    first_stop_appointment_start_at: {
        asc : OLDEST,
        desc: LATEST
    }
};

function checkSortable(field_name: string | undefined, sortBy: GetLoadsRequest_SortBy) {
    if (!field_name || !(field_name in sorting_columns)) {
        return {
            active   : false,
            direction: 'asc' as const
        };
    }
    return {
        active   : Object.values(sorting_columns[field_name]).includes(sortBy),
        direction: sorting_directions[sortBy]
    };
}

type Props = {
    isShowPreloader: boolean;
};

function LoadsTableHeaderRow({ isShowPreloader }: Props) {
    const {
        selected_filters,
        filter_id
    } = useOrdersPageFilters();
    const { t } = useAppTranslation();

    const { sortBy } = selected_filters;

    const updateFilters = useUpdateFilters({ filter_id });

    const onClick = (field_name?: string) => {
        if (!field_name || !(field_name in sorting_columns)) {
            return;
        }

        const {
            active,
            direction
        } = checkSortable(field_name, sortBy);

        const toggle_direction = direction === 'asc' ? 'desc' : 'asc';

        updateFilters({
            ...selected_filters,
            sortBy: sorting_columns[field_name][active ? toggle_direction : 'desc']
        });
    };

    return (
        <OrdersTableHeaderRow className={styles.rowGridTemplate}>
            {loadsTableColumns.map((column) => {
                const {
                    active,
                    direction
                } = checkSortable(column.field_name, sortBy);

                return (
                    <OrdersTableHeaderCell
                        key={`header_${column.field_name}`}
                        style={{
                            ...column.headerStyle,
                            cursor: column.sortable ? 'pointer' : 'default'
                        }}
                        onClick={() => onClick(column.field_name)}
                    >
                        {column.sortable ? (
                            <TableSortLabel
                                active={active}
                                direction={active ? direction : 'desc'}
                            >
                                <span>{t(column.header_name)}</span>
                            </TableSortLabel>
                        ) : (
                            <span>{t(column.header_name)}</span>
                        )}
                    </OrdersTableHeaderCell>
                );
            })}

            {isShowPreloader ? <OrdersTableFetchingProgress /> : null}
        </OrdersTableHeaderRow>
    );
}

export default memo(LoadsTableHeaderRow);
