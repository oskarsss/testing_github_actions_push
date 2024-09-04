// import LoadsTypes from '@/services/dispatch/loads/types';
// import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

// const columns: MiniTableColumnType<LoadsTypes.DriverPayItem>[] = [
//     {
//         headerName: 'core:basic.load.driver_pay_items_table.header.pay_item',
//         field     : 'category_name',
//         minWidth  : 200,
//         flex_start: true,
//         color     : '#667085',
//         onClick   : (row, {
//             event,
//             executeAction
//         }) => executeAction('edit_item', { row, event }),
//         renderCell: (row) => row.categoryName || '-'
//     },
//     {
//         headerName: 'core:basic.load.driver_pay_items_table.header.units',
//         field     : 'units',
//         minWidth  : 70,
//         flex_start: true,
//         color     : '#667085',
//         onClick   : (row, {
//             event,
//             executeAction
//         }) => executeAction('edit_item', { row, event }),
//         renderCell: (row) => row.units || '-'
//     },
//     {
//         headerName: 'core:basic.load.driver_pay_items_table.header.rate',
//         minWidth  : 90,
//         field     : 'amount_per_unit',
//         flex_start: false,
//         color     : '#667085',
//         onClick   : (row, {
//             event,
//             executeAction
//         }) => executeAction('edit_item', { row, event }),
//         renderCell: (row) => row.amountPerUnit || '-'
//     },
//     {
//         headerName: 'core:basic.load.driver_pay_items_table.header.total',
//         minWidth  : 110,
//         field     : 'total_amount',
//         flex_start: false,
//         isAmount  : true,
//         onClick   : (row, {
//             event,
//             executeAction
//         }) => executeAction('edit_item', { row, event }),
//         renderCell: (row) => row.totalAmount || '-'
//     }
// ];

// export default columns;
