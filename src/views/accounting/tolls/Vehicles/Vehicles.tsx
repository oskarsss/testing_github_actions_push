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
//         width     : 40,
//         headerName: 'Plate',
//         field     : 'plate_number',
//         align     : 'left',
//         renderCell: (row) => row.plate_number
//     },
//     {
//         width     : 70,
//         headerName: 'Car',
//         field     : 'plate_number',
//         align     : 'left',
//         renderCell: (row) =>
//             row.truck_id > 0
//                 ? `${row.truck_reference_id} /  ${row.year} ${row.make}`
//                 : 'Not in Vektor'
//     }
// ];
//
// export default function Vehicles() {
//     const rows = useSelector((state) => state.ezpass.vehicles);
//
//     return (
//         <Card sx={{ marginLeft: '20px', marginTop: '64px' }}>
//             <TableContainer
//                 component={Paper}
//                 style={{ width: '350px', overflowX: 'hidden' }}
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
//                         Vehicles in Pre-Pass
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
//                                         width   : column.width,
//                                         minWidth: column.width,
//                                         maxWidth: column.width
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
//                                             width        : column.width,
//                                             minWidth     : column.width,
//                                             maxWidth     : column.width
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
