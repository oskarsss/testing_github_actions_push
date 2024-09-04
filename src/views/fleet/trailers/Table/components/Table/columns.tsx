/* eslint-disable react/no-danger */
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import TrailersTypes from '@/store/fleet/trailers/types';
import TableTypes from '@/@core/components/table/types';
import Stack from '@mui/material/Stack';
import { replaceFromString } from '@/@core/components/notes/components/AllNotes/utils';
import TrailerStatusChipSelect from '@/@core/fields/chip-select/TrailerStatusChipSelect';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';
import TruckTooltipForTable from '@/@core/components/table-tooltips/TruckTooltipForTable';
import DriverTooltipForTable from '@/@core/components/table-tooltips/DriverTooltipForTable';
import { common_cell_styles } from '@/@core/components/table/table_config';
import { AssignText } from '@/views/fleet/trucks/Table/components/Table/columns';

const TrailerTypeCell = ({ row }: { row: TrailersTypes.ConvertedTrailerRow }) => (
    <>
        <div style={{ display: 'flex' }}>{getTrailerTypeIcon(row.trailerType?.icon || 0)}</div>
        <span style={{ marginLeft: '5px' }}>{row.trailerType?.name || ''}</span>
    </>
);

const columns: TableTypes.FixedCustomColumns<TrailersTypes.ConvertedTrailerRow> = {
    type: {
        width   : 150,
        sortable: true,
        style   : {
            fontWeight    : 500,
            ...common_cell_styles,
            justifyContent: 'flex-start'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => <TrailerTypeCell row={row} />
    },
    truck: {
        width   : 200,
        sortable: true,
        style   : {
            fontWeight    : 500,
            color         : '#2267FF',
            ...common_cell_styles,
            justifyContent: 'flex-start',
            padding       : 0
        },
        onClick: (row, {
            executeAction,
            event
        }) =>
            executeAction('view_truck_options', {
                row,
                event
            }),
        renderCell: (row) => {
            if (row.truck) {
                return <TruckTooltipForTable truck_id={row.truckId} />;
            }
            return (
                <>
                    <ControlPointDuplicateIcon
                        color="primary"
                        style={{ marginRight: '6px', fontSize: '20px', marginLeft: '10px' }}
                    />
                    <AssignText />
                </>
            );
        }
    },
    plate: {
        width   : 150,
        sortable: true,
        style   : {
            ...common_cell_styles,
            justifyContent: 'flex-start'
        },
        renderCell: (row) => row.plate?.number || ''
    },
    driver: {
        width   : 120,
        sortable: true,
        style   : {
            fontWeight    : 500,
            ...common_cell_styles,
            justifyContent: 'flex-start',
            padding       : 0
        },
        onClick: (row, {
            executeAction,
            event
        }) => {
            if (row.truckId) {
                executeAction('view_driver_options', {
                    row,
                    event
                });
            }
        },
        renderCell: (row) => {
            if (row.driver) {
                return (
                    <DriverTooltipForTable
                        driver_id={row.driverId}
                        full_name={`${row.driver?.firstName || ''} ${row.driver?.lastName || ''}`}
                    />
                );
            }
            return (
                <div
                    style={{
                        display   : 'flex',
                        alignItems: 'center',
                        cursor    : row.truckId ? 'pointer' : 'not-allowed'
                    }}
                >
                    <ControlPointDuplicateIcon
                        color={row.truckId ? 'primary' : 'disabled'}
                        style={{ marginRight: '6px', fontSize: '20px', marginLeft: '10px' }}
                    />
                    <AssignText disabled={!row.truckId} />
                </div>
            );
        }
    },
    ownership_type: {
        width   : 150,
        sortable: true,
        style   : {
            ...common_cell_styles,
            justifyContent: 'flex-start'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row, { t }) => t(`state_info:trailers.ownership_type.${row.ownershipType}`)
    },
    notes: {
        width   : 200,
        sortable: true,
        onClick : (row, {
            executeAction,
            event
        }) =>
            executeAction('set_view_notes_anchor', {
                row,
                event,
                notes: row.notes
            }),
        renderCell: (row, { t }) => (
            <Stack
                direction="row"
                spacing={2}
                alignItems="flex-end"
            >
                {row.notes.length > 0 ? (
                    <>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: replaceFromString(row.notes[0].body)
                            }}
                        />
                        {row.notes.length - 1 !== 0 && (
                            <span
                                style={{
                                    fontWeight: 600,
                                    fontSize  : 12
                                }}
                            >
                                And {row.notes.length - 1} other... Click to open notes
                            </span>
                        )}
                    </>
                ) : (
                    <span>{t('common:empty.no_notes_yet')}</span>
                )}
            </Stack>
        )
    },
    tags: {
        width   : 250,
        sortable: true,
        style   : {
            paddingTop   : 0,
            paddingBottom: 0
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => (
            <Stack
                direction="row"
                alignItems="center"
                height="100%"
                hidden
            >
                {row.tags.map((tag, index) => (
                    <span
                        key={tag.tagId}
                        style={{
                            width          : 'auto',
                            backgroundColor: 'rgba(58, 53, 65, 0.08)',
                            color          : 'rgba(58, 53, 65, 0.87)',
                            borderRadius   : '16px',
                            height         : 26,
                            paddingLeft    : 15,
                            paddingRight   : 15,
                            display        : 'flex',
                            flexDirection  : 'row',
                            justifyContent : 'center',
                            alignItems     : 'center',
                            marginLeft     : index > 0 ? '5px' : 0
                        }}
                    >
                        {tag.name}
                    </span>
                ))}
            </Stack>
        )
    },
    status: {
        width     : 140,
        sortable  : true,
        style     : StatusChipCellStyle,
        renderCell: (row) => (
            <TrailerStatusChipSelect
                trailer_id={row.trailerId}
                trailer_status={row.status}
                show_arrow={false}
                full_width
            />
        )
    }
};

export default columns;
