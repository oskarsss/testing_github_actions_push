import React, { useMemo } from 'react';
import { Avatar, Stack, createSvgIcon, Typography } from '@mui/material';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import DriversTypes from '@/store/fleet/drivers/types';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import common_table_styles from '@/views/settings/common_table_styles';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import TabHeader from '../Header';
import { useAddDriverToTeamDialog } from '../../../dialogs/team-items/add-drivers';

const Icon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
    >
        <path
            d="M8.88699 15.61C9.19586 15.6108 9.50159 15.6719 9.78699 15.79L11.497 14.08C10.7576 13.4842 9.83657 13.1594 8.88699 13.1594C7.93742 13.1594 7.01642 13.4842 6.27699 14.08L7.98699 15.79C8.27209 15.6709 8.57803 15.6097 8.88699 15.61Z"
            fill="currentColor"
        />
        <path
            d="M8.887 0C8.03825 0.00395691 7.20966 0.259002 6.5056 0.733009C5.80155 1.20701 5.25351 1.87878 4.93054 2.66368C4.60756 3.44858 4.52409 4.31151 4.69065 5.14376C4.8572 5.97601 5.26632 6.74035 5.86648 7.34051C6.46664 7.94067 7.23099 8.3498 8.06324 8.51635C8.89549 8.6829 9.75842 8.59944 10.5433 8.27646C11.3282 7.95349 12 7.40545 12.474 6.70139C12.948 5.99733 13.203 5.16874 13.207 4.32C13.2044 3.17508 12.7484 2.0778 11.9388 1.26822C11.1292 0.458631 10.0319 0.00264113 8.887 0Z"
            fill="currentColor"
        />
        <path
            d="M16.747 11.78C16.6202 11.1099 16.3241 10.4834 15.887 9.96C15.5129 9.50794 15.044 9.1437 14.5135 8.89312C13.9829 8.64253 13.4037 8.51174 12.817 8.51H4.887C3.95326 8.51066 3.04917 8.83796 2.33139 9.43519C1.61362 10.0324 1.12741 10.8619 0.957 11.78L0.0169995 16.78C-0.0102704 16.926 -0.00467515 17.0762 0.0333794 17.2198C0.0714339 17.3634 0.140992 17.4967 0.236999 17.61C0.331022 17.7229 0.448762 17.8137 0.581846 17.8759C0.71493 17.9381 0.860089 17.9702 1.007 17.97H16.697C16.846 17.9727 16.9936 17.9421 17.1292 17.8804C17.2649 17.8188 17.385 17.7276 17.4808 17.6135C17.5767 17.4995 17.6458 17.3654 17.6832 17.2212C17.7206 17.077 17.7253 16.9263 17.697 16.78L16.747 11.78ZM13.057 16.99C12.9747 16.1872 12.6661 15.4242 12.167 14.79L10.517 16.45C10.601 16.6105 10.6456 16.7888 10.647 16.97H9.647C9.647 16.84 9.337 16.61 8.857 16.61C8.377 16.61 8.067 16.84 8.067 16.97H7.067C7.06839 16.7888 7.11295 16.6105 7.197 16.45L5.537 14.79C5.04104 15.4251 4.73584 16.1881 4.657 16.99H3.657C3.73911 15.6666 4.3227 14.4243 5.28887 13.5163C6.25503 12.6082 7.53107 12.1026 8.857 12.1026C10.1829 12.1026 11.459 12.6082 12.4251 13.5163C13.3913 14.4243 13.9749 15.6666 14.057 16.99H13.057Z"
            fill="currentColor"
        />
    </svg>,
    'DriversIcon'
);

type Props = {
    teamId: string;
    drivers: string[];
};

const DriverCell = ({ row }: { row: DriversTypes.DriverRow }) => {
    const { t } = useAppTranslation();
    const { url } = usePrivateFileUrl(row.selfieThumbUrl);
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
                    {`${row.firstName} ${row.lastName}`}
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

const columns: MiniTableColumnType<DriversTypes.DriverRow>[] = [
    {
        field     : 'driver',
        headerName: 'settings:teams.profile.drivers.table.columns.driver',
        minWidth  : 200,
        flex_start: true,
        renderCell: (row) => <DriverCell row={row} />
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

function DriversTab({
    teamId,
    drivers
}: Props) {
    const driversMap = useDriversMap();

    const [deleteDriver] = TeamsGrpcService.useDeleteTeamDriverMutation();
    const confirm = useConfirm();

    const convertedDrivers = useMemo(
        () =>
            drivers.reduce((acc: DriverModel_Driver[], driverId) => {
                const driver = driversMap[driverId];
                if (driver) {
                    acc.push(driver);
                }
                return acc;
            }, []),

        [drivers, driversMap]
    );

    const dialog = useAddDriverToTeamDialog();

    const executeAction: MiniTableExecuteActionType<DriverModel_Driver> = (name, { row }) => {
        if (name === 'delete') {
            confirm({
                body              : 'settings:teams.dialog.delete.driver.body',
                confirm_text      : 'common:button.delete',
                onConfirm         : () => deleteDriver({ teamId, driverId: row.driverId }),
                title             : 'settings:teams.dialog.delete.driver.title',
                translationOptions: {
                    body: {
                        fullName: `${row.firstName} ${row.lastName}`
                    }
                }
            });
        }
    };
    const onClick = () => {
        dialog.open({ teamId, existDrivers: drivers });
    };
    return (
        <Stack
            direction="column"
            gap={1}
            overflow="hidden"
        >
            <TabHeader
                Icon={<Icon color="primary" />}
                title="settings:teams.profile.drivers.header.title"
                onClick={onClick}
            />

            <MiniTable
                emptyStateText="common:empty.no_drivers"
                stickyHeader
                turnOffBorder
                columns={columns}
                elementKey="driverId"
                rows={convertedDrivers}
                executeAction={executeAction}
            />
        </Stack>
    );
}

export default DriversTab;
