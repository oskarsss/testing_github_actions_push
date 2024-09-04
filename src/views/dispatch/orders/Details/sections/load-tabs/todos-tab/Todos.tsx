// // @ts-nocheck
// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
//
// import AddIcon from '@mui/icons-material/Add';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//
// import { List, Progress } from './styled';
// import LoadDetailsViewStyled from '../../../LoadDetailsView.styled';
//
// type item = {
//     id: string;
//     text: string;
//     order: number;
//     completed: boolean;
// };
//
// const data = [
//     {
//         id       : 1,
//         order    : 1,
//         text     : 'Test 1',
//         completed: false
//     },
//     {
//         id       : 2,
//         order    : 2,
//         text     : 'Test 2',
//         completed: true
//     },
//     {
//         id       : 3,
//         order    : 3,
//         text     : 'Test 3',
//         completed: false
//     }
// ];
//
// const initialSelected: { id: null | string; value: string; order: number } = {
//     id   : null,
//     value: '',
//     order: 0
// };
// const initialOnDrag: { id: null | number; order: number } = { id: null, order: 0 };
// export default function Todos() {
//     const [items, setItems] = useState<item[]>(data);
//     const [selected, setSelected] = useState(initialSelected);
//     const [onDrag, setOnDrag] = useState(initialOnDrag);
//
//     const complete = items.filter((item) => item.completed).length;
//     const onCheckboxClick = (event: React.MouseEvent, id: string) => {
//         event.stopPropagation();
//         setItems(
//             items.map((item) => {
//                 if (item.id === id) {
//                     return {
//                         ...item,
//                         completed: !item.completed
//                     };
//                 }
//                 return item;
//             })
//         );
//     };
//
//     const onClickItem = (event: React.MouseEvent<HTMLLIElement>, id: string) => {
//         event.stopPropagation();
//
//         const data = () => {
//             if (selected.id === id) {
//                 return initialSelected;
//             }
//             const item = items.find((item) => item.id === id);
//             return {
//                 id,
//                 value: item?.text || '',
//                 order: item?.order || 0
//             };
//         };
//         setSelected(data());
//     };
//
//     const onDeleteItem = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
//         event.stopPropagation();
//         setItems(items.filter((item) => item.id !== id));
//         setSelected(initialSelected);
//     };
//
//     const saveAndClose = () => {
//         if (selected.id) {
//             setItems(
//                 items.map((item) => {
//                     if (item.id === selected.id) {
//                         return {
//                             ...item,
//                             text: selected.value
//                         };
//                     }
//                     return item;
//                 })
//             );
//             setSelected(initialSelected);
//         }
//     };
//
//     const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setSelected((prev) => ({
//             ...prev,
//             value: event.target.value
//         }));
//     };
//
//     const onAddTask = () => {
//         const newOrder = items.length
//             ? [...items].sort((a, b) => a.order - b.order).slice(-1)[0].order + 1
//             : 1;
//
//         const newId = items.length ? [...items]
//         .sort((a, b) => a.id - b.id).slice(-1)[0].id + 1 : 1;
//
//         setItems([...items, { id: newId, order: newOrder, text: '', completed: false }]);
//         setSelected({ id: newId, order: newOrder, value: '' });
//     };
//
//     const onDragLeave = (id: string) => {
//         if (onDrag.id === id) {
//             setOnDrag(initialOnDrag);
//         }
//     };
//
//     const onDragEnd = () => {
//         if (onDrag.id === 0) {
//             setItems(
//                 items.map((item) => ({
//                     ...item,
//                     order: item.id === selected.id ? 1 : item.order + 1
//                 }))
//             );
//             setOnDrag(initialOnDrag);
//             setSelected(initialSelected);
//             return;
//         }
//
//         if (onDrag.id !== null) {
//             setItems(
//                 items.map((item) => {
//                     if (selected.order > onDrag.order) {
//                         return {
//                             ...item,
//
//                             order:
//                                 // eslint-disable-next-line max-len,no-nested-ternary
//                                 item.order === selected.order
//                                     ? onDrag.order + 1
//                                     : item.order > onDrag.order
//                                         ? item.order + 1
//                                         : item.order
//                         };
//                     }
//                     if (item.id === selected.id) {
//                         return {
//                             ...item,
//                             order: onDrag.order
//                         };
//                     }
//                     if (item.id === onDrag.id) {
//                         return {
//                             ...item,
//                             order: selected.order
//                         };
//                     }
//                     return item;
//                 })
//             );
//             setOnDrag(initialOnDrag);
//             setSelected(initialSelected);
//         }
//     };
//
//     const onDragOver = (event: React.DragEvent<HTMLSpanElement>, id: string, order: number) => {
//         event.preventDefault();
//         if (onDrag.id !== id) {
//             setOnDrag({ id, order });
//         }
//     };
//
//     return (
//         // eslint-disable-next-line max-len
//         // eslint-disable-next-line jsx-a11y/click-events-have-key-events,
//         jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/no-static-element-interactions
//         <div
//             onClick={saveAndClose}
//             style={{ padding: '16px', minHeight: 'calc(100% - 16px)' }}
//         >
//             <LoadDetailsViewStyled.FlexContainer
//                 style={{ justifyContent: 'space-between', marginBottom: '16px' }}
//             >
//                 <LoadDetailsViewStyled.FlexContainer>
//                     <LoadDetailsViewStyled.Title style={{ fontSize: '16px' }}>
//                         To-do’s
//                     </LoadDetailsViewStyled.Title>
//                     <LoadDetailsViewStyled.FlexContainer>
//                         <Progress>
//                             <span
//                                 style={{
//                                     width: `${
//                                         items.length === 0 ? 0 : (complete / items.length) * 100
//                                     }%`
//                                 }}
//                             />
//                         </Progress>
//                         <LoadDetailsViewStyled.Description>
//                             <span>{`${complete}/${items.length}`}</span>
//                         </LoadDetailsViewStyled.Description>
//                     </LoadDetailsViewStyled.FlexContainer>
//                 </LoadDetailsViewStyled.FlexContainer>
//                 <div>
//                     <Button
//                         onClick={onAddTask}
//                         sx={{ padding: '4px 8px' }}
//                         startIcon={<AddIcon />}
//                     >
//                         Add task
//                     </Button>
//                 </div>
//             </LoadDetailsViewStyled.FlexContainer>
//             <List>
//                 <span
//                     onDragOver={(e) => onDragOver(e, 0, 0)}
//                     onDragLeave={() => onDragLeave(0)}
//                     style={{
//                         backgroundColor: onDrag.id === 0 ? '#2267FF' : '',
//                         height         : onDrag.id === 0 ? '30px' : '8px',
//                         width          : '100%',
//                         transition     : 'background-color 0.2s, height 0.2s',
//                         display        : 'block'
//                     }}
//                 />
//
//                 {items
//                     .sort((a, b) => a.order - b.order)
//                     .map((item) => {
//                         const {
//                             text,
//                             id,
//                             completed,
//                             order
//                         } = item;
//                         const active = id === selected.id;
//                         // eslint-disable-next-line max-len
//                         const isDrag =
//                             onDrag.id === id &&
//                             !active &&
//                             (selected.order > order ? selected.order - order > 1 : true);
//
//                         return (
//                             <React.Fragment key={id}>
//                                 {/* eslint-disable-next-line max-len */}
//                                 {/* eslint-disable-next-line
//                                 jsx-a11y/click-events-have-key-events,
//                                 jsx-a11y/no-noninteractive-element-interactions */}
//                                 <li
//                                     key={id}
//                                     draggable={active}
//                                     style={{
//                                         cursor : active ? 'grab' : 'pointer',
//                                         opacity: completed ? 0.5 : 1
//                                     }}
//                                     className={active ? 'active' : ''}
//                                     onDragEnd={onDragEnd}
//                                     onClick={(e) => onClickItem(e, id)}
//                                 >
//                                     {active && <DragIndicatorIcon color="secondary" />}
//                                     <Checkbox
//                                         sx={(theme) => ({
//                                             color  : theme.palette.semantic.text.secondary,
//                                             padding: '2px',
//                                             width  : '24px',
//                                             height : '24px'
//                                         })}
//                                         checked={completed}
//                                         onClick={(e) => onCheckboxClick(e, id)}
//                                     />
//
//                                     <TextField
//                                         multiline
//                                         name={`todo-${id}`}
//                                         disabled={!active}
//                                         sx={{ textDecoration: completed
//                                         ? 'line-through' : 'none' }}
//                                         value={active ? selected.value : text}
//                                         onChange={onChangeText}
//                                         onClick={(e) => {
//                                             if (active) {
//                                                 e.stopPropagation();
//                                             }
//                                         }}
//                                         maxRows={4}
//                                     />
//
//                                     {active && (
//                                         <IconButton
//                                             sx={{ padding: '2px' }}
//                                             onClick={(e) => onDeleteItem(e, id)}
//                                         >
//                                             <DeleteOutlineIcon
//                                                 sx={{ fontSize: '20px' }}
//                                                 color="secondary"
//                                             />
//                                         </IconButton>
//                                     )}
//                                 </li>
//                                 <span
//                                     onDragOver={(e) => onDragOver(e, id, order)}
//                                     onDragLeave={() => onDragLeave(id)}
//                                     style={{
//                                         backgroundColor: isDrag ? '#2267FF' : '',
//                                         height         : isDrag ? '30px' : '8px',
//                                         width          : '100%',
//                                         transition     : 'background-color 0.2s, height 0.2s',
//                                         display        : 'block'
//                                     }}
//                                 />
//                             </React.Fragment>
//                         );
//                     })}
//             </List>
//         </div>
//     );
// }
