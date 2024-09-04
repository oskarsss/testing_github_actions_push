/* eslint-disable max-len */
// import VectorIcons from '@/@core/icons/vector_icons';
// import LoadsTypes from '@/services/dispatch/loads/types';
// import { Box, Stack } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import ButtonMui from '@mui/material/Button';
// import { useAddDriverPay } from '@/views/dispatch/loads/dialogs/EditLoad/components/EditLoadDriverPayItems/dialogs/CreateDriverPay';
// import NoDrivers from '@/views/dispatch/loads/dialogs/EditLoad/components/EditLoadDriverPayItems/NoDrivers';
// import DriverInfo from '@/views/dispatch/loads/dialogs/EditLoad/components/EditLoadDriverPayItems/ui-elements/driver-info/DriverInfo';
// import DriverPayItemsTable from '@/@core/ui-kits/loads/driver-pay-items-table/DriverPayItemsTable';
// import { useAppTranslation } from '@/hooks/useAppTranslation';
// import LoadDetailsViewStyled from '../../../../LoadDetailsView.styled';

// type Props = {
//     load: LoadData_Load;
// };

// const LoadDriverPay = ({ load }: Props) => {
//     const addDriverPayDialog = useAddDriverPay();
//     const {t} = useAppTranslation('loads:details.tabs.financials');

//     return (
//         <div>
//             <Stack
//                 flexDirection="row"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 marginBottom="16px"
//             >
//                 <LoadDetailsViewStyled.FlexContainer style={{ padding: '0 8px', gap: '4px' }}>
//                     <VectorIcons.NavIcons.Truck size={24} />
//                     <LoadDetailsViewStyled.Title style={{ fontSize: '16px' }}>
//                         {t('titles.driver_pay')}
//                     </LoadDetailsViewStyled.Title>
//                 </LoadDetailsViewStyled.FlexContainer>
//                 <ButtonMui
//                     variant="text"
//                     color="primary"
//                     size="small"
//                     sx={{ fontSize: '12px' }}
//                     disabled={load.drivers.length >= 5}
//                     startIcon={<AddIcon />}
//                     onClick={() =>
//                         addDriverPayDialog.open({
//                             load_id         : load.loadId,
//                             load_driver     : load.drivers,
//                             load_friendly_id: load?.friendlyId || 0
//                         })}
//                 >
//                     {t('buttons.add_driver')}
//                 </ButtonMui>
//             </Stack>

//             <Stack
//                 direction="column"
//                 gap={4}
//             >
//                 {load.drivers.length > 0 && load?.firstDriver?.driverId ? (
//                     load.drivers.map((driver) => (
//                         <Stack
//                             key={driver.driverId}
//                             borderRadius="8px"
//                             paddingBottom="14px !important"
//                             border={(theme) =>
//                                 `1px solid ${theme.palette.semantic.border.secondary}`}
//                         >
//                             <DriverInfo
//                                 driver={driver}
//                                 load_id={load.loadId}
//                             />
//                             <Box padding="12px 16px 6px 16px">
//                                 <DriverPayItemsTable
//                                     loadId={load.loadId}
//                                     driverPayItems={load.driverPayItems}
//                                     driverId={driver.driverId}
//                                     driverNet={driver.driverNet}
//                                 />
//                             </Box>
//                         </Stack>
//                     ))
//                 ) : (
//                     <NoDrivers />
//                 )}
//             </Stack>
//         </div>
//     );
// };

// export default LoadDriverPay;
