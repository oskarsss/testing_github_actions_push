/* eslint-disable max-len */
import { MouseEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TableTypes from '@/@core/components/table/types';
import Table from '@/@core/components/table/Table';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useSelectedTableIds } from '@/store/table/hooks';
import { ConvertedGrpcInvoiceType, useDirectInvoices } from '@/store/billing/hooks';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { BillingActions } from '@/store/billing/slice';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import columns from './columns';
import { useBatchUpdateInvoiceStatusMenu } from '../../modals/BatchUpdateStatus';
import { useBatchSendInvoicesDialog } from '../../modals/batch-send-invoices';

type TablePropsType = TableTypes.TableProps<ConvertedGrpcInvoiceType, true>;

export default function InvoicesTable() {
    const tableName = 'directInvoices';
    const selectedItemsIds = useSelectedTableIds(tableName);
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(OrdersDataSelectors.getOrdersIsFetching);

    const changeStatusMenu = useBatchUpdateInvoiceStatusMenu();

    const batchSendDialog = useBatchSendInvoicesDialog();
    const batchSendHandler = () => batchSendDialog.open({ tableName });

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
        invoices,
        tableTotals,
        rowsTotalCounts
    } = useDirectInvoices();

    const updateFilters = useUpdateFilters({ filter_id: filterId });

    // eslint-disable-next-line consistent-return
    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name, props) => {
            switch (name) {
            case 'edit':
                dispatch(
                    BillingActions.SelectLoadId({ loadId: props.row.loadId, key: 'direct' })
                );
                break;
            case 'document':
                dispatch(
                    BillingActions.SelectLoadId({ loadId: props.row.loadId, key: 'direct' })
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
            pageType="BILLING_DIRECT"
            rows={invoices}
            columns={columns}
            filter_id={filterId}
            onCreateItem={() => {}}
            tableName={tableName}
            view={view}
            isFetching={isFetching}
            headers={headers}
            isLoading={isLoading}
            order={selectedFilters.order}
            orderBy={selectedFilters.orderBy}
            totals={tableTotals}
            updateFilters={updateFilters}
            defaultFilters={PAGES_FILTERS_CONFIG.BILLING.DIRECT.defaultFilters}
            executeAction={executeAction}
            page={selectedFilters.page}
            per_page={selectedFilters.per_page}
            rows_total={rowsTotalCounts}
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
                    },
                    {
                        label  : 'common:button.send',
                        action : batchSendHandler,
                        tooltip: 'Send selected invoices',
                        icon   : <SendIcon />
                    }
                ],
                totalSelected: selectedItemsIds.length
            }}
            setMultiSelect

            // totals={totals}
        />
    );
}
