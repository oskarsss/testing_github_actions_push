// import { useAppSelector } from '@/services/hooks';
// import { useTruckQuery } from '@/services/fleet/trucks/hooks';
// import Typography from '@mui/material/Typography';
// import PersonIcon from '@mui/icons-material/Person';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import NearMeIcon from '@mui/icons-material/NearMe';
// import VectorIcons from '@/@core/icons/vector_icons';
// import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
// import {
//     Avatars,
//     AvatarStyled,
//     Btn,
//     DriversBlock,
//     DriversWrapper,
//     HeadWrapper,
//     IconBlock
// } from './styled';
// import LayerWrapper from './reusable/LayerWrapper';
//
// type Props = {
//     first_name: string;
//     selfie_thumb_url: string;
// };
// function Avatar({
//     first_name,
//     selfie_thumb_url
// }: Props) {
//     const { url } = usePrivateFileUrl(selfie_thumb_url);
//
//     return (
//         <AvatarStyled
//             alt={first_name}
//             src={url}
//         />
//     );
// }
//
// const TruckProfile = () => {
//     const selected_truck_id = useAppSelector((state) => state.map.selected.truck_id);
//     const { truck } = useTruckQuery(selected_truck_id);
//
//     if (!truck || !selected_truck_id) {
//         return null;
//     }
//
//     return (
//         <LayerWrapper type="truck">
//             <HeadWrapper>
//                 <VectorIcons.NavIcons.EmptyTruck style={{ fill: '#BDC7D2' }} />
//                 <Typography variant="h5">{truck.reference_id}</Typography>
//             </HeadWrapper>
//
//             <Typography
//                 marginBottom="10px"
//                 marginTop="10px"
//                 variant="body2"
//             >
//                 {truck.year} {truck.make} {truck.model}
//             </Typography>
//
//             <IconBlock>
//                 <PersonIcon />
//                 <Typography variant="body2">
//                     {truck.vendor_id ? truck.vendor?.name : 'N/V'}
//                 </Typography>
//             </IconBlock>
//
//             <IconBlock>
//                 <LocationOnIcon />
//                 <Typography variant="body2">| 80, Atkinson, IL, 61235</Typography>
//             </IconBlock>
//
//             <Typography
//                 variant="caption"
//                 marginLeft="35px"
//             >
//                 Mar 20, 2023 2:17 PM
//             </Typography>
//
//             <DriversWrapper>
//                 {truck.drivers.length > 0 ? (
//                     <DriversBlock>
//                         <Avatars>
//                             {truck.drivers.map((driver) => (
//                                 <Avatar
//                                     first_name={driver.first_name}
//                                     selfie_thumb_url={driver.selfie_thumb_url}
//                                     key={driver.driver_id}
//                                 />
//                             ))}
//                         </Avatars>
//                         <Typography
//                             variant="body2"
//                             fontSize="12px"
//                             fontWeight={600}
//                         >
//                             {truck.drivers
//                                 .map((driver) => `${driver.first_name} ${driver.last_name}`)
//                                 .join(', ')}
//                         </Typography>
//                         <ArrowForwardIosIcon
//                             color="secondary"
//                             sx={{ fontSize: 14, marginLeft: 'auto' }}
//                         />
//                     </DriversBlock>
//                 ) : (
//                     <Typography variant="body2">The truck has not drivers</Typography>
//                 )}
//             </DriversWrapper>
//
//             <Btn startIcon={<NearMeIcon fontSize="small" />}>Live Share</Btn>
//
//             <Typography
//                 variant="h5"
//                 marginTop="65px"
//             >
//                 Trailer Linked: {truck.trailer ? `#${truck.trailer.reference_id}` : 'No Truck'}
//             </Typography>
//         </LayerWrapper>
//     );
// };
//
// export default TruckProfile;
