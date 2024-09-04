/* eslint-disable max-len */
// /* eslint-disable no-case-declarations */

// import React, { ChangeEvent, useMemo } from 'react';
// import { Table, TableBody, TableHead, TableRow } from '@mui/material';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import { useFormContext, useWatch } from 'react-hook-form';
// import { SelectChangeEvent } from '@mui/material/Select';
// import { formatAmount } from '@/utils/formatting';

// import TableSelect from '@/views/new-loads/views/Draft/Form/components/EditableTable/Select';
// import TableInput from '@/views/new-loads/views/Draft/Form/components/EditableTable/Input';
// import DeleteItemButton from '@/views/new-loads/views/Draft/Form/components/EditableTable/DeleteItemButton';
// import TotalFooter from '@/views/new-loads/views/Draft/Form/components/EditableTable/TotalFooter';

// import { generateDriverPayItem } from '@/views/new-loads/utils/defaultValue';
// import { useDriverPayItemCategories } from '@/services/dispatch/loads/hooks';
// import Drafts from '@/services/drafts/types';
// import { AddButton, BodyCell, HeadCell, TableContainer } from './styled';
// import NoItems from '../components/NoItems';

// const TruckTable = () => {
//     const {
//         setValue,
//         control
//     } = useFormContext<Drafts.FieldsTypes>();
//     const categories = useDriverPayItemCategories();
//     const truck_id = useWatch({ control, name: 'truck_id' });

//     const driver_pay_items = useWatch({ control, name: 'driver_pay_items' });

//     const total = useMemo(
//         () =>
//             driver_pay_items.length
//                 ? driver_pay_items
//                     .map(
//                         (item: Drafts.DriverPayItemTypes) =>
//                             Number(item.units) * Number(item.amount_per_unit)
//                     )
//                     .reduce((accum, value) => Number(accum) + Number(value))
//                     .toFixed(2)
//                 : 0,
//         [driver_pay_items]
//     );

//     const deleteItem = (id: string) => {
//         setValue('driver_pay_items', [
//             ...driver_pay_items.filter((item: Drafts.DriverPayItemTypes) => item.id !== id)
//         ]);
//     };

//     const addLineItem = () => {
//         setValue('driver_pay_items', [...driver_pay_items, generateDriverPayItem(true)]);
//     };

//     const onChangesTable = (
//         event: unknown,
//         type: 'category' | 'units' | 'amount_per_unit',
//         id: string
//     ) => {
//         switch (type) {
//         case 'category':
//             const data = driver_pay_items.map((item) => {
//                 if (item.id === id) {
//                     const category_id = categories.find(
//                         (el) =>
//                             el.category_id ===
//                                 (event as SelectChangeEvent<HTMLInputElement>).target.value
//                     );
//                     return {
//                         ...item,
//                         category_id: category_id?.revenue_item_type ?? ''
//                     };
//                 }
//                 return item;
//             });

//             setValue('driver_pay_items', data);
//             break;
//         case 'units':
//             const dataUnits = driver_pay_items.map((item) => {
//                 if (item.id === id) {
//                     return {
//                         ...item,
//                         units: Number((event as ChangeEvent<HTMLInputElement>).target.value)
//                     };
//                 }
//                 return item;
//             });
//             setValue('driver_pay_items', dataUnits);
//             break;
//         case 'amount_per_unit':
//             const dataAmount = driver_pay_items.map((item) => {
//                 if (item.id === id) {
//                     return {
//                         ...item,
//                         amount_per_unit: Number(
//                             (event as ChangeEvent<HTMLInputElement>).target.value
//                         )
//                     };
//                 }
//                 return item;
//             });
//             setValue('driver_pay_items', dataAmount);
//             break;
//         default:
//             break;
//         }
//     };

//     if (!truck_id) return <NoItems title="Truck not assigned" />;

//     return (
//         <TableContainer
//             style={{
//                 minHeight: truck_id ? 66 : 'auto',
//                 marginTop: driver_pay_items.length || truck_id ? 24 : 0
//             }}
//         >
//             {driver_pay_items.length > 0 && (
//                 <Table
//                     aria-label="driver pay table"
//                     size="small"
//                 >
//                     <TableHead>
//                         <TableRow>
//                             {['Pay Item', 'Units', 'Rate', 'Total', ''].map((item) => (
//                                 <HeadCell>{item}</HeadCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {driver_pay_items.map((row) => (
//                             <TableRow
//                                 key={row.id}
//                                 hover
//                             >
//                                 <BodyCell>
//                                     <TableSelect
//                                         value={
//                                             categories.find(
//                                                 (el) => el.revenue_item_type === row.category_id
//                                             )?.category_id as string
//                                         }
//                                         onChange={(event) =>
//                                             onChangesTable(event, 'category', row.id)}
//                                         categories={categories}
//                                     />
//                                 </BodyCell>
//                                 <BodyCell>
//                                     <TableInput
//                                         type="number"
//                                         value={row.units}
//                                         onChange={(event) => onChangesTable(event,
// 'units', row.id)}
//                                     />
//                                 </BodyCell>
//                                 <BodyCell>
//                                     <TableInput
//                                         value={row.amount_per_unit}
//                                         onChange={(event) =>
//                                             onChangesTable(event, 'amount_per_unit', row.id)}
//                                     />
//                                 </BodyCell>
//                                 <BodyCell>
//                                     {formatAmount(
//                                         (Number(row.units) * Number(row.amou
// nt_per_unit)).toFixed(2)
//                                     )}
//                                 </BodyCell>
//                                 <BodyCell align="right">
//                                     <DeleteItemButton onClick={() => deleteItem(row.id)} />
//                                 </BodyCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                     <TotalFooter total={total} />
//                 </Table>
//             )}
//             {Boolean(truck_id) && (
//                 <AddButton
//                     variant="text"
//                     size="small"
//                     onClick={addLineItem}
//                 >
//                     <AddOutlinedIcon />
//                     Add Line Item
//                 </AddButton>
//             )}
//         </TableContainer>
//     );
// };

// export default TruckTable;
