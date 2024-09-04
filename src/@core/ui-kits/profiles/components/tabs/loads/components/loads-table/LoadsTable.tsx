import { memo } from 'react';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { LoadData_Load } from '@proto/loads';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import {
    FilterType,
    PageType,
    useFleetLoadsQuery
} from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import TabTablePagination from '@/@core/ui-kits/profiles/components/tabs/reusable/TabTablePagination';
import columns from './columns';

type Props = {
    filterType: FilterType;
    entityId: string;
    page: PageType;
};

function LoadsTable({
    filterType,
    entityId,
    page
}: Props) {
    const editLoadDialog = useEditLoadDialog();
    const {
        rowsTotalCounts,
        filter_id,
        selected_filters,
        orders,
        isLoading
    } = useFleetLoadsQuery({
        filterType,
        entityId,
        page
    });

    const executeAction: MiniTableExecuteActionType<LoadData_Load> = (name, props) => {
        switch (name) {
        case 'edit':
            editLoadDialog.open({ load_id: props.row.loadId });
            break;
        default:
            break;
        }
    };

    if (isLoading) {
        return <Preloader sx={{ padding: '100px' }} />;
    }

    return (
        <>
            <MiniTable
                columns={columns}
                rows={orders}
                elementKey="loadId"
                executeAction={executeAction}
                emptyStateText="common:empty.no_load_assigned"
                stickyHeader
            />

            <TabTablePagination
                filter_id={filter_id}
                rows_total={rowsTotalCounts}
                page={selected_filters.page}
                per_page={selected_filters.per_page}
            />
        </>
    );
}

export default memo(LoadsTable);
