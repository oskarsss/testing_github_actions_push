import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { GetCustomerUsersReply_User } from '@proto/customers';
import React from 'react';
import columns from './columns';
import { useEditCustomerMemberDialog } from '../modals/UpdateCustomerMember';

type Props = {
    members: GetCustomerUsersReply_User[];
    customerId: string;
};

export default function MembersTable({
    members,
    customerId
}: Props) {
    const editDialog = useEditCustomerMemberDialog();
    const executeAction: MiniTableExecuteActionType<GetCustomerUsersReply_User> = (
        action,
        { row }
    ) => {
        editDialog.open({
            customerId,
            user  : row,
            userId: row.userId
        });
    };

    return (
        <MiniTable<GetCustomerUsersReply_User>
            columns={columns}
            elementKey="userId"
            executeAction={executeAction}
            rows={members}
        />
    );
}
