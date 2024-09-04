import DriversTypes from '@/store/fleet/drivers/types';
import TableTypes from '@/@core/components/table/types';
import DriverStatusChipSelect from '@/@core/fields/chip-select/DriverStatusChipSelect';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';
import DriverTableSelfie from '@/@core/components/table/custom-cells/DriverTableSelfie';
import { checkbox_style, common_cell_styles } from '@/@core/components/table/table_config';
import { formatPhoneNumber } from '@/utils/formatting';
import TooltipDriverPing from '@/@core/components/table-tooltips/TooltipDriverPing';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import DriverType from './custom-cells/DriverType';
import Trailer from './custom-cells/Trailer';
import Tags from './custom-cells/Tags';
import Truck from './custom-cells/Truck';
import InsuranceEndorsed from './custom-cells/InsuranceEndorsed';

const columns: TableTypes.FixedCustomColumns<DriversTypes.ConvertedDriverRow> = {
    selfie_and_name: {
        width   : 200,
        sortable: true,
        style   : {
            padding: 0
        },
        onClick: (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                row,
                col,
                event,
                copy_value: `${row.firstName} ${row.lastName}` as never
            }),
        renderCell: (row, { rowHeight }) => (
            <TooltipDriverPing row={row}>
                <DriverTableSelfie
                    row={row}
                    rowHeight={rowHeight}
                />
                <span>{`${row.firstName} ${row.lastName}`}</span>
            </TooltipDriverPing>
        )
    },
    employment_verification_sent: {
        width   : 75,
        sortable: true,

        // onClick : (row, {
        //     executeAction,
        //     event
        // }) =>
        //     executeAction('update', {
        //         row,
        //         event,
        //         data: {
        //             employment_verification_sent: row.employment_verification_sent === 1 ? 0 : 1
        //         }
        //     }),
        // eslint-disable-next-line consistent-return
        // getClassName: (row) => {
        //     if (row.employment_verification_sent === 0) {
        //         return 'invalid';
        //     }
        // },
        style     : checkbox_style,
        renderCell: (row) => ''
    },
    selfie: {
        width   : 200,
        sortable: true,
        style   : {
            ...common_cell_styles,
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event,
                copy_value: `${row.firstName} ${row.lastName}` as never
            }),
        renderCell: (row, { rowHeight }) => (
            <DriverTableSelfie
                rowHeight={rowHeight}
                row={row}
            />
        )
    },
    type: {
        width   : 110,
        sortable: true,
        style   : {
            fontWeight    : 500,
            ...common_cell_styles,
            justifyContent: 'flex-start',
            paddingTop    : 0,
            paddingBottom : 0
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event,
                copy_value: `${row.firstName} ${row.lastName}` as never
            }),
        renderCell: (row) => <DriverType driverType={row.driverType} />
    },
    truck_type: {
        width   : 110,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event,
                copy_value: `${row.firstName} ${row.lastName}` as never
            }),
        renderCell: (row, { t }) =>
            row.truck?.type &&
            t(`state_info:trucks.type.${TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.truck.type]}`)
    },
    truck_reference_id: {
        width   : 80,
        sortable: true,
        style   : {
            fontWeight    : 500,
            color         : '#2267FF',
            ...common_cell_styles,
            justifyContent: 'flex-start',
            padding       : 0
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('assign_truck_to_driver', { row, event }),
        renderCell: (row) => <Truck driver={row} />
    },

    // employment_verification_sent: {
    //     width   : 75,
    //     sortable: true,
    //     onClick : (row, {
    //         executeAction,
    //         event
    //     }) =>
    //         executeAction('update', {
    //             row,
    //             event,
    //             data: {
    //                 employment_verification_sent: row.employment_verification_sent === 1 ? 0 : 1
    //             }
    //         }),
    //     // eslint-disable-next-line consistent-return
    //     getClassName: (row) => {
    //         if (row.employment_verification_sent === 0) {
    //             return 'invalid';
    //         }
    //     },
    //     style     : checkbox_style,
    //     renderCell: (row) =>
    //         getCheckbox(row.employment_verification_sent === 1 ? 'valid' : 'invalid')
    // },
    insurance_endorsed: {
        width       : 50,
        sortable    : false,
        // eslint-disable-next-line consistent-return
        getClassName: (row) => {
            if (!row.insuranceEndorsed) {
                return 'invalid';
            }
        },
        style     : checkbox_style,
        renderCell: (row) => (
            <InsuranceEndorsed
                driverId={row.driverId}
                insuranceEndorsed={row.insuranceEndorsed}
                driverName={`${row.firstName} ${row.lastName}`}
            />
        )
    },
    hire_date: {
        width   : 170,
        sortable: true,
        style   : {
            fontWeight: 500,
            ...common_cell_styles
        },
        onClick: (row, {
            executeAction,
            event
        }) =>
            executeAction('options', { driver: row, row, event }),
        renderCell: (row) => row.hireDate
    },
    phone_number: {
        width   : 100,
        sortable: true,
        style   : {
            fontWeight: 500,
            ...common_cell_styles
        },
        onClick: (row, {
            executeAction,
            event
        }) =>
            executeAction('options', { driver: row, row, event }),
        renderCell: (row) => formatPhoneNumber(row.phoneNumber)
    },
    status: {
        width     : 190,
        sortable  : true,
        style     : StatusChipCellStyle,
        renderCell: (row) => (
            <DriverStatusChipSelect
                driver_id={row.driverId}
                driver_status={row.status}
                show_arrow={false}
                full_width
            />
        )
    },

    fuel_card_number: {
        width   : 140,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('view_driver', { row, event }),
        renderCell: (row) => ''
    },
    settlement_revenue_type_name: {
        width   : 140,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('view_driver', { row, event }),
        renderCell: (row) => row.revenueType?.name || ''
    },
    settlement_cycle_name: {
        width   : 140,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('view_driver', { row, event }),
        renderCell: (row) => row.cycle?.name || ''
    },
    trailer: {
        width   : 120,
        sortable: true,
        style   : {
            fontWeight    : 500,
            ...common_cell_styles,
            justifyContent: 'flex-start',
            color         : '#2267FF',
            padding       : 0
        },
        onClick: (row, {
            event,
            executeAction
        }) => {
            if (row.truck?.truckId) {
                executeAction('assign_trailer_to_truck', {
                    row,
                    event
                });
            }
        },
        renderCell: (row) => <Trailer driver={row} />
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
            executeAction('view_driver', {
                row,
                event
            }),
        renderCell: (row) => <Tags driverId={row.driverId} />
    }
};

export default columns;
