/* eslint-disable react/destructuring-assignment */
import { ColumnsConfig } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import moment from 'moment-timezone';
import AssignManifestCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Loads/CellItems/AssignManifestCell';
import UnAssignManifestCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Loads/CellItems/UnAssignManifestCell';
import { RetrieveSettlementReply_Manifest } from '@proto/settlements';
import ManifestStatusChipSelect from '@/@core/fields/chip-select/ManifestStatusChipSelect';
import React from 'react';
import CellWithMultipleLines from '@/@core/components/cell-with-multiple-lines/CellWithMultipleLines';
import { Stack } from '@mui/material';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import { LOAD_INVOICE_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { useEditSettlementContext } from '../../../EditSettlement';

function formatDate(inputDate: string | undefined) {
    if (!inputDate) return '';

    return moment(inputDate).format('MM/DD hh:mm A');
}

function StopsCell({ row }: { row: RetrieveSettlementReply_Manifest }) {
    const load = row.loads?.[0];
    const { refetch } = useEditSettlementContext();
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="space-between"
        >
            <span>
                {row.completedStopsCount}/{row.totalStopsCount}
            </span>
            {load && (
                <LoadInvoiceStatusChipSelect
                    invalidateFns={refetch}
                    load_id={load.loadId}
                    invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[load.invoiceStatus]}
                    size="small"
                />
            )}
        </Stack>
    );
}

function ManifestStatusChipSelectCell({ row }: { row: RetrieveSettlementReply_Manifest }) {
    const { refetch } = useEditSettlementContext();
    return (
        <ManifestStatusChipSelect
            manifestId={row.manifestId}
            status={row.status}
            is_changing
            onResponse={refetch}
        />
    );
}

const edit_loads_columns: ColumnsConfig<RetrieveSettlementReply_Manifest> = {
    getItems        : (settlement) => settlement.manifestsInfo?.manifests || [],
    withAssignRow   : true,
    assigned_columns: (item) => ({
        driver_pay: item.manifestsInfo?.totals?.assignedDriverNetAmount || '',
        gross     : item.manifestsInfo?.totals?.assignedGrossAmount || ''
    }),
    unassigned_columns: (item) => ({
        driver_pay: item.manifestsInfo?.totals?.unassignedDriverNetAmount || '',
        gross     : item.manifestsInfo?.totals?.unassignedGrossAmount || ''
    }),
    columns: [
        {
            minWidth      : 60,
            headerName    : '',
            field         : 'buttons',
            withEditButton: false,
            hasMaxWidth   : true,
            cellStyles    : { padding: 0 },
            renderCell    : (row) => {
                if (row.settlementId) {
                    return <UnAssignManifestCell manifestId={row.manifestId} />;
                }
                return <AssignManifestCell manifestId={row.manifestId} />;
            }
        },
        {
            minWidth      : 60,
            headerName    : 'common:id',
            field         : 'id',
            withEditButton: false,
            flex_start    : true,
            hasMaxWidth   : true,
            color         : 'secondary',
            renderCell    : (row) => row.friendlyId
        },
        {
            minWidth      : 140,
            headerName    : 'columns:origin',
            field         : 'origin',
            withEditButton: true,
            flex_start    : true,
            renderCell    : (row) => (
                <CellWithMultipleLines
                    info={`${row.origin?.city ?? '...'}, ${row.origin?.state ?? '...'}`}
                    subInfo={`${formatDate(row.origin?.appointmentStartAtLocal)}`}
                />
            )
        },
        {
            minWidth      : 140,
            headerName    : 'columns:destination',
            field         : 'destination',
            withEditButton: true,
            flex_start    : true,
            renderCell    : (row) => (
                <CellWithMultipleLines
                    info={`${row.destination?.city ?? '...'}, ${row.destination?.state ?? '...'}`}
                    subInfo={`${formatDate(row.destination?.appointmentStartAtLocal)}`}
                />
            )
        },
        {
            minWidth      : 400,
            headerName    : 'columns:stops',
            field         : 'stops',
            withEditButton: false,
            flex_start    : true,
            color         : 'secondary',
            renderCell    : (row) => <StopsCell row={row} />
        },
        {
            minWidth      : 100,
            headerName    : 'columns:miles',
            field         : 'miles',
            withEditButton: false,
            flex_start    : false,
            color         : 'secondary',
            renderCell    : (row) => row.totalDistance?.milesFormatted
        },
        {
            minWidth      : 140,
            headerName    : 'common:gross',
            field         : 'gross',
            withEditButton: false,
            flex_start    : false,
            renderCell    : (row) => row.gross?.amountFormatted
        },
        {
            minWidth      : 150,
            headerName    : 'columns:driver_pay',
            field         : 'driver_pay',
            withEditButton: false,
            flex_start    : false,
            padding_right : true,
            renderCell    : (row) => `${row.totalDriverPay?.amountFormatted}`
        },
        {
            minWidth      : 200,
            headerName    : 'common:status',
            field         : 'status',
            withEditButton: false,
            flex_start    : true,
            renderCell    : (row) => <ManifestStatusChipSelectCell row={row} />
        }
    ]
};

export default edit_loads_columns;
