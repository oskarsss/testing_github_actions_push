/* eslint-disable max-len */
// import { useAppSelector } from '@/services/hooks';
// import Typography from '@mui/material/Typography';
// import { useTrailerQuery } from '@/services/fleet/trailers/hooks';
// import LayerWrapper from '@/views/map/left_panel/details/reusable/LayerWrapper';
// import VectorIcons from '@/@core/icons/vector_icons';
// import { HeadWrapper } from './styled';
//
// export default function TrailerProfile() {
//     const selected_trailer_id = useAppSelector((state) => state.map.selected.trailer_id);
//     const { trailer } = useTrailerQuery({ trailerId: selected_trailer_id });
//
//     if (!trailer) {
//         return null;
//     }
//
//     return (
//         <LayerWrapper type="trailer">
//             <HeadWrapper>
//                 <VectorIcons.NavIcons.Trailer />
//                 <Typography variant="h5">{trailer.reference_id}</Typography>
//             </HeadWrapper>
//
//             <Typography
//                 marginBottom="10px"
//                 marginTop="10px"
//                 variant="body2"
//             >
//                 {trailer.year} {trailer.make} {trailer.model}
//             </Typography>
//
//             <Typography variant="body2">
//                 <span style={{ fontWeight: 'bold' }}>Company</span>: {trailer.trailerCompany?.name}
//             </Typography>
//
//             <Typography variant="body2">
//                 <span style={{ fontWeight: 'bold' }}>Type</span>: {trailer.trailerType?.name}
//             </Typography>
//
//             <Typography variant="body2">
//                 <span style={{ fontWeight: 'bold' }}>VIN</span>: {trailer.vin}
//             </Typography>
//
//             <Typography
//                 variant="h5"
//                 marginTop="65px"
//             >
//                 Truck Linked: {trailer.truck ? `#${trailer.truck.reference_id}` : 'No Truck'}
//             </Typography>
//         </LayerWrapper>
//     );
// }
