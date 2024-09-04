import { AppDispatch } from '@/store/types';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';
import { getEntitiesDocumentsThunk } from '@/store/documents/slice';

// eslint-disable-next-line import/prefer-default-export
export function vendorsInit(refetch = false) {
    return function (dispatch: AppDispatch) {
        dispatch(
            VendorsGrpcService.endpoints.getVendors.initiate(
                {},
                {
                    forceRefetch: refetch
                }
            )
        )
            .unwrap()
            .then(({ vendors }) => {
                const entityIds = vendors.map((vendor) => vendor.vendorId);
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds,
                                entityType: DocumentModel_DocumentEntityType.VENDOR
                            }
                        ]
                    })
                );
            });
    };
}
