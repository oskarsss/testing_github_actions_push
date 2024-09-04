// import React, { MouseEvent, useEffect } from 'react';
// import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
// import { useFormContext, useWatch } from 'react-hook-form';
// import { useAppDispatch } from '@/services/hooks';
// import { StepButton, StepContainer, StepTitle } from '@/views/new-loads/views/Draft/styled';
// import { useAssign } from '@/@core/components/assign-menu/Assign';
// import { updateDriverPayItemsAction } from '@/services/drafts/actions';
// import { useDriverPayItemCategories } from '@/services/dispatch/loads/hooks';
// import Drafts from '@/services/drafts/types';
// import Step5Icon from '../../../../icons/Step5Icon';
// import AssignTruck from './AssignTruck';
// import TruckTable from './TruckTable';

// const Truck = () => {
//     const assign = useAssign();
//     const dispatch = useAppDispatch();
//     const {
//         setValue,
//         getValues,
//         control
//     } = useFormContext<Drafts.FieldsTypes>();

//     const truck_id = useWatch({ control, name: 'truck_id' });

//     const settlement_revenue_type_id = useWatch({ name: 'settlement_revenue_type_id', control });
//     const empty_miles = useWatch({ control, name: 'empty_miles' });
//     const loaded_miles = useWatch({ control, name: 'loaded_miles' });
//     const broker_total_rate = useWatch({ control, name: 'broker_total_rate' });

//     const categories = useDriverPayItemCategories();

//     useEffect(() => {
//         if (truck_id) {
//             dispatch(
//                 updateDriverPayItemsAction(
//                     settlement_revenue_type_id,
//                     empty_miles,
//                     loaded_miles,
//                     broker_total_rate,
//                     categories
//                 )
//             ).then((d_items) => {
//                 const prevState = getValues('driver_pay_items');
//                 const newState = prevState.filter((item) => item.isCustom);
//                 setValue('driver_pay_items', [...d_items, ...newState]);
//             });
//         }
//     }, [empty_miles, loaded_miles, broker_total_rate]);

//     const handelAssignTruck = (id: string, type_id: string) => {
//         dispatch(
//             updateDriverPayItemsAction(
//                 type_id,
//                 empty_miles,
//                 loaded_miles,
//                 broker_total_rate,
//                 categories
//             )
//         ).then((d_items) => {
//             setValue('driver_pay_items', d_items);
//             setValue('truck_id', id);
//             setValue('settlement_revenue_type_id', type_id);
//         });
//     };

//     const selectTruck = (event: MouseEvent<HTMLButtonElement>) => {
//         assign.select_truck({
//             onSelect: handelAssignTruck
//         })(event);
//     };

//     return (
//         <StepContainer>
//             <StepTitle>
//                 <Step5Icon />
//                 5. Truck Assignment & Driver Pay
//                 <StepButton
//                     variant="text"
//                     size="small"
//                     style={{ marginLeft: 'auto' }}
//                     onClick={(e) => selectTruck(e)}
//                 >
//                     <PersonAddAlt1OutlinedIcon />
//                     {truck_id ? 'Change Assignment' : 'Assign Truck'}
//                 </StepButton>
//             </StepTitle>
//             {Boolean(truck_id) && <AssignTruck truck_id={truck_id} />}
//             <TruckTable />
//         </StepContainer>
//     );
// };

// export default Truck;
