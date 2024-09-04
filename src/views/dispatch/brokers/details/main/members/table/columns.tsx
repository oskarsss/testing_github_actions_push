import {
    MiniTableClickHandler,
    MiniTableColumnType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import SettingsCheckbox from '@/views/settings/components/SettingsCheckbox';
import { GetCustomerUsersReply_User } from '@proto/customers';
import { GetBrokerUsersReply_User } from '@proto/brokers';
import BrokerMembersStatusChip from './InviteStatusChip';

const generateExecuteFn: MiniTableClickHandler<GetBrokerUsersReply_User> = (
    row,
    {
        executeAction,
        event
    }
) => {
    executeAction('edit', { row, event });
};

const columns: MiniTableColumnType<GetBrokerUsersReply_User>[] = [
    {
        field     : 'userId',
        headerName: 'Name',
        minWidth  : 200,
        flex_start: true,
        renderCell: ({
            firstName,
            lastName
        }) => `${firstName} ${lastName}`
    },
    {
        field     : 'title',
        headerName: 'Title',
        minWidth  : 200,
        flex_start: true,
        renderCell: ({ title }) => title,
        onClick   : generateExecuteFn
    },
    {
        field     : 'email',
        headerName: 'Email',
        minWidth  : 100,
        flex_start: true,
        onClick   : generateExecuteFn,
        renderCell: ({ email }) => email
    },
    {
        field     : 'phone',
        headerName: 'Phone',
        minWidth  : 100,
        flex_start: true,
        onClick   : generateExecuteFn,
        renderCell: ({ phone }) => phone
    },
    {
        field     : 'secondStepAuthEnabled',
        headerName: '2FA',
        minWidth  : 50,
        flex_start: true,
        onClick   : generateExecuteFn,
        renderCell: ({ secondStepAuthEnabled }) => (
            <SettingsCheckbox checked={secondStepAuthEnabled} />
        )
    },

    {
        field     : 'status',
        headerName: 'Status',
        minWidth  : 100,
        flex_start: true,
        onClick   : generateExecuteFn,
        renderCell: ({ status }) => <BrokerMembersStatusChip status={status} />
    }
];

export default columns;
