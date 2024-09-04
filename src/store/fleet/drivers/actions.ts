// eslint-disable-next-line import/no-named-as-default
import { AppThunkAction } from '@/store/types';
import DriverTypesGrpcService from '@/@grpcServices/services/settings-service/driver-types.service';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { getEntitiesDocumentsThunk } from '@/store/documents/slice';

// eslint-disable-next-line import/prefer-default-export
export function driversInit(refetch = true): AppThunkAction<Promise<void>> {
    return function (dispatch) {
        return new Promise((resolve) => {
            // dispatch(
            //     DriversGrpcService.endpoints.getDrivers.initiate(
            //         {},
            //         {
            //             forceRefetch: refetch
            //         }
            //     )
            // )
            //     .unwrap()
            //     .then(({ drivers }) => {
            //         const entityIds = drivers.map((driver) => driver.driverId);
            //         dispatch(
            //             getEntitiesDocumentsThunk({
            //                 entities: [
            //                     {
            //                         entityIds,
            //                         entityType: DocumentModel_DocumentEntityType.DRIVER
            //                     }
            //                 ]
            //             })
            //         );
            //     });
            dispatch(
                DriverTypesGrpcService.endpoints.getDriverTypes.initiate(
                    {},
                    {
                        forceRefetch: refetch
                    }
                )
            );

            // eslint-disable-next-line no-promise-executor-return
            return resolve();
        });
    };
}
