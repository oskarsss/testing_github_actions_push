import { AppThunkAction } from '@/store/types';
import ServiceProvidersGrpcService from '@/@grpcServices/services/maitenance-service/service-providers.service';

// export function serviceProvidersInit(refetch = true): AppThunkAction<Promise<void>> {
//     return function (dispatch) {
//         return new Promise((resolve) => {
//             dispatch(
//                 ServiceProvidersGrpcService.endpoints.getServiceProviders.initiate(
//                     {},
//                     {
//                         forceRefetch: refetch
//                     }
//                 )
//             ).unwrap();

//             // eslint-disable-next-line no-promise-executor-return
//             return resolve();
//         });
//     };
// }
