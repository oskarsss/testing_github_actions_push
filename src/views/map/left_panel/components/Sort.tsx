// import { useState } from 'react';
// import Stack from '@mui/material/Stack';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { SortIconSvg } from '@/views/map/svg';
//
// const Sort = () => {
//     const [age, setAge] = useState('');
//
//     const handleChange = (event: SelectChangeEvent) => {
//         setAge(event.target.value as string);
//     };
//
//     return (
//         <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             spacing={3}
//             marginTop="14px"
//         >
//             <FormControl
//                 fullWidth
//                 size="small"
//             >
//                 <InputLabel id="sort-simple-select-label">Sort By</InputLabel>
//                 <Select
//                     labelId="sort-simple-select-label"
//                     id="sort-simple-select"
//                     value={age}
//                     label="Age"
//                     onChange={handleChange}
//                 >
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//             </FormControl>
//
//             <SortIconSvg />
//
//             <FormControl
//                 fullWidth
//                 size="small"
//             >
//                 <InputLabel id="dispatchers-simple-select-lable">Dispatchers</InputLabel>
//                 <Select
//                     labelId="dispatchers-simple-select-lable"
//                     id="dispatchers-simple-select"
//                     value={age}
//                     label="Dispatchers"
//                     onChange={handleChange}
//                 >
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//             </FormControl>
//         </Stack>
//     );
// };
//
// export default Sort;
