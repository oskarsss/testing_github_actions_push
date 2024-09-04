/* eslint-disable max-len */
import moment from 'moment-timezone';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { Box, Tooltip, Typography } from '@mui/material';
import { ManifestModel_LoadStop_Status, ManifestModel_Stop } from '@proto/models/model_manifest';
import {
    MANIFEST_LOAD_STOP_ICONS,
    MANIFEST_LOAD_STOP_STATUS_COLORS
} from '@/@core/theme/entities/manifests/stop-status';
import { LOAD_STOP_TYPE_COLORS, LOAD_STOP_TYPE_ICONS } from '@/@core/theme/entities/load/stop_type';
import { LoadStopTypes } from '@/models/loads/load-stop';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import { useTranslation } from 'react-i18next';
import ManifestStopStatusChipSelect from '@/@core/fields/chip-select/ManifestStopStatusChipSelect';
import ManifestLoadStopStatusChipSelect from '@/@core/fields/chip-select/ManifestLoadStopStatusChipSelect';
import { LOAD_STOP_TYPE_GRPC_ENUM } from '@/models/loads/load-mappings';

function ManifestStopType({ loadStopType }: { loadStopType: LoadModel_Stop_Type }) {
    const { t } = useAppTranslation();
    return (
        <Tooltip
            placement="top"
            title={t(`state_info:stop.type.${LOAD_STOP_TYPE_GRPC_ENUM[loadStopType]}`)}
        >
            <Box
                sx={{
                    display: 'flex',
                    svg    : {
                        width : '16px',
                        height: '16px',
                        color : (theme) =>
                            theme.palette.utility.foreground[
                                LOAD_STOP_TYPE_COLORS[LoadStopTypes[loadStopType]]
                            ]?.primary
                    }
                }}
            >
                {LOAD_STOP_TYPE_ICONS[LoadStopTypes[loadStopType]]}
            </Box>
        </Tooltip>
    );
}

function ManifestStopStatus({ loadStopStatus }: { loadStopStatus: ManifestModel_LoadStop_Status }) {
    const { t } = useTranslation();
    return (
        <Tooltip
            placement="top"
            title={t(`state_info:stop.manifest_stop_status.${loadStopStatus}`)}
        >
            {/* <Box
                sx={{
                    maxHeight      : '25px',
                    display        : 'flex',
                    alignItems     : 'center',
                    borderRadius   : '4px',
                    maxWidth       : 'fit-content',
                    backgroundColor: (theme) =>
                        theme.palette.utility.foreground[
                            MANIFEST_LOAD_STOP_STATUS_COLORS[loadStopStatus]
                        ].secondary,
                    padding: '2px 6px',
                    svg    : {
                        width : '16px',
                        height: '16px'
                    }
                }}
            > */}
            <ManifestLoadStopStatusChipSelect
                manifestId=""
                stopId=""
                loadId=""
                size="small"
                is_changing={false}
                status={loadStopStatus}
            />
            {/* </Box> */}
        </Tooltip>
    );
}

const columns: MiniTableColumnType<ManifestModel_Stop>[] = [
    {
        minWidth   : '100px',
        headerName : 'columns:ref',
        field      : 'reference_id',
        hasMaxWidth: true,
        flex_start : true,
        styles     : {
            padding: '6px 6px 6px 16px'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        color     : '#667085',
        renderCell: (row) => (
            <Stack
                direction="column"
                maxWidth="135px"
                width="100%"
            >
                <Typography
                    width="100%"
                    color="inherit"
                    fontSize="14px"
                    variant="body1"
                    noWrap
                >
                    {row?.referenceId || ''}
                </Typography>
            </Stack>
        )
    },
    {
        minWidth   : '120px',
        headerName : 'common:status',
        field      : 'stop_status',
        hasMaxWidth: true,
        flex_start : true,
        styles     : {
            padding: '6px'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        color     : '#667085',
        renderCell: (row) => <ManifestStopStatus loadStopStatus={row.loadStopStatus} />
    },
    {
        minWidth   : '20px',
        headerName : 'common:type',
        field      : 'stop_type',
        hasMaxWidth: true,
        flex_start : true,
        styles     : {
            padding: '6px'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        color     : '#667085',
        renderCell: (row) => <ManifestStopType loadStopType={row.loadStopType} />
    },

    {
        minWidth   : '135px',
        flex_start : true,
        hasMaxWidth: true,
        field      : 'location_name',
        headerName : 'columns:loc_name',
        styles     : {
            padding: '6px'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        color     : '#667085',
        renderCell: (row) => (
            <Stack
                direction="column"
                maxWidth="125px"
            >
                <Typography
                    color="inherit"
                    fontSize="14px"
                    variant="body1"
                    noWrap
                >
                    {row?.location?.name || ''}
                </Typography>
            </Stack>
        )
    },
    {
        minWidth   : '160px',
        headerName : 'columns:loc_adr',
        hasMaxWidth: true,
        flex_start : true,
        maxWidth   : '180px',
        field      : 'location_address',
        styles     : {
            padding: '6px'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        color     : '#667085',
        renderCell: (row) => {
            if (!row?.location?.address) return null;
            return (
                <Stack
                    direction="column"
                    maxWidth="180px"
                >
                    <Typography
                        color="inherit"
                        fontSize="14px"
                        variant="body1"
                        noWrap
                    >
                        {row.location.address}
                    </Typography>
                </Stack>
            );
        }
    },
    {
        minWidth   : '120px',
        headerName : 'columns:appt',
        flex_start : true,
        hasMaxWidth: true,
        field      : 'appointment_start_at',
        styles     : {
            padding: '4px 6px'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        color     : '#667085',
        renderCell: (row) => {
            const formatTime = (time: string | null) =>
                time ? moment(time).format('MM/DD HH:mm') : '';

            if (!row.appointmentEndAtLocal) {
                return (
                    <Typography
                        color="inherit"
                        fontSize="14px"
                    >
                        {formatTime(row.appointmentStartAtLocal)}
                    </Typography>
                );
            }

            if (moment(row.appointmentStartAtLocal).isSame(row.appointmentEndAtLocal)) {
                return (
                    <Typography
                        color="inherit"
                        fontSize="14px"
                    >
                        {formatTime(row.appointmentStartAtLocal)}
                    </Typography>
                );
            }

            return (
                <Stack>
                    <Typography
                        lineHeight="14px"
                        fontSize="12px"
                        color="inherit"
                    >
                        {formatTime(row.appointmentStartAtLocal)}
                    </Typography>
                    <Typography
                        lineHeight="14px"
                        fontSize="12px"
                        color="inherit"
                    >
                        {formatTime(row.appointmentEndAtLocal)}
                    </Typography>
                </Stack>
            );
        }
    }
];

export default columns;
