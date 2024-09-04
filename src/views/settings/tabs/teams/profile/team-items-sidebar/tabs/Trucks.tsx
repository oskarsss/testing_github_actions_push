import React, { useMemo } from 'react';
import { Stack, Typography, createSvgIcon } from '@mui/material';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';

// import { useTrucksMap } from '@/store/data-storage/trucks/hooks/common';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import common_table_styles from '@/views/settings/common_table_styles';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useAddTrucksToTeamDialog } from '../../../dialogs/team-items/add-trucks';
import TabHeader from '../Header';

const Icon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M16.3678 6.75016L16.3684 8.38516C16.3686 8.67557 16.484 8.95408 16.6895 9.15944C16.8949 9.36479 17.1735 9.48016 17.4639 9.48016H20.2539L18.8651 6.18766H16.9151C16.8419 6.18763 16.7695 6.20227 16.7021 6.23072C16.6347 6.25917 16.5736 6.30084 16.5226 6.35328C16.4716 6.40572 16.4316 6.46786 16.405 6.53603C16.3784 6.60419 16.3658 6.677 16.3678 6.75016Z"
            fill="currentColor"
        />
        <path
            d="M22.7 12.5177L20.7868 10.6052C20.7843 10.5877 20.7843 10.5701 20.7868 10.5527H17.4643C16.8854 10.5527 16.3302 10.3227 15.9208 9.91342C15.5113 9.50412 15.2812 8.94899 15.2809 8.37016L15.2803 6.75016C15.2772 6.53391 15.3173 6.31924 15.3981 6.11868C15.479 5.91813 15.599 5.73571 15.7511 5.58209C15.9033 5.42847 16.0846 5.30673 16.2843 5.22398C16.4841 5.14123 16.6984 5.09914 16.9147 5.10016H18.4147L17.664 3.36766C17.6065 3.23209 17.5104 3.11643 17.3877 3.03507C17.265 2.95372 17.121 2.91028 16.9738 2.91016H12.3763C12.2775 2.91208 12.1832 2.9522 12.1133 3.02212C12.0434 3.09203 12.0033 3.1863 12.0015 3.28516L12.0053 13.2452C12.0054 13.3446 11.9659 13.44 11.8956 13.5103C11.8253 13.5806 11.7299 13.6202 11.6305 13.6202H1.50547C1.40601 13.6202 1.31065 13.6597 1.24035 13.73C1.17005 13.8003 1.13058 13.8957 1.13062 13.9952L1.1321 17.8202C1.13214 17.9196 1.17168 18.015 1.24204 18.0853C1.31239 18.1556 1.40779 18.1952 1.50724 18.1952H2.25724C2.2374 17.8141 2.2953 17.433 2.42742 17.0751C2.55954 16.7172 2.76312 16.3899 3.02576 16.1132C3.28841 15.8366 3.60463 15.6162 3.95518 15.4657C4.30573 15.3151 4.68328 15.2375 5.06485 15.2375C5.44642 15.2375 5.82402 15.3151 6.17469 15.4657C6.52536 15.6162 6.84175 15.8366 7.10461 16.1132C7.36747 16.3899 7.5713 16.7172 7.7037 17.0751C7.8361 17.433 7.89429 17.8141 7.87474 18.1952H8.25724C8.25696 17.4512 8.55221 16.7378 9.07804 16.2117C9.60388 15.6857 10.3172 15.3902 11.0612 15.3902C11.8051 15.3902 12.5187 15.6857 13.0449 16.2117C13.5712 16.7378 13.867 17.4512 13.8672 18.1952H15.7572C15.757 17.4512 16.0522 16.7378 16.578 16.2117C17.1039 15.6857 17.8172 15.3902 18.5612 15.3902C19.3051 15.3902 20.0187 15.6857 20.5449 16.2117C21.0712 16.7378 21.367 17.4512 21.3672 18.1952H22.1697C22.3687 18.1952 22.5594 18.1161 22.7 17.9755C22.8406 17.8348 22.9195 17.6441 22.9195 17.4452L22.9177 13.0502C22.9183 12.9514 22.8993 12.8536 22.862 12.7622C22.8246 12.6708 22.7696 12.5877 22.7 12.5177Z"
            fill="currentColor"
        />
        <path
            d="M4.98656 16.4252C4.75447 16.4252 4.52469 16.471 4.31039 16.56C4.0961 16.6491 3.90152 16.7796 3.73782 16.944C3.57413 17.1085 3.44453 17.3037 3.35649 17.5184C3.26844 17.7331 3.22367 17.9631 3.22474 18.1952C3.25416 18.6437 3.45313 19.0643 3.78127 19.3717C4.10941 19.679 4.54214 19.85 4.99164 19.85C5.44114 19.85 5.87373 19.679 6.20163 19.3717C6.52953 19.0643 6.72817 18.6437 6.75725 18.1952C6.75715 17.9627 6.71128 17.7326 6.62225 17.5178C6.53321 17.3031 6.40276 17.1079 6.23834 16.9436C6.07392 16.7792 5.87874 16.6488 5.66396 16.5599C5.44918 16.4709 5.219 16.4252 4.98656 16.4252ZM5.89474 18.1952C5.87427 18.4206 5.77024 18.6303 5.60309 18.7829C5.43594 18.9356 5.21773 19.0202 4.99131 19.0202C4.7649 19.0202 4.54663 18.9356 4.37935 18.7829C4.21208 18.6303 4.10789 18.4206 4.08724 18.1952C4.07574 18.0696 4.09055 17.9429 4.13071 17.8234C4.17088 17.7039 4.23552 17.594 4.32052 17.5009C4.40552 17.4077 4.50901 17.3333 4.62439 17.2824C4.73976 17.2315 4.86449 17.2052 4.99061 17.2052C5.11673 17.2052 5.24148 17.2315 5.3569 17.2824C5.47231 17.3333 5.57586 17.4077 5.66093 17.5009C5.746 17.594 5.81073 17.7039 5.85099 17.8234C5.89125 17.9429 5.90615 18.0696 5.89474 18.1952Z"
            fill="currentColor"
        />
        <path
            d="M11.0616 16.4252C10.5921 16.4252 10.142 16.6116 9.81018 16.9436C9.47837 17.2755 9.29206 17.7257 9.29224 18.1952C9.29243 18.6646 9.47908 19.1148 9.81115 19.4467C10.1432 19.7787 10.5935 19.9652 11.0629 19.9652C11.5324 19.9652 11.9825 19.7787 12.3143 19.4467C12.6461 19.1148 12.8324 18.6646 12.8322 18.1952C12.8322 17.9627 12.7863 17.7326 12.6972 17.5178C12.6082 17.3031 12.4778 17.1079 12.3133 16.9436C12.1489 16.7792 11.9537 16.6488 11.739 16.5599C11.5242 16.4709 11.294 16.4252 11.0616 16.4252ZM12.0072 18.1952C12.0073 18.4358 11.9118 18.6667 11.7417 18.8369C11.5716 19.007 11.3408 19.1027 11.1001 19.1027C10.8594 19.1027 10.6285 19.007 10.4583 18.8369C10.288 18.6667 10.1923 18.4358 10.1922 18.1952C10.1922 17.9545 10.2877 17.7236 10.4578 17.5535C10.6279 17.3833 10.8587 17.2877 11.0994 17.2877C11.3401 17.2877 11.5709 17.3833 11.7412 17.5535C11.9115 17.7236 12.0072 17.9545 12.0072 18.1952Z"
            fill="currentColor"
        />
        <path
            d="M18.5616 16.4252C18.0921 16.4252 17.642 16.6116 17.3102 16.9436C16.9784 17.2755 16.7921 17.7257 16.7922 18.1952C16.7924 18.6646 16.9791 19.1148 17.3112 19.4467C17.6432 19.7787 18.0935 19.9652 18.5629 19.9652C19.0324 19.9652 19.4825 19.7787 19.8143 19.4467C20.1461 19.1148 20.3324 18.6646 20.3322 18.1952C20.3321 17.7257 20.1454 17.2755 19.8133 16.9436C19.4813 16.6116 19.031 16.4252 18.5616 16.4252ZM19.5072 18.1952C19.5073 18.4358 19.4118 18.6667 19.2417 18.8369C19.0716 19.007 18.8408 19.1027 18.6001 19.1027C18.3594 19.1027 18.1285 19.007 17.9583 18.8369C17.788 18.6667 17.6923 18.4358 17.6922 18.1952C17.6922 17.9545 17.7877 17.7236 17.9578 17.5535C18.1279 17.3833 18.3587 17.2877 18.5994 17.2877C18.8401 17.2877 19.0709 17.3833 19.2412 17.5535C19.4115 17.7236 19.5072 17.9545 19.5072 18.1952Z"
            fill="currentColor"
        />
    </svg>,
    'TrucksIcon'
);

type Props = {
    teamId: string;
    trucks: string[];
};

const TruckCell = ({ row }: { row: TruckModel_Truck }) => (
    <Stack
        direction="row"
        alignItems="center"
        gap={1}
    >
        {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.type]]}
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
                color="initial"
                sx={{
                    color: ({ palette }) => palette.semantic.text.secondary
                }}
            >
                {row.model}
            </Typography>
        </Stack>
    </Stack>
);

const columns: MiniTableColumnType<TruckModel_Truck>[] = [
    {
        field     : 'truck',
        headerName: 'settings:teams.profile.trucks.table.columns.truck',
        minWidth  : 200,
        flex_start: true,
        renderCell: (row) => <TruckCell row={row} />
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

export default function TrucksTab({
    teamId,
    trucks
}: Props) {
    const dialog = useAddTrucksToTeamDialog();
    const trucksMap = useTrucksMap();
    const [deleteTruck] = TeamsGrpcService.useDeleteTeamTruckMutation();
    const confirm = useConfirm();
    const executeAction: MiniTableExecuteActionType<TruckModel_Truck> = (action, { row }) => {
        if (action === 'delete') {
            confirm({
                title       : 'settings:teams.dialog.delete.truck.title',
                body        : 'settings:teams.dialog.delete.truck.body',
                onConfirm   : () => deleteTruck({ teamId, truckId: row.truckId }),
                confirm_text: 'common:button.delete'
            });
        }
    };
    const convertedTrucks = useMemo(
        () =>
            trucks.reduce((acc: TruckModel_Truck[], truckId) => {
                const truck = trucksMap[truckId];
                if (truck) {
                    acc.push(truck);
                }
                return acc;
            }, []),
        [trucks, trucksMap]
    );

    const onClick = () => dialog.open({ teamId, existTrucks: trucks });

    return (
        <Stack
            direction="column"
            gap={1}
            overflow="hidden"
        >
            <TabHeader
                Icon={<Icon color="primary" />}
                title="settings:teams.profile.trucks.header.title"
                onClick={onClick}
            />
            <MiniTable
                stickyHeader
                emptyStateText="common:empty.no_trucks"
                turnOffBorder
                columns={columns}
                elementKey="truckId"
                rows={convertedTrucks}
                executeAction={executeAction}
            />
        </Stack>
    );
}
