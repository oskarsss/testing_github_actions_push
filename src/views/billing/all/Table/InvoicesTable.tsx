import { useCallback } from 'react';
import { updateFilters as _updateFilters } from '@/store/filters/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TableTypes from '@/@core/components/table/types';
import Table from '@/@core/components/table/Table';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useSelectedTableIds } from '@/store/table/hooks';
import DownloadIcon from '@mui/icons-material/Download';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { ConvertedGrpcInvoiceType, useAllInvoices } from '@/store/billing/hooks';
import { BillingActions } from '@/store/billing/slice';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import columns from './columns';
import { useBatchUpdateInvoiceStatusMenu } from '../../modals/BatchUpdateStatus';

type TablePropsType = TableTypes.TableProps<ConvertedGrpcInvoiceType, true>;

export default function InvoicesTable() {
    const tableName = 'allInvoices';
    const selectedItemsIds = useSelectedTableIds(tableName);
    const isFetching = useAppSelector(OrdersDataSelectors.getOrdersIsFetching);
    const dispatch = useAppDispatch();
    const changeStatusMenu = useBatchUpdateInvoiceStatusMenu();

    const handleChangeStatus = useCallback(
        (e: any) => {
            changeStatusMenu.open({ tableName })(e);
        },
        [changeStatusMenu]
    );

    const saveFile = useDownloadFile();
    const [batchDownload] = LoadsGrpcService.useBatchDownloadInvoiceMutation();
    const handleDownload = async () => {
        const res = await batchDownload({
            loadIds: selectedItemsIds
        }).unwrap();

        saveFile(res.fileId);
    };

    const {
        filterId,
        invoicesList,
        rows,
        headers,
        view,
        selectedFilters,
        updateColumnWidth,
        tableTotals,
        isLoading,
        invoices,
        rowsTotalCounts
    } = useAllInvoices();

    const updateFilters = useUpdateFilters({ filter_id: filterId });

    // eslint-disable-next-line consistent-return
    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name, props) => {
            switch (name) {
            case 'edit':
                dispatch(
                    BillingActions.SelectLoadId({
                        key   : 'all',
                        loadId: props.row.loadId
                    })
                );
                break;
            case 'document':
                dispatch(
                    BillingActions.SelectLoadId({
                        key   : 'all',
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
            pageType="BILLING_ALL"
            filter_id={filterId}
            onCreateItem={() => {}}
            tableName={tableName}
            defaultFilters={PAGES_FILTERS_CONFIG.BILLING.ALL.defaultFilters}
            rows={invoices}
            columns={columns}
            view={view}
            headers={headers}
            isLoading={isLoading}
            order={selectedFilters.order}
            orderBy={selectedFilters.orderBy}
            updateFilters={updateFilters}
            executeAction={executeAction}
            page={selectedFilters.page}
            per_page={selectedFilters.per_page}
            rows_total={rowsTotalCounts}
            pagination
            sticky_background_enabled={false}
            customRowHeight={65}
            isFetching={isFetching}
            onUpdateWidth={updateColumnWidth}
            totals={tableTotals}
            tableHeaderActionsConfig={{
                tableName,
                idsList: invoicesIdsList
            }}
            tableActionsConfig={{
                customActions: [
                    {
                        action : (e) => handleChangeStatus(e),
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

            // totals={total}
        />
    );
}
