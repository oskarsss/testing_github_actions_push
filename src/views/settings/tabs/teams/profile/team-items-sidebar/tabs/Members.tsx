import { Stack, createSvgIcon, Typography, Avatar } from '@mui/material';
import React, { useMemo } from 'react';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { useRolesMap, useUsersMap } from '@/store/hash_maps/hooks';
import { useConfirm } from '@/@core/components/confirm-dialog';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { GetUsersReply_User } from '@proto/users';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import common_table_styles from '@/views/settings/common_table_styles';
import { getPublicURL } from '@/configs/storage';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TabHeader from '../Header';
import { useAddMembersToTeamDialog } from '../../../dialogs/team-items/add-members';

const Icon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g opacity="0.3">
            <path
                d="M16 6C14.3431 6 13 7.34315 13 9C13 10.6569 14.3431 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6Z"
                fill="currentColor"
            />
            <path
                d="M16 13C15.0835 13 14.218 13.2169 13.4454 13.601C14.4177 14.8031 15.0001 16.3335 15.0001 18V20C15.0001 20.3643 14.9027 20.7058 14.7325 21H21C21.5523 21 22 20.5523 22 20V19C22 15.4781 19.2893 13 16 13Z"
                fill="currentColor"
            />
        </g>
        <path
            d="M4 7C4 4.79086 5.79086 3 8 3C10.2091 3 12 4.79086 12 7C12 9.20914 10.2091 11 8 11C5.79086 11 4 9.20914 4 7Z"
            fill="currentColor"
        />
        <path
            d="M2 18C2 14.6863 4.68629 12 8 12C11.3137 12 14 14.6863 14 18V20C14 20.5523 13.5523 21 13 21H3C2.44772 21 2 20.5523 2 20V18Z"
            fill="currentColor"
        />
    </svg>,
    'MembersIcon'
);

type Props = {
    teamId: string;
    users: string[];
};

const DriverCell = ({ row }: { row: GetUsersReply_User }) => {
    const { t } = useAppTranslation();
    const url = getPublicURL(row.selfieThumbUrl);
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
        >
            <Avatar
                src={url}
                sx={{
                    width : 24,
                    height: 24
                }}
                alt={`${row.firstName} ${row.lastName}`}
            />
            <Stack
                direction="column"
                maxHeight="24px"
            >
                <Typography
                    variant="body1"
                    fontSize="10px"
                    fontWeight={500}
                    lineHeight={1.25}
                    sx={{
                        color: ({ palette }) => palette.semantic.text.primary
                    }}
                >
                    {row.firstName} {row.lastName}
                </Typography>
                <Typography
                    fontSize="10px"
                    variant="body1"
                    lineHeight={1.25}
                    color="initial"
                    sx={{
                        color: ({ palette }) => palette.semantic.text.secondary
                    }}
                >
                    {row.email || t('settings:teams.profile.no_email')}
                </Typography>
            </Stack>
        </Stack>
    );
};

const RoleCell = ({ row }: { row: GetUsersReply_User }) => {
    const rolesMap = useRolesMap();
    const roleName = rolesMap[row.roleId]?.name || '';
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (
        <Typography
            fontSize="10px"
            fontWeight={500}
            variant="body1"
            sx={{
                color: ({ palette }) => palette.semantic.text.primary
            }}
        >
            {roleName}
        </Typography>
    );
};

const columns: MiniTableColumnType<GetUsersReply_User>[] = [
    {
        field     : 'member',
        headerName: 'settings:teams.profile.members.table.columns.member',
        minWidth  : 200,
        flex_start: true,
        renderCell: (row) => <DriverCell row={row} />
    },
    {
        field     : 'role',
        headerName: 'settings:teams.profile.members.table.columns.role',
        minWidth  : 200,
        flex_start: true,
        renderCell: (row) => <RoleCell row={row} />
    },
    {
        field      : 'delete',
        headerName : '',
        minWidth   : 60,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <ActionsSettingsTable.Delete />,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('delete', {
                row,
                event
            });
        }
    }
];

export default function Members({
    teamId,
    users
}: Props) {
    const dialog = useAddMembersToTeamDialog();
    const [deleteUser] = TeamsGrpcService.useDeleteTeamUserMutation();

    const usersMap = useUsersMap();

    const convertedUsers = useMemo(
        () =>
            users.reduce((acc, userId) => {
                const user = usersMap[userId];
                if (user) {
                    acc.push(user);
                }
                return acc;
            }, [] as GetUsersReply_User[]),
        [users, usersMap]
    );

    const confirm = useConfirm();

    const executeAction: MiniTableExecuteActionType<GetUsersReply_User> = (name, { row }) => {
        if (name === 'delete') {
            confirm({
                body              : 'settings:teams.dialog.delete.member.body',
                confirm_text      : 'common:button.delete',
                onConfirm         : () => deleteUser({ teamId, userId: row.userId }),
                title             : 'settings:teams.dialog.delete.member.title',
                translationOptions: {
                    body: {
                        firstName: row.firstName,
                        lastName : row.lastName
                    }
                }
            });
        }
    };

    const onClick = () => dialog.open({ teamId, existUsers: users });
    return (
        <Stack
            direction="column"
            gap={1}
            flex="1 1 100%"
            overflow="hidden"
        >
            <TabHeader
                Icon={<Icon color="primary" />}
                title="settings:teams.profile.members.header.title"
                onClick={onClick}
            />
            <MiniTable
                emptyStateText="common:empty.no_members"
                stickyHeader
                turnOffBorder
                columns={columns}
                elementKey="userId"
                rows={convertedUsers}
                executeAction={executeAction}
            />
        </Stack>
    );
}
