import React, { useMemo } from 'react';
import { createSvgIcon, Stack, Typography } from '@mui/material';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import TrailersTypes from '@/store/fleet/trailers/types';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { useConfirm } from '@/@core/components/confirm-dialog';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import common_table_styles from '@/views/settings/common_table_styles';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import TabHeader from '../Header';
import { useAddTrailersToTeamDialog } from '../../../dialogs/team-items/add-trailers';

const Icon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
    >
        <path
            d="M7.51218 2.95H21.0122L21.0112 0.5C21.0112 0.367392 20.9585 0.240215 20.8647 0.146447C20.7708 0.0526785 20.6436 0 20.511 0L0.511037 0C0.378428 0 0.251272 0.0526785 0.15754 0.146447C0.0638082 0.240215 0.0111791 0.367392 0.0112305 0.5L0.015497 11.5C0.0155484 11.6326 0.0682762 11.7598 0.162081 11.8536C0.255885 11.9473 0.383083 12 0.515691 12H1.21569C1.411 11.5526 1.73255 11.172 2.14096 10.9047C2.54937 10.6374 3.02691 10.495 3.51511 10.495C4.0033 10.495 4.48096 10.6374 4.88958 10.9047C5.2982 11.172 5.62004 11.5526 5.81569 12C5.92187 12.3253 5.99569 12.6602 6.03608 13C6.06658 12.662 6.12668 12.3274 6.21569 12C6.40763 11.549 6.72794 11.1645 7.13677 10.8942C7.5456 10.6239 8.02491 10.4798 8.5151 10.4798C9.00529 10.4798 9.48472 10.6239 9.89376 10.8942C10.3028 11.1645 10.6234 11.549 10.8157 12C10.9519 12.3156 11.0202 12.6563 11.0161 13C11.0061 13.3442 10.9316 13.6834 10.7965 14H16.0165L16.0169 15C16.0169 15.1326 16.0696 15.2598 16.1634 15.3536C16.2572 15.4473 16.3844 15.5 16.5171 15.5C16.6497 15.5 16.7768 15.4473 16.8705 15.3536C16.9643 15.2598 17.0169 15.1326 17.0169 15L17.0165 14H20.5165C20.6491 14 20.7762 13.9473 20.87 13.8536C20.9637 13.7598 21.0163 13.6326 21.0163 13.5L21.0126 3.95H7.51257C7.37996 3.95 7.25276 3.89732 7.15896 3.80355C7.06515 3.70979 7.01243 3.58261 7.01238 3.45C7.01232 3.31739 7.06495 3.19022 7.15869 3.09645C7.25242 3.00268 7.37957 2.95 7.51218 2.95Z"
            fill="currentColor"
        />
        <path
            d="M4.0153 11C3.85207 10.9565 3.68416 10.9329 3.51527 10.93C3.16454 10.9304 2.82012 11.0229 2.51654 11.1985C2.21296 11.374 1.9609 11.6263 1.78566 11.93C1.60586 12.2323 1.5126 12.5782 1.51605 12.93C1.51625 13.4604 1.72716 13.9691 2.10238 14.3442C2.4776 14.7193 2.98639 14.93 3.51682 14.93C4.04725 14.93 4.55588 14.7193 4.93081 14.3442C5.30574 13.9691 5.51625 13.4604 5.51605 12.93C5.51922 12.5782 5.42569 12.2323 5.24566 11.93C5.11229 11.7013 4.93486 11.5013 4.72366 11.3417C4.51246 11.182 4.27169 11.0659 4.0153 11ZM3.51638 13.78C3.34826 13.78 3.1839 13.7301 3.04408 13.6367C2.90427 13.5434 2.79527 13.4106 2.73087 13.2553C2.66648 13.1 2.64958 12.9291 2.68231 12.7642C2.71505 12.5993 2.79594 12.4478 2.91477 12.329C3.0336 12.2101 3.18502 12.1291 3.3499 12.0963C3.51477 12.0635 3.68568 12.0804 3.84102 12.1447C3.99636 12.209 4.12916 12.318 4.22261 12.4578C4.31606 12.5975 4.36598 12.7619 4.36605 12.93C4.36613 13.1554 4.27666 13.3716 4.11732 13.531C3.95798 13.6904 3.74181 13.78 3.51638 13.78Z"
            fill="currentColor"
        />
        <path
            d="M8.51527 10.93C8.0595 10.9332 7.61855 11.0919 7.26545 11.38C7.06889 11.5359 6.90572 11.7297 6.78567 11.95C6.60587 12.2523 6.51261 12.5982 6.51605 12.95C6.52418 13.3834 6.67289 13.8025 6.9398 14.1442C7.20671 14.4858 7.57736 14.7316 7.99595 14.8444C8.41453 14.9572 8.85838 14.931 9.26067 14.7697C9.66296 14.6084 10.0019 14.3207 10.2264 13.95C10.4096 13.6481 10.5095 13.3031 10.5161 12.95C10.5192 12.5982 10.4257 12.2523 10.2457 11.95C10.0727 11.6425 9.82158 11.3862 9.51769 11.2071C9.21379 11.028 8.86797 10.9324 8.51527 10.93ZM8.51638 13.78C8.34826 13.78 8.1839 13.7301 8.04409 13.6367C7.90427 13.5434 7.79527 13.4106 7.73088 13.2553C7.66648 13.1 7.64958 12.9291 7.68231 12.7642C7.71505 12.5993 7.79594 12.4478 7.91477 12.329C8.0336 12.2101 8.18503 12.1291 8.3499 12.0963C8.51477 12.0635 8.68568 12.0804 8.84102 12.1447C8.99637 12.209 9.12916 12.318 9.22261 12.4578C9.31607 12.5975 9.36598 12.7619 9.36605 12.93C9.36613 13.1554 9.27666 13.3716 9.11732 13.531C8.95798 13.6904 8.74181 13.78 8.51638 13.78Z"
            fill="currentColor"
        />
    </svg>,
    'TrailersIcon'
);

type Props = {
    teamId: string;
    trailers: string[];
};

const TrailerCell = ({ row }: { row: TrailersTypes.TrailerRow }) => {
    const trailerTypesMap = useTrailersTypesMap();
    const trailerType = trailerTypesMap[row.trailerTypeId];
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
        >
            {getTrailerTypeIcon(trailerType?.icon)}
            <Stack>
                <Typography
                    variant="body1"
                    fontSize="10px"
                    lineHeight={1.25}
                    fontWeight={500}
                    sx={{
                        color: ({ palette }) => palette.semantic.text.primary
                    }}
                >
                    {row.referenceId}
                </Typography>
                <Typography
                    fontSize="10px"
                    variant="body1"
                    lineHeight={1.25}
                    sx={{
                        color: ({ palette }) => palette.semantic.text.secondary
                    }}
                >
                    {row.model}
                </Typography>
            </Stack>
        </Stack>
    );
};

const columns: MiniTableColumnType<TrailersTypes.TrailerRow>[] = [
    {
        field     : 'trailer',
        headerName: 'settings:teams.profile.trailers.table.columns.trailer',
        minWidth  : 200,
        flex_start: true,
        renderCell: (row) => <TrailerCell row={row} />
    },
    {
        field      : 'delete',
        headerName : '',
        minWidth   : 60,
        flex_start : false,
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

export default function TrailersTab({
    teamId,
    trailers
}: Props) {
    const dialog = useAddTrailersToTeamDialog();
    const trailersMap = useTrailersMap();
    const [deleteTrailer] = TeamsGrpcService.useDeleteTeamTrailerMutation();

    const confirm = useConfirm();

    const convertedTrailers = useMemo(
        () =>
            trailers.reduce((acc: TrailerModel_Trailer[], trailerId) => {
                const trailer = trailersMap[trailerId];
                if (trailer) {
                    acc.push(trailer);
                }
                return acc;
            }, []),
        [trailers, trailersMap]
    );

    const executeAction: MiniTableExecuteActionType<TrailerModel_Trailer> = (action, { row }) => {
        if (action === 'delete') {
            confirm({
                title    : 'settings:teams.dialog.delete.trailer.title',
                body     : 'settings:teams.dialog.delete.trailer.body',
                onConfirm: () => {
                    deleteTrailer({
                        teamId,
                        trailerId: row.trailerId
                    });
                },
                confirm_text: 'common:button.delete'
            });
        }
    };

    const onClick = () => {
        dialog.open({ teamId, existTrailers: trailers });
    };
    return (
        <Stack
            direction="column"
            gap={1}
            overflow="hidden"
        >
            <TabHeader
                Icon={<Icon color="primary" />}
                title="settings:teams.profile.trailers.header.title"
                onClick={onClick}
            />
            <MiniTable
                stickyHeader
                emptyStateText="common:empty.no_trailers"
                turnOffBorder
                columns={columns}
                elementKey="trailerId"
                rows={convertedTrailers}
                executeAction={executeAction}
            />
        </Stack>
    );
}
