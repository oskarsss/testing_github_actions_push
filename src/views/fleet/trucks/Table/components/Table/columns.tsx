/* eslint-disable react/no-danger */
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { common_cell_styles } from '@/@core/components/table/table_config';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import TrucksTypes from '@/store/fleet/trucks/types';
import TableTypes from '@/@core/components/table/types';
import Stack from '@mui/material/Stack';
import { replaceFromString } from '@/@core/components/notes/components/AllNotes/utils';
import TruckStatusChipSelect from '@/@core/fields/chip-select/TruckStatusChipSelect';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';
import DriverTooltipForTable from '@/@core/components/table-tooltips/DriverTooltipForTable';
import TrailerTooltipForTable from '@/@core/components/table-tooltips/TrailerTooltipForTable';
import { Typography, useTheme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TruckUsers from './custom-cells/TruckUsers';

export const AssignText = ({ disabled = false }: { disabled?: boolean }) => {
    const { t } = useAppTranslation();
    const { palette } = useTheme();
    return (
        <Typography
            variant="body1"
            fontSize="14px"
            fontWeight={500}
            color={
                disabled
                    ? palette.semantic.text.disabled
                    : palette.semantic.foreground.brand.primary
            }
        >
            {t('common:button.assign')}
        </Typography>
    );
};

const columns: TableTypes.FixedCustomColumns<TrucksTypes.ConvertedTruckRow> = {
    reference_id: {
        width   : 65,
        sortable: true,
        style   : {
            fontWeight: 600
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('truck_options', {
                row,
                event,
                copy_value: row.referenceId as never
            }),
        renderCell: (row) => row.referenceId
    },
    insurance_endorsed: {
        width   : 65,
        sortable: true,
        style   : {
            fontWeight: 600
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('truck_options', {
                row,
                event,
                copy_value: row.referenceId as never
            }),
        renderCell: (row) => row.insuranceEndorsed
    },
    second_driver: {
        width   : 125,
        sortable: true,
        style   : {
            ...common_cell_styles,
            fontWeight    : 500,
            justifyContent: 'flex-start'
        },
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('set_assign_second_driver', {
                row,
                event
            });
        },
        renderCell: (row) => {
            if (row.secondDriver) {
                return `${row.secondDriver.firstName} ${row.secondDriver.lastName}` || '';
            }
            return (
                <>
                    <PersonAddAlt1OutlinedIcon
                        color="primary"
                        style={{ marginRight: '6px', fontSize: '20px' }}
                    />
                    <AssignText />
                </>
            );
        }
    },

    type: {
        width   : 125,
        sortable: true,
        style   : {
            ...common_cell_styles,
            fontWeight    : 500,
            justifyContent: 'flex-start'
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('truck_options', {
                row,
                event
            }),
        renderCell: (row, { t }) => (
            <>
                <span style={{ marginRight: '4px', marginBottom: '-2px' }}>
                    {TRUCK_TYPE_ICONS[row.type]}
                </span>
                <span>{t(`state_info:trucks.type.${row.type}`)}</span>
            </>
        )
    },
    vendor_name: {
        width   : 125,
        sortable: true,
        style   : {
            ...common_cell_styles,
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('truck_options', {
                row,
                event
            }),
        renderCell: (row) => row.vendor?.name || ''
    },
    plate_number: {
        width   : 125,
        sortable: true,
        style   : {
            ...common_cell_styles,
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('truck_options', {
                row,
                event
            }),
        renderCell: (row) => row.plate?.number || ''
    },
    driver: {
        width   : 125,
        sortable: true,
        style   : {
            ...common_cell_styles,
            fontWeight    : 500,
            justifyContent: 'flex-start',
            padding       : 0
        },
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('set_assign_driver', {
                row,
                event
            });
        },
        renderCell: (row) => {
            if (row.driver) {
                return (
                    <DriverTooltipForTable
                        driver_id={row.driver.driverId}
                        full_name={`${row.driver.firstName} ${row.driver.lastName}`}
                    />
                );
            }
            return (
                <>
                    <PersonAddAlt1OutlinedIcon
                        color="primary"
                        style={{ marginRight: '6px', fontSize: '20px', marginLeft: '10px' }}
                    />
                    <AssignText />
                </>
            );
        }
    },
    truck: {
        width   : 160,
        sortable: true,
        onClick : (row, {
            event,
            executeAction
        }) =>
            executeAction('truck_options', {
                row,
                event
            }),
        renderCell: (row) => row.truck
    },
    trailer_reference_id: {
        width   : 120,
        sortable: true,
        style   : {
            ...common_cell_styles,
            fontWeight    : 500,
            justifyContent: 'flex-start',
            padding       : 0
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('view_trailer_options', {
                row,
                event
            }),
        renderCell: (row) => {
            if (row.trailer) {
                return <TrailerTooltipForTable trailer_id={row.trailerId} />;
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
    users: {
        width   : 200,
        sortable: true,
        style   : {
            ...common_cell_styles,
            overflow: 'hidden'
        },
        renderCell: (row) => <TruckUsers users={row.users} />
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
        style: {
            overflow: 'hidden'
        },

        // renderCell: (row) => (row.notes && row.notes.length > 0 ? row.notes[0].body : '')
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
                                {t('trucks:table.columns.notes', {
                                    amount: row.notes.length - 1
                                })}
                            </span>
                        )}
                    </>
                ) : (
                    <span>{t('common:empty.no_notes_yet')}</span>
                )}
            </Stack>
        )
    },
    status: {
        width     : 190,
        sortable  : true,
        style     : StatusChipCellStyle,
        renderCell: (row) => (
            <TruckStatusChipSelect
                truck_id={row.truckId}
                truck_status={row.status}
                show_arrow={false}
                full_width
            />
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
            executeAction('truck_options', {
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
    }
};

export default columns;
