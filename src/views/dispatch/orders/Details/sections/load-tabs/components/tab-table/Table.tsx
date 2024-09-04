// import React, { useEffect, useState } from 'react';
//
// import TableSortLabel from '@mui/material/TableSortLabel';
// import TableBody from '@mui/material/TableBody';
// import LoadsTypes from '@/services/dispatch/loads/types';
// import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
//
// export default function TabTable<Row extends object = object>({
//     columns,
//     data,
//     editRow,
//     onClick,
//     children
// }: LoadsTypes.Table.Props<Row>) {
//     const [sort, setSort] = useState<LoadsTypes.Table.sortStateType<Row>>({
//         order  : 'asc',
//         orderBy: 'created_at' as keyof Row
//     });
//     const [dataState, setDataState] = useState<Row[]>([]);
//
//     useEffect(() => {
//         const sorted = [...data].sort((a, b) => {
//             if (a[sort.orderBy] < b[sort.orderBy]) {
//                 return sort.order === 'asc' ? -1 : 1;
//             }
//             if (a[sort.orderBy] > b[sort.orderBy]) {
//                 return sort.order === 'asc' ? 1 : -1;
//             }
//             return 0;
//         });
//         setDataState(sorted);
//     }, [sort, data]);
//
//     const onSort = (type: keyof Row) => {
//         if (sort.orderBy === type) {
//             return setSort({ order: sort.order === 'asc' ? 'desc' : 'asc', orderBy: type });
//         }
//         return setSort({ order: 'asc', orderBy: type });
//     };
//     return (
//         <MiniTableStyled.CommonTable
//             size="small"
//             sx={{
//                 tableLayout: data.length === 0 ? 'auto' : 'fixed',
//                 width      : '100%'
//             }}
//         >
//             <MiniTableStyled.HeaderRow>
//                 {columns.map((column) => (
//                     <MiniTableStyled.HeaderCell
//                         width={column.width}
//                         key={column.field_name}
//                     >
//                         <TableSortLabel
//                             active={sort.orderBy === column.field_name}
//                             direction={sort.order}
//                             onClick={() => onSort(column.field_name as keyof Row)}
//                             disabled={!column.sortable}
//                         >
//                             {column.header_name}
//                         </TableSortLabel>
//                     </MiniTableStyled.HeaderCell>
//                 ))}
//             </MiniTableStyled.HeaderRow>
//             <TableBody>
//                 {dataState.map((row, index) => (
//                     <MiniTableStyled.Row
//                         onClick={(event) => (editRow ? editRow(row, event) : {})}
//                         // eslint-disable-next-line react/no-array-index-key
//                         key={index}
//                         sx={{
//                             '&:last-child td, &:last-child th': { border: 0 },
//                             cursor                            : 'pointer'
//                         }}
//                         hover
//                     >
//                         {columns.map((column, index) => (
//                             <MiniTableStyled.Cell
//                                 width={column.width}
//                                 flex_start={column.flex_start}
//                                 scope="row"
//                                 key={column.field_name || index}
//                             >
//                                 {column.renderCell(row, onClick)}
//                             </MiniTableStyled.Cell>
//                         ))}
//                     </MiniTableStyled.Row>
//                 ))}
//                 {children && <MiniTableStyled.Row
//                 row_size="small">{children}</MiniTableStyled.Row>}
//             </TableBody>
//         </MiniTableStyled.CommonTable>
//     );
// }
