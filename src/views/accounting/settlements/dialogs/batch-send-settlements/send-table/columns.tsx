import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { SETTLEMENT_STATUS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import { SettlementSendBatchPreviewReply_Preview } from '@proto/settlements';
import { SettlementStatus } from '@/models/settlements/settlement-status';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Box } from '@mui/material';
import { custom_colors } from '@/@core/fields/chip-select/SettlementStatusChipSelect';
import DriverCell from './custom-cells/DriverCell';
import VendorCell from './custom-cells/VendorCell';
import Recipient from './custom-cells/Recipient';
import Email from './custom-cells/Email';
import Phone from './custom-cells/Phone';
import EditSettlementConfig from '../../edit-settlement/options';

export interface OverrideMiniTableColumnType<>extends Omit<
        MiniTableColumnType<SettlementSendBatchPreviewReply_Preview>,
        'renderCell'
    > {
    renderCell: (row: SettlementSendBatchPreviewReply_Preview, rowIndex: number) => React.ReactNode;
}

const SettlementStatusItem = ({ status }: { status: SettlementStatus }) => {
    const { t } = useAppTranslation();

    const optionConfig = EditSettlementConfig.statuses_options(t).find(
        (option) => option.value === status
    );

    return (
        <Box
            sx={{
                padding        : '4px 6px',
                borderRadius   : '4px',
                maxHeight      : '28px',
                display        : 'flex',
                alignItems     : 'center',
                justifyContent : 'center',
                width          : 'fit-content',
                backgroundColor: ({ palette }) => custom_colors[palette.mode][status].background,

                color: (theme) => custom_colors[theme.palette.mode][status].color
            }}
        >
            {optionConfig?.label()}
        </Box>
    );
};

const columns: OverrideMiniTableColumnType[] = [
    {
        field     : 'settlementId',
        headerName: 'modals:settlements.batch_send_settlements.table.titles.settlement_id',
        minWidth  : 40,
        flex_start: true,
        renderCell: ({ friendlyId }) => friendlyId
    },
    {
        field     : 'status',
        headerName: 'common:status',
        minWidth  : 140,
        flex_start: true,
        renderCell: ({ status }, _) => (
            <SettlementStatusItem status={SETTLEMENT_STATUS_GRPC_ENUM[status]} />
        )
    },
    {
        field     : 'driver',
        headerName: 'entity:driver',
        flex_start: true,
        minWidth  : 150,
        renderCell: ({ driverId }, rowIndex) => (
            <DriverCell
                rowIndex={rowIndex}
                driverId={driverId}
            />
        )
    },
    {
        field     : 'vendor',
        headerName: 'entity:vendor',
        flex_start: true,
        minWidth  : 150,
        renderCell: ({ vendorId }) => <VendorCell vendorId={vendorId} />
    },
    {
        field     : 'recipient',
        headerName: 'modals:settlements.batch_send_settlements.table.titles.recipient',
        flex_start: true,
        minWidth  : 150,
        renderCell: (row, rowIndex) => (
            <Recipient
                driverId={row.driverId}
                rowIndex={rowIndex}
            />
        )
    },
    {
        field     : 'toEmail',
        headerName: 'modals:settlements.batch_send_settlements.table.titles.to_email',
        minWidth  : 100,
        flex_start: true,
        renderCell: ({
            driverId,
            vendorId
        }, rowIndex) => (
            <Email
                rowIndex={rowIndex}
                driverId={driverId}
                vendorId={vendorId}
            />
        )
    },
    {
        field     : 'toPhone',
        headerName: 'modals:settlements.batch_send_settlements.table.titles.to_phone',
        minWidth  : 100,
        flex_start: true,
        renderCell: ({
            driverId,
            vendorId
        }, rowIndex) => (
            <Phone
                driverId={driverId}
                vendorId={vendorId}
                rowIndex={rowIndex}
            />
        )
    }
];

export default columns;
