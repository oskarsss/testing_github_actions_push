// import React, { useEffect, useMemo, useState } from 'react';
// import { useForm, UseFormSetValue, WatchInternal } from 'react-hook-form';
// import { Grid, IconButton, Menu, Typography } from '@mui/material';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
// import { LoadingButton } from '@mui/lab';
// import { yupResolver } from '@hookform/resolvers/yup';
// import TextInput from '@/@core/fields/inputs/TextInput';
// import { contact_details_schema } from '@/views/new-loads/views/schema';
// import DraftsTypes from '@/services/drafts/types';
// import { IconContainer } from './styled';
//
// type Props = {
//     watch: WatchInternal<DraftsTypes.Fields>;
//     setValue: UseFormSetValue<DraftsTypes.Fields>;
//     save: (data: object) => void;
// };
//
// const ContactDetails = ({
//     watch,
//     setValue,
//     save
// }: Props) => {
//     const phone_number = watch('broker_contact_phone_number');
//     const email = watch('broker_contact_email');
//
//     const change = useMemo(() => Boolean(phone_number || email), [phone_number, email]);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const open = Boolean(anchorEl);
//
//     const closeMenu = () => {
//         setAnchorEl(null);
//     };
//     const {
//         control,
//         reset,
//         handleSubmit,
//         formState: {
//             errors,
//             isDirty,
//             isValid,
//             isSubmitted
//         }
//     } = useForm<DraftsTypes.BrokerContactProps>({
//         defaultValues: { phone_number: '', email: '' },
//         resolver     : yupResolver(contact_details_schema)
//     });
//     const saveContactDetails = (data: DraftsTypes.BrokerContactProps) => {
//         const {
//             phone_number,
//             email
//         } = data;
//
//         // setValue('broker_contact_phoneumber', phone_number);
//         // setValue('broker_contact_email', email);
//         save({ broker_contact_phone_number: phone_number, broker_contact_email: email });
//     };
//     const send = (data: DraftsTypes.BrokerContactProps) => {
//         saveContactDetails(data);
//         closeMenu();
//     };
//     const onDelete = () => {
//         saveContactDetails({ phone_number: '', email: '' });
//         closeMenu();
//     };
//     useEffect(() => {
//         reset({ phone_number, email });
//     }, [phone_number, email]);
//
//     return (
//         <div>
//             {open && (
//                 <Menu
//                     id="contact-details-menu"
//                     anchorEl={anchorEl}
//                     open={open}
//                     MenuListProps={{
//                         'aria-labelledby': 'basic-button'
//                     }}
//                     onContextMenu={(e) => e.preventDefault()}
//                     TransitionProps={{ timeout: 150 }}
//                     sx={{
//                         '.MuiList-root': { padding: '25px', width: 500, height: '100%' }
//                     }}
//                 >
//                     <form
//                         tabIndex={-1}
//                         autoComplete="off"
//                         onSubmit={handleSubmit(send)}
//                     >
//                         <IconButton
//                             aria-label="close"
//                             style={{ position: 'absolute', top: 8, right: 8 }}
//                             onClick={closeMenu}
//                         >
//                             <CloseOutlinedIcon />
//                         </IconButton>
//                         <IconContainer>
//                             <AddIcCallOutlinedIcon color="primary" />
//                         </IconContainer>
//                         <Typography
//                             variant="h5"
//                             gutterBottom
//                             component="div"
//                         >
//                             {change ? 'Edit contact details' : 'Add contact details'}
//                         </Typography>
//                         <Grid
//                             container
//                             spacing={4}
//                             columns={12}
//                         >
//                             <Grid
//                                 item
//                                 sm={6}
//                             >
//                                 <TextInput
//                                     width="100%"
//                                     name="phone_number"
//                                     label="Phone"
//                                     control={control}
//                                     errors={errors}
//                                     placeholder="+1-800-300-4000"
//                                 />
//                             </Grid>
//                             <Grid
//                                 item
//                                 sm={6}
//                             >
//                                 <TextInput
//                                     width="100%"
//                                     name="email"
//                                     label="E-Mail"
//                                     control={control}
//                                     errors={errors}
//                                     placeholder="logistics@broker.com"
//                                 />
//                             </Grid>
//                             {change ? (
//                                 <>
//                                     <Grid
//                                         item
//                                         sm={6}
//                                     >
//                                         <LoadingButton
//                                             size="large"
//                                             variant="outlined"
//                                             color="error"
//                                             style={{ width: '100%' }}
//                                             onClick={onDelete}
//                                             disabled={!isValid}
//                                             loading={isSubmitted}
//                                         >
//                                             Delete
//                                         </LoadingButton>
//                                     </Grid>
//                                     <Grid
//                                         item
//                                         sm={6}
//                                     >
//                                         <LoadingButton
//                                             size="large"
//                                             type="submit"
//                                             variant="contained"
//                                             style={{ width: '100%' }}
//                                             disabled={!isDirty || !isValid}
//                                             loading={isSubmitted}
//                                         >
//                                             Change
//                                         </LoadingButton>
//                                     </Grid>
//                                 </>
//                             ) : (
//                                 <Grid
//                                     item
//                                     sm={12}
//                                     sx={{ display: 'flex', flexDirection: 'row' }}
//                                 >
//                                     <LoadingButton
//                                         size="large"
//                                         type="submit"
//                                         variant="contained"
//                                         style={{ fontWeight: '600', width: '100%' }}
//                                         disabled={!isDirty || !isValid}
//                                         loading={isSubmitted}
//                                     >
//                                         Confirm
//                                     </LoadingButton>
//                                 </Grid>
//                             )}
//                         </Grid>
//                     </form>
//                 </Menu>
//             )}
//         </div>
//     );
// };
//
// export default ContactDetails;
