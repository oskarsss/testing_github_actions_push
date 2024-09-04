/* eslint-disable max-len */
// import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
// import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
// import LoadsTypes from '@/services/dispatch/loads/types';
// import { usePermissions } from '@/services/app/hooks';
// import { useAddDriverPayItemMenu } from '@/views/dispatch/loads/menus/driver-pay-item/AddDriverPayItem';
// import { useEditDriverPayItemMenu } from '@/views/dispatch/loads/menus/driver-pay-item/EditDriverPayItem';
// import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
// import { PERMISSIONS } from '@/models/permissions/permissions';
// import AddItemButton from '../add-item-button/AddItemButton';
// import columns from './columns';

// type Props = {
//     loadId: string;
//     driverPayItems: LoadsTypes.DriverPayItem[];
//     driverId: string;
//     driverNet: string;
//     invalidateSettlement?: () => void;
// };

// export default function DriverPayItemsTable({
//     loadId,
//     driverPayItems,
//     driverId,
//     driverNet,
//     invalidateSettlement
// }: Props) {
//     const { hasPermission } = usePermissions();

//     const addDriverPayItemDialog = useAddDriverPayItemMenu();
//     const editDriverPayItemDialog = useEditDriverPayItemMenu();

//     const canEdit = hasPermission(PERMISSIONS.EDIT_LOAD_DRIVER_PAY);
//     const filterDriverPayItems = driverPayItems.filter((item) => item.driverId === driverId);

//     const executeAction: MiniTableExecuteActionType<LoadsTypes.DriverPayItem> = (name, props) => {
//         if (canEdit) {
//             editDriverPayItemDialog.open({
//                 load_id: loadId,
//                 item   : props.row,
//                 invalidateSettlement
//             })(props.event);
//         }
//     };

//     return (
//         <MiniTable
//             turnOffBorder
//             fontSize="large"
//             columns={columns}
//             rows={filterDriverPayItems}
//             elementKey="driverPayItemId"
//             executeAction={executeAction}
//             ComponentAfterContent={(
//                 <TotalsRow
//                     fontSize="large"
//                     without_border
//                     columns={columns}
//                     info_config={{
//                         total_amount : driverNet,
//                         category_name: (
//                             <AddItemButton
//                                 onClick={(e) =>
//                                     addDriverPayItemDialog.open({
//                                         load_id  : loadId,
//                                         driver_id: driverId
//                                     })(e)}
//                             />
//                         )
//                     }}
//                 />
//             )}
//         />
//     );
// }
