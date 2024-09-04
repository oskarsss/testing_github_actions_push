import { useMainUsers } from '@/@grpcServices/services/users-service/hooks';
import { useEditUserDialog } from '@/views/settings/tabs/Members/dialogs/UserDialog/EditUserDialog';
import { GetUsersReply_User } from '@proto/users';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { columns } from '@/views/settings/tabs/Members/components/MembersTable/columns';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { Stack } from '@mui/material';
import Loading from '@/@core/components/page/Loading';
import MembersTablePagination from '@/views/settings/tabs/Members/components/MembersTable/MembersTablePagination';

export default function MembersTable() {
    const editUserDialog = useEditUserDialog();

    const {
        rows,
        isLoading,
        rows_total,
        selected_filters,
        filter_id
    } = useMainUsers();

    const executeAction: MiniTableExecuteActionType<GetUsersReply_User> = (name, props) => {
        editUserDialog.open({ user: props.row });
    };

    if (isLoading) {
        return (
            <Stack
                minHeight={500}
                position="relative"
            >
                <Loading />
            </Stack>
        );
    }

    return (
        <>
            <Stack overflow="hidden">
                <MiniTable
                    rows={rows}
                    elementKey="userId"
                    executeAction={executeAction}
                    columns={columns}
                    turnOffBorder
                    stickyHeader
                />
            </Stack>
            <MembersTablePagination
                filter_id={filter_id}
                rows_total={rows_total}
                per_page={selected_filters.per_page}
                page={selected_filters.page}
            />
        </>
    );
}
