import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import React from 'react';
import { GetBrokerUsersReply_User } from '@proto/brokers';
import columns from './columns';
import { useEditBrokerMemberDialog } from '../modals/UpdateBrokerMember';

type Props = {
    members: GetBrokerUsersReply_User[];
    brokerId: string;
};

export default function MembersTable({
    members,
    brokerId
}: Props) {
    const editDialog = useEditBrokerMemberDialog();
    const executeAction: MiniTableExecuteActionType<GetBrokerUsersReply_User> = (
        action,
        { row }
    ) => {
        editDialog.open({
            brokerId,
            user  : row,
            userId: row.userId
        });
    };

    return (
        <MiniTable<GetBrokerUsersReply_User>
            columns={columns}
            elementKey="userId"
            executeAction={executeAction}
            rows={members}
        />
    );
}
