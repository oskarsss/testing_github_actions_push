import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import type { BankAccountGetReply } from '@proto/bank_accounts';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import moment from 'moment-timezone';
import { getHiddenCardNumber } from './utils';

export type BankAccountData = BankAccountGetReply['bankAccounts'][number];

const columns: MiniTableColumnType<BankAccountData>[] = [
    {
        field      : 'bankName',
        headerName : 'settings:bank_accounts.table.columns.bank_name',
        minWidth   : 300,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => `${row.bankName}`
    },
    {
        field      : 'accountHolderName',
        headerName : 'settings:bank_accounts.table.columns.account_holder_name',
        minWidth   : 200,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => `${row.accountHolderName}`
    },
    {
        field      : 'routingNumber',
        headerName : 'settings:bank_accounts.table.columns.routing_number',
        minWidth   : 100,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => `${row.routingNumber}`
    },
    {
        field      : 'lastFour',
        headerName : 'settings:bank_accounts.table.columns.last_four',
        minWidth   : 150,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => getHiddenCardNumber(row.lastFour)
    },
    {
        field      : 'createdAt',
        headerName : 'settings:bank_accounts.table.columns.created_at',
        minWidth   : 100,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => moment(row.createdAt).format('MM/DD/YYYY')
    },
    {
        field      : 'delete',
        headerName : '',
        minWidth   : 40,
        maxWidth   : 40,
        styles     : { padding: 0, textAlign: 'center' },
        hasMaxWidth: true,
        renderCell : (row) => {
            if (row.deleted) {
                return <ActionsSettingsTable.Restore />;
            }

            return <ActionsSettingsTable.Delete />;
        },
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction(row.deleted ? 'restore' : 'delete', {
                row,
                event
            });
        }
    }
];

export default columns;
