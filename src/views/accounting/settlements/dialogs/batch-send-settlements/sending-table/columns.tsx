import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import StatusCell from './custom-cells/StatusCell';
import Recipient from './custom-cells/Recipient';
import type BatchSendSettlements from '../types';

const sending_columns: MiniTableColumnType<BatchSendSettlements.SendingItem>[] = [
    {
        field     : 'settlementId',
        headerName: 'modals:settlements.batch_send_settlements.table.titles.settlement_id',
        minWidth  : 40,
        flex_start: true,
        renderCell: ({ settlementFriendlyId }) => settlementFriendlyId
    },

    {
        field     : 'recipient',
        headerName: 'modals:settlements.batch_send_settlements.table.titles.recipient',
        flex_start: true,
        minWidth  : 150,
        renderCell: ({
            recipient,
            driverId,
            vendorId
        }) => (
            <Recipient
                driverId={driverId}
                recipient={recipient}
                vendorId={vendorId}
            />
        )
    },
    {
        field     : 'email',
        headerName: 'common:email',
        flex_start: true,
        minWidth  : 150,
        renderCell: ({ email }) => email
    },
    {
        field     : 'phone',
        headerName: 'common:phone',
        flex_start: true,
        minWidth  : 150,
        renderCell: ({ phoneNumber }) => phoneNumber
    },
    {
        field     : 'status',
        headerName: 'common:status',
        minWidth  : 140,
        flex_start: true,
        renderCell: ({
            status,
            ...row
        }) => (
            <StatusCell
                status={status}
                errorText={row.errorText}
            />
        )
    }
];

export default sending_columns;
