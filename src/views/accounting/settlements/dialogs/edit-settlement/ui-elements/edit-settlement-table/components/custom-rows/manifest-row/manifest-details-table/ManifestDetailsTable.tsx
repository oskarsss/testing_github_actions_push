import SettlementsTypes from '@/store/accounting/settlements/types';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { React } from 'mdi-material-ui';
import TableBody from '@mui/material/TableBody';
import { uuidv4 } from '@/utils/uuidv4';
import { useMemo } from 'react';
import { LoadModel_InvoiceStatus, LoadModel_Status } from '@proto/models/model_load';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import EmptyDriverPayItemRow from '../components/EmptyDriverPayItemRow';
import Header from '../components/Header';
import CommonInfo from '../components/CommonInfo';
import LoadAndStops from '../components/LoadAndStops';
import PayItem from '../components/PayItem';
import EmptyLoadRow from '../components/EmptyLoadRow';

export type Load = {
    loadId: string;
    friendlyId: string;
    stopsCount: string;
    totalDistance: string;
    status: LoadModel_Status;
    invoiceStatus: LoadModel_InvoiceStatus;
    refId?: string;
} | null;

export type PayItems = {
    categoryId: string;
    units: string;
    rate: string;
    amount: string;
} | null;

export type PreparedListItem = {
    emptyMiles?: string;
    autoEmptyMiles?: string;
    loadedMiles?: string;
    autoLoadedMiles?: string;
    load: Load;
    payItem: PayItems;
    id: string;
};

type DriverPayItemProps = {
    row: SettlementsTypes.CycleSettlementDetails.Manifests;
};

export default function ManifestDetailsTable({ row }: DriverPayItemProps) {
    const driver_pay_items = row.driverPayItems;
    const { loads } = row;
    const { t } = useAppTranslation();
    const preparedList: PreparedListItem[] = useMemo(() => {
        const newArrLength = Math.max(driver_pay_items.length, loads.length);

        return [...Array(newArrLength)].map((_, i) => {
            const emptyMiles = i === 0 ? row.emptyDistance?.milesFormatted : '';
            const loadedMiles = i === 0 ? row.loadedDistance?.milesFormatted : '';
            const autoEmptyMiles = i === 0 ? row.autoEmptyDistance?.milesFormatted : '';
            const autoLoadedMiles = i === 0 ? row.autoLoadedDistance?.milesFormatted : '';
            const driverPayItem = driver_pay_items[i];
            const load = loads[i];

            const id = uuidv4();

            return {
                emptyMiles,
                loadedMiles,
                autoEmptyMiles,
                autoLoadedMiles,
                load: load
                    ? {
                        loadId       : load.loadId,
                        friendlyId   : load.friendlyId.toString() || '',
                        stopsCount   : load.stopsCount.toString() || '',
                        totalDistance: load.totalDistance?.milesFormatted || '',
                        status       : load.status,
                        invoiceStatus: load.invoiceStatus,
                        refId        : load.referenceId
                    }
                    : null,
                payItem: driverPayItem
                    ? {
                        categoryId: driverPayItem?.categoryId || '',
                        units     : driverPayItem?.units.toString() || '',
                        amount    : driverPayItem?.totalAmount?.amountFormatted || '',
                        rate      : driverPayItem?.amountPerUnitFormatted || ''
                    }
                    : null,
                id
            };
        });
    }, [driver_pay_items, loads, row]);

    return (
        <MiniTableStyled.CommonTable sx={{ borderCollapse: 'separate' }}>
            <Header />

            <TableBody
                sx={{
                    td: {
                        paddingTop   : '0px !important',
                        paddingBottom: '0px !important'
                    }
                }}
            >
                {preparedList.map((item, i) => (
                    <MiniTableStyled.Row
                        key={item.id}
                        row_size="normal"
                    >
                        <CommonInfo item={item} />

                        {i === 0 && !item.load ? (
                            <EmptyLoadRow />
                        ) : (
                            <LoadAndStops
                                settlementId={row.settlementId}
                                load={item.load}
                            />
                        )}

                        {i === 0 && !item.payItem ? (
                            <EmptyDriverPayItemRow />
                        ) : (
                            <PayItem item={item.payItem} />
                        )}
                        {/* 
                        <MiniTableStyled.Cell
                            flex_start
                            min_width={manifestDetailsColumns.statuse}
                            hasMaxWidth
                        >
                            {item.load && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Tooltip
                                        title={t(
                                            `state_info:loads.status.${
                                                LOAD_STATUS_GRPC_ENUM[item.load.status]
                                            }`
                                        )}
                                        placement="top"
                                    >
                                        <span>
                                            <LoadStatusChipSelect
                                                load_id={item.load.loadId}
                                                is_changing={false}
                                                size="small"
                                                load_status={
                                                    LOAD_STATUS_GRPC_ENUM[item.load.status]
                                                }
                                            />
                                        </span>
                                    </Tooltip>
                                    <Tooltip
                                        title={t(
                                            `state_info:loads.invoice_status.${
                                                LOAD_INVOICE_STATUS_GRPC_ENUM[
                                                    item.load.invoiceStatus
                                                ]
                                            }`
                                        )}
                                        placement="top"
                                    >
                                        <span>
                                            <LoadInvoiceStatusChipSelect
                                                load_id={item.load.loadId}
                                                is_changing={false}
                                                size="small"
                                                invoice_status={
                                                    LOAD_INVOICE_STATUS_GRPC_ENUM[
                                                        item.load.invoiceStatus
                                                    ]
                                                }
                                            />
                                        </span>
                                    </Tooltip>
                                </Stack>
                            )}
                        </MiniTableStyled.Cell> */}
                    </MiniTableStyled.Row>
                ))}
            </TableBody>
        </MiniTableStyled.CommonTable>
    );
}
