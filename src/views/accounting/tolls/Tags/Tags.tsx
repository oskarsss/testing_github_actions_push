// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useSelector } from 'react-redux';
// import { Card, Divider } from '@mui/material';
//
// const columns = [
//     {
//         width     : 100,
//         headerName: 'Tag Number',
//         field     : 'tag_number',
//         align     : 'left',
//         renderCell: (row) => row.tag_number
//     },
//     {
//         width     : 50,
//         headerName: 'Status',
//         field     : 'status',
//         align     : 'left',
//         renderCell: (row) => row.status
//     },
//     {
//         width     : 50,
//         headerName: 'Plate',
//         field     : 'plate_number',
//         align     : 'left',
//         renderCell: (row) => row.plate_number
//     }
// ];
//
// export default function Tags() {
//     const rows = useSelector((state) => state.ezpass.tags);
//
//     return (
//         <Card sx={{ marginLeft: '20px', marginTop: '64px', height: '100%' }}>
//             <TableContainer
//                 component={Paper}
//                 style={{
//                     width    : '350px',
//                     height   : 'calc(100% - 117px)',
//                     overflowY: 'scroll',
//                     overflowX: 'scroll'
//                 }}
//             >
//                 <div
//                     style={{
//                         paddingLeft  : 15,
//                         paddingRight : 15,
//                         height       : 64,
//                         display      : 'flex',
//                         flexDirection: 'row',
//                         alignItems   : 'center'
//                     }}
//                 >
//                     <span
//                         style={{
//                             fontSize  : '20px',
//                             fontWeight: 700
//                         }}
//                     >
//                         Tag Numbers
//                     </span>
//                 </div>
//                 <Divider sx={{ margin: 0 }} />
//                 <Table
//                     sx={{ minWidth: 0 }}
//                     aria-label="simple table"
//                 >
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column, index) => (
//                                 <TableCell
//                                     key={column.id ?? index}
//                                     align={column.align}
//                                     style={{
//                                         width    : column.width,
//                                         minWidth : column.width,
//                                         maxWidth : column.width,
//                                         height   : 35,
//                                         maxHeight: 35
//                                     }}
//                                 >
//                                     {column.headerName}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows.map((row) => (
//                             <TableRow
//                                 key={row.id}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                             >
//                                 {columns.map((column, index) => (
//                                     <TableCell
//                                         key={column.id ?? index}
//                                         align={column.align}
//                                         style={{
//                                             margin       : 0,
//                                             height       : 32,
//                                             paddingLeft  : 15,
//                                             paddingTop   : 0,
//                                             paddingBottom: 0,
//                                             borderLeft   : '1px solid #d4d3d524',
//                                             borderRight  : '1px solid #d4d3d524',
//                                             width        : column.minWidth,
//                                             minWidth     : column.minWidth,
//                                             maxWidth     : column.minWidth
//                                         }}
//                                     >
//                                         {column.renderCell(row)}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Card>
//     );
// }
