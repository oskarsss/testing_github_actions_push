// import { useState, MouseEvent, useMemo } from 'react';
// import Typography from '@mui/material/Typography';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
// import { useHomeLoads } from '@/store/dispatch/loads/hooks';
// import { useAppTranslation } from '@/hooks/useAppTranslation';
// import ChartContainer from '../ChartContainer';
// import TablePaginationActions from './TablePaginationActions';
// import styles from './ActiveLoadsChart.module.scss';

// export default function ActiveLoadsChart() {
//     const { t } = useAppTranslation();
//     const [filters, setFilters] = useState({
//         page    : 1,
//         per_page: 5,
//         statuses: ['available', 'pending', 'assigned', 'in_progress']
//     });

//     const {
//         loads,
//         isLoading,
//         total
//     } = useHomeLoads(filters); // UseLoads

//     const preparedLoads = useMemo(
//         () =>
//             loads.map((load) => {
//                 const stops = load.manifests.flatMap((manifest) =>
//                     manifest.stops.filter((stop) => stop.loadId === load.loadId));
//                 const firstStop = stops[0];
//                 const lastStop = stops[stops.length - 1];
//                 return {
//                     ...load,
//                     firstStop,
//                     lastStop
//                 };
//             }),
//         [loads]
//     );

//     const handleChangePage = (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
//         setFilters({ ...filters, page: newPage });
//     };

//     const header = (
//         <>
//             <Typography sx={{ fontWeight: 600, fontSize: '24px', whiteSpace: 'nowrap' }}>
//                 {t('analytics:charts.active_loads.title')}
//             </Typography>
//             <div>{t('analytics:charts.active_loads.search')}</div>
//             <div>{t('analytics:charts.active_loads.tabs')}</div>
//         </>
//     );

//     return (
//         <ChartContainer
//             header={header}
//             isLoading={isLoading}
//         >
//             <TableContainer
//                 component={Paper}
//                 className={styles.TableInfo}
//             >
//                 <Table
//                     stickyHeader
//                     sx={{ minWidth: 432 }}
//                     aria-label="sticky table"
//                 >
//                     <TableHead className={styles.TableHead}>
//                         <TableRow>
//                             <TableCell
//                                 className={styles.TableCell}
//                                 size="small"
//                             >
//                                 {t('analytics:charts.active_loads.table.columns.product')}
//                             </TableCell>
//                             <TableCell
//                                 className={styles.TableCell}
//                                 size="small"
//                                 align="left"
//                             >
//                                 {t('analytics:charts.active_loads.table.columns.status')}
//                             </TableCell>
//                             <TableCell
//                                 className={styles.TableCell}
//                                 size="small"
//                                 align="left"
//                             >
//                                 {t('analytics:charts.active_loads.table.columns.miles')}
//                             </TableCell>
//                             <TableCell
//                                 className={styles.TableCell}
//                                 size="small"
//                                 align="right"
//                             >
//                                 {t('analytics:charts.active_loads.table.columns.sales')}
//                             </TableCell>
//                             <TableCell
//                                 className={styles.TableCell}
//                                 size="small"
//                                 align="right"
//                             >
//                                 {t('analytics:charts.active_loads.table.columns.delivery_id')}
//                             </TableCell>
//                             <TableCell
//                                 className={styles.TableCell}
//                                 size="small"
//                                 align="right"
//                             >
//                                 {t('analytics:charts.active_loads.table.columns.weight')}
//                             </TableCell>
//                             <TableCell
//                                 className={styles.TableCell}
//                                 size="small"
//                             />
//                         </TableRow>
//                     </TableHead>
//                     <TableBody className={styles.TableBody}>
//                         {preparedLoads?.map((row) => (
//                             <TableRow
//                                 key={row.loadId}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                             >
//                                 <TableCell
//                                     className={styles.TableCell}
//                                     size="small"
//                                     component="th"
//                                     scope="row"
//                                 >
//                                     <div>
//                                         {row.firstStop?.location?.city || ''} -{' '}
//                                         {row.lastStop?.location?.city || ''}
//                                     </div>
//                                     <div>
//                                         Truck #{row.truck_reference_id} - {row.first_driver_name}
//                                     </div>
//                                 </TableCell>
//                                 <TableCell
//                                     className={styles.TableCell}
//                                     size="small"
//                                     align="left"
//                                 >
//                                     {row.status}
//                                 </TableCell>
//                                 <TableCell
//                                     className={styles.TableCell}
//                                     size="small"
//                                     align="left"
//                                 >
//                                     {row.loadedMiles}
//                                 </TableCell>
//                                 <TableCell
//                                     className={styles.TableCell}
//                                     size="small"
//                                     align="right"
//                                 >
//                                     {row.loadId}
//                                 </TableCell>
//                                 <TableCell
//                                     className={styles.TableCell}
//                                     size="small"
//                                     align="right"
//                                 >
//                                     chart
//                                 </TableCell>
//                                 <TableCell
//                                     className={styles.TableCell}
//                                     size="small"
//                                     align="right"
//                                 >
//                                     weight
//                                 </TableCell>
//                                 <TableCell
//                                     className={styles.TableCell}
//                                     size="small"
//                                     align="right"
//                                 >
//                                     <div>edit</div>
//                                     <div>message</div>
//                                     <div>more</div>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                     <TableFooter>
//                         <TableRow>
//                             <TablePagination
//                                 rowsPerPageOptions={[]}
//                                 colSpan={7}
//                                 count={total}
//                                 page={filters.page}
//                                 rowsPerPage={5}
//                                 onPageChange={handleChangePage}
//                                 SelectProps={{
//                                     inputProps: {
//                                         'aria-label': 'rows per page'
//                                     },
//                                     native: true
//                                 }}
//                                 ActionsComponent={TablePaginationActions}
//                             />
//                         </TableRow>
//                     </TableFooter>
//                 </Table>
//             </TableContainer>
//         </ChartContainer>
//     );
// }
