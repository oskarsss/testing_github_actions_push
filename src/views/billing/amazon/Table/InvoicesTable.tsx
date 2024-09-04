import { MouseEvent, useCallback } from 'react';
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
    useAmazonInvoices
} from '@/store/billing/hooks';
import { BillingActions } from '@/store/billing/slice';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import columns from './columns';
import { useBatchUpdateInvoiceStatusMenu } from '../../modals/BatchUpdateStatus';

type TablePropsType = TableTypes.TableProps<ConvertedGrpcInvoiceType, true>;

export default function InvoicesTable() {
    const tableName = 'amazonInvoice';
    const selectedItemsIds = useSelectedTableIds(tableName);
    const isFetching = useAppSelector(OrdersDataSelectors.getOrdersIsFetching);

    const dispatch = useAppDispatch();

    const saveFile = useDownloadFile();
    const [batchDownload] = LoadsGrpcService.useBatchDownloadInvoiceMutation();
    const handleDownload = async () => {
        const res = await batchDownload({
            loadIds: selectedItemsIds
        }).unwrap();

        saveFile(res.fileId);
    };

    const changeStatusMenu = useBatchUpdateInvoiceStatusMenu();

    const handleChangeStatus = (e: any) => {
        changeStatusMenu.open({ tableName })(e);
    };

    const {
        selectedFilters: {
            page,
            per_page,
            orderBy,
            order
        },
        filterId,
        view,
        rows,
        rowsTotalCounts: total,
        invoices,
        isLoading,
        headers,
        updateColumnWidth,
        invoicesList,
        tableTotals
    } = useAmazonInvoices();

    const updateFilters = useUpdateFilters({ filter_id: filterId });

    // eslint-disable-next-line consistent-return
    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name, props) => {
            switch (name) {
            case 'edit':
                dispatch(
                    BillingActions.SelectLoadId({
                        loadId: props.row.loadId,
                        key   : 'amazon'
                    })
                );
                break;
            case 'document':
                dispatch(
                    BillingActions.SelectLoadId({
                        loadId: props.row.loadId,
                        key   : 'amazon'
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
            pageType="BILLING_AMAZON"
            filter_id={filterId}
            onCreateItem={() => {}}
            defaultFilters={PAGES_FILTERS_CONFIG.BILLING.AMAZON.defaultFilters}
            tableName={tableName}
            rows={invoices}
            columns={columns}
            view={view}
            headers={headers}
            isLoading={isLoading}
            order={order}
            isFetching={isFetching}
            orderBy={orderBy}
            updateFilters={updateFilters}
            executeAction={executeAction}
            page={page}
            per_page={per_page}
            rows_total={total}
            totals={tableTotals}
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
                        // eslint-disable-next-line max-len
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
                        action : () => {},
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
