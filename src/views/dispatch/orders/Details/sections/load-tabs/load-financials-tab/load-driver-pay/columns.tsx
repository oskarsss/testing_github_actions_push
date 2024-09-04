// import LoadsTypes from '@/services/dispatch/loads/types';
// import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

// const columns: MiniTableColumnType<LoadsTypes.DriverPayItem>[] = [
//     {
//         headerName: 'columns:pay_item',
//         field     : 'category_name',
//         minWidth  : 200,

//         // sortable   : true,
//         flex_start: true,
//         color     : '#667085',
//         onClick   : (row, {
//             event,
//             executeAction
//         }) => executeAction('edit_item', { row, event }),
//         renderCell: (row) => row.categoryName || '-'
//     },
//     {
//         headerName: 'columns:units',
//         field     : 'units',
//         minWidth  : 70,
//         flex_start: false,
//         color     : '#667085',
//         onClick   : (row, {
//             event,
//             executeAction
//         }) => executeAction('edit_item', { row, event }),

//         // sortable   : true,
//         renderCell: (row) => row.units || '-'
//     },
//     {
//         headerName: 'columns:rate',
//         minWidth  : 90,
//         field     : 'amount_per_unit',
//         flex_start: false,
//         color     : '#667085',
//         onClick   : (row, {
//             event,
//             executeAction
//         }) => executeAction('edit_item', { row, event }),

//         // sortable   : false,
//         renderCell: (row) => row.amountPerUnit || '-'
//     },
//     {
//         headerName: 'columns:total',
//         minWidth  : 110,
//         field     : 'total_amount',
//         flex_start: false,
//         isAmount  : true,
//         onClick   : (row, {
//             event,
//             executeAction
//         }) => executeAction('edit_item', { row, event }),

//         // sortable   : false,
//         renderCell: (row) => row.totalAmount || '-'
//     }

//     // {
//     //     header_name: '',
//     //     width      : '70px',
//     //     field_name : 'controls',
//     //     sortable   : false,
//     //     renderCell : (row, handleClick) => (
//     //         <LoadDetailsViewStyled.FlexContainer
//     // style={{ gap: '4px', justifyContent: 'flex-end' }}>
//     //             {invoiceItemControls.map((control) => (
//     //                 <Tooltip
//     //                     title={control.title}
//     //                     key={control.title}
//     //                 >
//     //                     <LoadDetailsViewStyled.IconButtonStyled
//     //                         onClick={(event) => {
//     //                             event.stopPropagation();
//     //                             if (handleClick) {
//     //                                 handleClick(control.type, row, event);
//     //                             }
//     //                         }}
//     //                     >
//     //                         {control.icon}
//     //                     </LoadDetailsViewStyled.IconButtonStyled>
//     //                 </Tooltip>
//     //             ))}
//     //         </LoadDetailsViewStyled.FlexContainer>
//     //     )
//     // }
// ];

// export default columns;
