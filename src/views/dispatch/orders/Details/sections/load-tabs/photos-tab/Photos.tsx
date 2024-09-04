// import React, { useEffect, useState } from 'react';
// import { initLightboxJS } from 'lightbox.js-react';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// import { LIGHTBOX_JS_KEY } from '@/configs';

// import 'lightbox.js-react/dist/index.css';
// import LoadsTypes from '@/services/dispatch/loads/types';
// import { useAppTranslation } from '@/hooks/useAppTranslation';
// import Gallery from './Gallery';

// export default function Photos({ load }: { load: LoadsTypes.Load.Load }) {
//     const [selected, setSelected] = useState(0);
//     const {t} = useAppTranslation('loads:details.tabs.photos');

//     useEffect(() => {
//         initLightboxJS(LIGHTBOX_JS_KEY, 'profile');
//     }, []);

//     if (load.vehicles && load.vehicles.length === 0) {
//         return (
//             <p
//                 style={{
//                     width    : '100%',
//                     textAlign: 'center'
//                 }}
//             >
//                 No photo!
//             </p>
//         );
//     }

//     if (load.vehicles && !load.vehicles[selected]) {
//         setSelected(0);
//         return <div>VECHILS </div>;
//     }

//     return (
//         <div>
//             <FormControl
//                 variant="filled"
//                 sx={{ minWidth: 120 }}
//                 fullWidth
//             >
//                 <Select
//                     labelId="select"
//                     id="select"
//                     value={selected}
//                     onChange={(e) => setSelected(Number(e.target.value))}
//                 >
//                     {load.vehicles &&
//                         load.vehicles.map((item, index) => {
//                             const vin = item.vin ? `${t('vin')}:${item.vin}` : '';
//                             const title = `${item.photosUrl.length} ${t('photos')}: ${
//                                 item.make || ''
//                             } ${item.model || ''} ${item.year || ''} ${vin}`;
//                             return (
//                                 <MenuItem
//                                     key={item.vehicleId}
//                                     value={index}
//                                 >
//                                     {title}
//                                 </MenuItem>
//                             );
//                         })}
//                 </Select>
//             </FormControl>
//             {load.vehicles && <Gallery item={load.vehicles[selected]} />}
//         </div>
//     );
// }
