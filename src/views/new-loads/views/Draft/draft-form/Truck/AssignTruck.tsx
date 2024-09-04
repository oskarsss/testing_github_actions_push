// import React, { useMemo } from 'react';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { useTrucksLoads } from '@/services/dispatch/scheduling/hooks';
// import { useRouter } from 'next/router';
// import { useNewLoadsDialog } from '@/views/new-loads';
// import { Container, Block, Label, Value, AssignButton } from './styled';

// type Props = {
//     truck_id: string;
// };

// const AssignTruck = ({ truck_id }: Props) => {
//     const { trucks } = useTrucksLoads();
//     const router = useRouter();
//     const newLoadsDialog = useNewLoadsDialog();

//     const selectedTruck = useMemo(
//         () => trucks.find((item) => item.truckId === truck_id) ?? null,
//         [truck_id, trucks]
//     );

//     const viewDriverLoads = () => {
//         if (!selectedTruck) return;
//         router.push(`/dispatch/loads?ref=${selectedTruck.truckId}`);
//         newLoadsDialog.close();
//     };

//     return selectedTruck ? (
//         <Container>
//             <Block>
//                 <Label>Truck</Label>
//                 <Value>{selectedTruck?.referenceId}</Value>
//             </Block>
//             <Block>
//                 <Label>Driver(s)</Label>
//                 <Value>
//                     {selectedTruck?.drivers
//                         .map((driver) => driver.driverTitle)
//                         .filter((item) => item && item.length > 0)
//                         .join(', ')}
//                 </Value>
//             </Block>
//             <Block>
//                 <Label>Trailer</Label>
//                 <Value>{selectedTruck.trailer?.trailerTitle || ''}</Value>
//             </Block>

//             {Boolean(selectedTruck?.drivers.length) && (
//                 <AssignButton
//                     variant="text"
//                     size="small"
//                     style={{ marginLeft: 'auto' }}
//                     onClick={viewDriverLoads}
//                 >
//                     <VisibilityOutlinedIcon />
//                     View Driver Loads
//                 </AssignButton>
//             )}
//         </Container>
//     ) : null;
// };

// export default AssignTruck;
