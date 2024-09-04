/* eslint-disable max-len */
import { MouseEvent, useCallback } from 'react';
import { updateFilters as _updateFilters } from '@/store/filters/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TableTypes from '@/@core/components/table/types';
import Table from '@/@core/components/table/Table';
import IosShareIcon from '@mui/icons-material/IosShare';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useSelectedTableIds } from '@/store/table/hooks';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import {
    ConvertedGrpcInvoiceType,
    defaultInvoicesFilters,
    useFactoringInvoices
} from '@/store/billing/hooks';
import { BillingActions } from '@/store/billing/slice';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import columns from './columns';
import { useBatchUpdateInvoiceStatusMenu } from '../../modals/BatchUpdateStatus';
import { useBatchSendInvoicesDialog } from '../../modals/batch-send-invoices';

type TablePropsType = TableTypes.TableProps<ConvertedGrpcInvoiceType, true>;

export default function InvoicesTable() {
    const tableName = 'factoringInvoices';
    const selectedItemsIds = useSelectedTableIds(tableName);
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(OrdersDataSelectors.getOrdersIsFetching);
    const changeStatusMenu = useBatchUpdateInvoiceStatusMenu();
    const saveFile = useDownloadFile();
    const [batchDownload] = LoadsGrpcService.useBatchDownloadInvoiceMutation();
    const handleDownload = async () => {
        const res = await batchDownload({
            loadIds: selectedItemsIds
        }).unwrap();

        saveFile(res.fileId);
    };

    const handleChangeStatus = (e: any) => {
        changeStatusMenu.open({ tableName })(e);
    };
    const {
        view,
        rows,
        isLoading,
        headers,
        updateColumnWidth,
        invoicesList,
        filterId,
        selectedFilters,
        tableTotals,
        rowsTotalCounts,
        invoices
    } = useFactoringInvoices();

    const updateFilters = useUpdateFilters({ filter_id: filterId });

    // eslint-disable-next-line consistent-return
    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name, props) => {
            switch (name) {
            case 'edit':
                dispatch(
                    BillingActions.SelectLoadId({
                        key   : 'factoring',
                        loadId: props.row.loadId
                    })
                );
                break;
            case 'document':
                dispatch(
                    BillingActions.SelectLoadId({
                        key   : 'factoring',
                        loadId: props.row.loadId
                    })
                );
                break;
            default:
                break;
            }
        },
        [dispatch]
    );

    const invoicesIdsList = invoicesList.map((item) => item.loadId);

    return (
        <Table<ConvertedGrpcInvoiceType, true>
            pageType="BILLING_FACTORING"
            rows={invoices}
            columns={columns}
            filter_id={filterId}
            tableName="factoringInvoices"
            onCreateItem={() => {}}
            view={view}
            headers={headers}
            isLoading={isLoading}
            order={selectedFilters.order}
            orderBy={selectedFilters.orderBy}
            updateFilters={updateFilters}
            totals={tableTotals}
            executeAction={executeAction}
            defaultFilters={PAGES_FILTERS_CONFIG.BILLING.FACTORING.defaultFilters}
            page={selectedFilters.page}
            per_page={selectedFilters.per_page}
            rows_total={rowsTotalCounts}
            isFetching={isFetching}
            pagination
            sticky_background_enabled={false}
            customRowHeight={65}
            onUpdateWidth={updateColumnWidth}
            tableHeaderActionsConfig={{
                tableName,
                idsList: invoicesIdsList
            }}
            tableActionsConfig={{
                customActions: [
                    {
                        action : (event: MouseEvent<HTMLButtonElement>) => handleChangeStatus(event),
                        label  : 'Change invoice status to',
                        icon   : <ModeEditIcon />,
                        tooltip: 'Change invoice status for selected invoices'
                    },

                    // {
                    //     label  : 'billing:table.custom_action.export_csv.label',
                    //     action : () => {},
                    //     tooltip: 'billing:table.custom_action.export_csv.tooltip',
                    //     icon   : <IosShareIcon />
                    // },
                    {
                        label  : 'Download',
                        action : handleDownload,
                        tooltip: 'Download selected invoices',
                        icon   : <DownloadIcon />
                    }

                    // {
                    //     label  : 'common:button.send',
                    //     action : batchSendHandler,
                    //     tooltip: 'Send selected invoices',
                    //     icon   : <SendIcon />
                    // }
                ],
                totalSelected: selectedItemsIds.length
            }}
            setMultiSelect

            // totals={totals}
        />
    );
}
