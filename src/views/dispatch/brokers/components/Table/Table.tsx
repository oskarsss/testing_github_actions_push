import { type MouseEvent, useCallback } from 'react';
import { default_broker_filters, useBrokers } from '@/store/dispatch/brokers/hooks';
import Table from '@/@core/components/table/Table';
import type BrokersTypes from '@/store/dispatch/brokers/types';
import { useEditBrokerDialog } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBroker';
import { useBrokerOptionsMenu } from '@/views/dispatch/brokers/menus/BrokerOptionsMenu';
import type TableTypes from '@/@core/components/table/types';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { useCreateBrokerDialog } from '@/views/dispatch/brokers/dialogs/create-broker/CreateBroker';
import navigateToPage from '@/utils/navigateToPage';
import openNewWindow from '@/utils/open-new-window';
import columns from './columns';

type TablePropsType = TableTypes.TableProps<BrokersTypes.BrokerRow, true>;
type ExecuteActionProps = {
    row: BrokersTypes.BrokerRow;
    event: MouseEvent<HTMLElement>;
    document_type_id?: string;
    document_entity_type?: string;
};

export default function BrokersTable() {
    const editBrokerDialog = useEditBrokerDialog();
    const createBrokerDialog = useCreateBrokerDialog();
    const brokerOptionsMenu = useBrokerOptionsMenu();

    const handleCreateBroker = useCallback(() => {
        createBrokerDialog.open({});
    }, [createBrokerDialog]);

    const {
        rows,
        headers,
        view,
        isLoading,
        rows_total,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = useBrokers();

    const updateFilters = useUpdateSearchFilters(default_broker_filters);

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, props: ExecuteActionProps) => {
            switch (name) {
            case 'document':
                editBrokerDialog.open({
                    brokerId   : props.row.brokerId,
                    document_id: props.document_type_id
                });
                break;
            case 'edit':
                switch (props.event.button) {
                case props.event.ctrlKey && 0:
                case props.event.metaKey && 0:
                    openNewWindow(`/dispatch/brokers/${props.row.brokerId}`, true);
                    break;
                case 0:
                    navigateToPage(`/dispatch/brokers/${props.row.brokerId}`, props.event);
                    break;
                case 2:
                    brokerOptionsMenu.open({
                        id: props.row.brokerId,
                        mc: props.row.mc
                    })(props.event);
                    break;
                default:
                    break;
                }
                break;
            default:
                break;
            }
        },
        []
    );

    return (
        <Table<BrokersTypes.BrokerRow, true>
            pageType="BROKERS"
            rows={rows}
            filter_id={filter_id}
            onCreateItem={handleCreateBroker}
            tableName="brokers"
            columns={columns}
            view={view}
            headers={headers}
            isLoading={isLoading}
            order={order}
            orderBy={orderBy}
            updateFilters={updateFilters}
            defaultFilters={PAGES_FILTERS_CONFIG.DISPATCH.BROKERS.defaultFilters}
            executeAction={executeAction}
            page={page}
            per_page={per_page}
            rows_total={rows_total}
            pagination
            onUpdateWidth={updateColumnWidth}
        />
    );
}
