/* eslint-disable max-len */
// import React from 'react';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import TableBody from '@mui/material/TableBody';
// import Table from '@mui/material/Table';
// import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';
// import LoadsTypes from '@/services/dispatch/loads/types';
// import { Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import {useTranslation} from 'next-intl';
//
// export type onClickTable<Row> = (event: React.MouseEvent<HTMLTableRowElement>, row: Row) => void;
//
// type Props<Row> = {
//     columns: LoadsTypes.Table.ColumnLoad<Row>[];
//     items_array: Row[];
//     onClick: onClickTable<Row>;
//     amount?: number | string;
//     footerAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
//     forceRenderFooter?: boolean;
// };
//
// export default function CustomEditLoadTable<Row>({
//     columns,
//     items_array,
//     onClick,
//     amount,
//     footerAction,
//     forceRenderFooter = false
// }: Props<Row>) {
//     const theme = useTheme();
//     const {t} = useAppTranslation();
//
//     const isRenderFooter = forceRenderFooter || amount;
//
//     return (
//         <>
//             {/* {items_array && items_array.length === 0 && (
//                 <Stack
//                     alignItems="center"
//                     justifyContent="center"
//                     direction="row"
//                     sx={{
//                         border      : `1px solid ${theme.palette.semantic.background.secondary}`,
//                         borderRadius: '5px',
//                         paddingY    : '15px'
//                     }}
//                 >
//                     <Typography
//                         variant="subtitle2"
//                         align="center"
//                         fontSize="16px"
//                     >
//                         Don't have items
//                     </Typography>
//                 </Stack>
//             )} */}
//
//             <Table
//                 size="small"
//                 sx={{
//                     tableLayout: items_array.length === 0 ? 'auto' : 'fixed',
//                     width      : '100%'
//                 }}
//             >
//                 <TableHead>
//                     <TableRow>
//                         {columns.map((col, index) => (
//                             <TableCell
//                                 // eslint-disable-next-line react/no-array-index-key
//                                 key={index}
//                                 style={{
//                                     width   : col.width,
//                                     maxWidth: col.width,
//                                     minWidth: col.width
//                                 }}
//                                 align={col.align}
//                             >
//                                 {t(col.header_name)}
//                             </TableCell>
//                         ))}
//                     </TableRow>
//                 </TableHead>
//
//                 <TableBody>
//                     {items_array.length ? (
//                         items_array.map((row, index) => {
//                             const onClickRow = (event: React.MouseEvent<HTMLTableRowElement>) => {
//                                 onClick(event, row);
//                             };
//                             return (
//                                 <TableRow
//                                     // eslint-disable-next-line react/no-array-index-key
//                                     key={index}
//                                     sx={{
//                                         '&:last-child td, &:last-child th': { border: 0 },
//                                         cursor                            : 'pointer'
//                                     }}
//                                     hover
//                                     onClick={onClickRow}
//                                 >
//                                     {columns.map((col, index) => (
//                                         <TableCell
//                                             key={col.field_name || index}
//                                             style={{ width: col.width }}
//                                             component="th"
//                                             scope="row"
//                                             align={col.align}
//                                         >
//                                             {col.renderCell(row)}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             );
//                         })
//                     ) : (
//                         <TableRow>
//                             <TableCell
//                                 colSpan={columns.length}
//                                 sx={{
//                                     textAlign: 'center',
//                                     paddingY : '15px'
//                                 }}
//                             >
//                                 <Typography
//                                     variant="subtitle2"
//                                     align="center"
//                                     fontSize="16px"
//                                 >
//                                     {t('common:no_items')}
//                                 </Typography>
//                             </TableCell>
//                         </TableRow>
//                     )}
//                     {isRenderFooter && (
//                         <TableRow
//                             sx={{
//                                 '&:last-child td, &:last-child th': { border: 0 },
//                                 cursor                            : 'pointer'
//                             }}
//                         >
//                             {footerAction && (
//                                 <TableCell
//                                     colSpan={1}
//                                     style={{
//                                         width     : '60px',
//                                         fontWeight: 600
//                                     }}
//                                     align="left"
//                                 >
//                                     <Button
//                                         onClick={footerAction}
//                                         variant="text"
//                                         color="primary"
//                                         startIcon={(
//                                             <AddIcon
//                                                 sx={{
//                                                     color: theme.palette.semantic.foreground.brand
//                                                         .primary
//                                                 }}
//                                             />
//                                         )}
//                                     >
//                                         <Typography
//                                             variant="body2"
//                                             color={theme.palette.semantic.foreground.brand.primary}
//                                             sx={{
//                                                 fontWeight: 500
//                                             }}
//                                         >
//                                             {t('common:button.add_item')}
//                                         </Typography>
//                                     </Button>
//                                 </TableCell>
//                             )}
//                             <TableCell
//                                 colSpan={footerAction ? columns.length - 1 : columns.length}
//                                 style={{
//                                     width     : '60px',
//                                     fontWeight: 600
//                                 }}
//                                 align="right"
//                             >
//                                 {amount}
//                             </TableCell>
//                         </TableRow>
//                     )}
//                 </TableBody>
//             </Table>
//         </>
//     );
// }
