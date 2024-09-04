import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import common_table_styles from '@/views/settings/common_table_styles';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { TeamsGetReply_Team } from '@proto/teams';
import { getPublicURL } from '@/configs/storage';
import SYSTEM from '@/@system';
import UsersAvatarsGroup from '@/@core/components/avatars-group/users-avatars-group/UsersAvatarsGroup';
import DriversAvatarsGroup from '@/@core/components/avatars-group/drivers-avatars-group/DriversAvatarsGroup';

const { BotIcon } = SYSTEM.ASSETS;

const CompanyCell = ({ row }: { row: TeamsGetReply_Team }) => {
    const url = getPublicURL(row.logoUrl);
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1.5}
        >
            {row.logoUrl ? (
                <Avatar
                    src={url}
                    sx={{
                        width       : 24,
                        height      : 24,
                        borderRadius: '8px'
                    }}
                />
            ) : (
                <Box
                    sx={{
                        display   : 'flex',
                        alignItems: 'center',
                        svg       : {
                            borderRadius: '8px',
                            width       : '24px',
                            height      : '24px'
                        }
                    }}
                >
                    <BotIcon />
                </Box>
            )}
            <Typography
                variant="body1"
                fontSize="10px"
                fontWeight={500}
                lineHeight={1.25}
                sx={{
                    color: ({ palette }) => palette.semantic.text.primary
                }}
            >
                {row.name}
            </Typography>
        </Stack>
    );
};

const columns: MiniTableColumnType<TeamsGetReply_Team>[] = [
    {
        field     : 'title',
        headerName: 'settings:teams.table.columns.title',
        minWidth  : 150,
        flex_start: true,
        renderCell: (row) => <CompanyCell row={row} />,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('profile', {
                row,
                event
            });
        }
    },
    {
        field     : 'trailers',
        headerName: 'settings:teams.table.columns.trailers',
        minWidth  : 150,
        flex_start: true,
        renderCell: (row) => row.trailers.length || '-',
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('profile', {
                row,
                event
            });
        }
    },
    {
        field     : 'trucks',
        headerName: 'settings:teams.table.columns.trucks',
        minWidth  : 150,
        flex_start: true,
        renderCell: (row) => row.trucks.length || '-',
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('profile', {
                row,
                event
            });
        }
    },
    {
        field     : 'drivers',
        headerName: 'settings:teams.table.columns.drivers',
        minWidth  : 150,
        flex_start: true,
        renderCell: (row) => (
            <DriversAvatarsGroup
                driversIds={row.drivers}
                avatarStyles={{
                    fontSize: '10px',
                    width   : 24,
                    height  : 24
                }}
            />
        ),
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('profile', {
                row,
                event
            });
        }
    },
    {
        field     : 'members',
        headerName: 'settings:teams.table.columns.members',
        minWidth  : 150,
        flex_start: true,
        renderCell: (row) => (
            <UsersAvatarsGroup
                usersIds={row.users}
                avatarStyles={{
                    fontSize: '10px',
                    width   : 24,
                    height  : 24
                }}
            />
        ),
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('profile', {
                row,
                event
            });
        }
    },
    {
        field      : 'edit',
        headerName : '',
        minWidth   : 50,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => (!row.deleted ? <ActionsSettingsTable.Edit /> : null),
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        field      : 'delete',
        headerName : '',
        minWidth   : 60,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => (!row.deleted ? <ActionsSettingsTable.Delete /> : null),
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

export default columns;
