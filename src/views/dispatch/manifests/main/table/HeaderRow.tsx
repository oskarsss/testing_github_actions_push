import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TableSortLabel from '@mui/material/TableSortLabel';
import { ManifestGetRequest_SortType } from '@proto/manifests';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import {
    OrdersTableFetchingProgress,
    OrdersTableHeaderCell,
    OrdersTableHeaderRow
} from '@/@core/ui-kits/loads/table';
import manifestsColumns from './columns';
import styles from './ManifestsTable.module.scss';

const {
    FIRST_STOP_APPOINTMENT_START_AT_ASC,
    FIRST_STOP_APPOINTMENT_START_AT_DESC,
    GROSS_AMOUNT_DESC,
    GROSS_AMOUNT_ASC,
    DISTANCE_DESC,
    DISTANCE_ASC,
    UNSPECIFIED,
    LOADED_MILES_ASC,
    LOADED_MILES_DESC,
    SMART_DISPATCH,
    TRUCK_NUMBER_ASC,
    TRUCK_NUMBER_DESC
} = ManifestGetRequest_SortType;

const sorting_directions: Record<ManifestGetRequest_SortType, 'asc' | 'desc'> = {
    [FIRST_STOP_APPOINTMENT_START_AT_DESC]: 'desc',
    [FIRST_STOP_APPOINTMENT_START_AT_ASC] : 'asc',
    [GROSS_AMOUNT_DESC]                   : 'desc',
    [GROSS_AMOUNT_ASC]                    : 'asc',
    [LOADED_MILES_ASC]                    : 'asc',
    [LOADED_MILES_DESC]                   : 'desc',
    [SMART_DISPATCH]                      : 'asc',
    [TRUCK_NUMBER_DESC]                   : 'desc',
    [TRUCK_NUMBER_ASC]                    : 'asc',
    [DISTANCE_DESC]                       : 'desc',
    [DISTANCE_ASC]                        : 'asc',
    [UNSPECIFIED]                         : 'asc'
};

const sorting_columns: Record<string, Record<'asc' | 'desc', ManifestGetRequest_SortType>> = {
    first_stop_appointment_start_at: {
        asc : FIRST_STOP_APPOINTMENT_START_AT_ASC,
        desc: FIRST_STOP_APPOINTMENT_START_AT_DESC
    },
    gross: {
        asc : GROSS_AMOUNT_ASC,
        desc: GROSS_AMOUNT_DESC
    },
    miles: {
        asc : DISTANCE_ASC,
        desc: DISTANCE_DESC
    }
};

function checkSortable(field_name: string | undefined, sortBy: ManifestGetRequest_SortType) {
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

function ManifestsTableHeaderRow({ isShowPreloader }: Props) {
    const { t } = useAppTranslation();

    const {
        selected_filters,
        filter_id
    } = useManifestsFilters();

    const updateFilters = useUpdateFilters({ filter_id });
    const { sortBy } = selected_filters;

    const onClickHeaderRow = (field_name?: string) => {
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
        <OrdersTableHeaderRow className={styles.row}>
            {manifestsColumns.map((column) => {
                const {
                    active,
                    direction
                } = checkSortable(column.field_name, sortBy);

                return (
                    <OrdersTableHeaderCell
                        key={`header_${column.field_name}`}
                        onClick={() => onClickHeaderRow(column.field_name)}
                        style={{
                            ...column.headerStyle,
                            cursor: column.sortable ? 'pointer' : 'default'
                        }}
                    >
                        {column.sortable ? (
                            <TableSortLabel
                                sx={{ width: '100%' }}
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

export default memo(ManifestsTableHeaderRow);
