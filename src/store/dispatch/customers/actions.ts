import { AppThunkAction } from '@/store/types';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { getEntitiesDocumentsThunk } from '@/store/documents/slice';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';

// eslint-disable-next-line import/prefer-default-export
export function customersInit(refetch = true): AppThunkAction<Promise<void>> {
    return function (dispatch) {
        return new Promise((resolve) => {
            dispatch(
                CustomersGrpcService.endpoints.getCustomers.initiate(
                    {},
                    {
                        forceRefetch: refetch
                    }
                )
            )
                .unwrap()
                .then(({ customers }) => {
                    const entityIds = customers.map((customer) => customer.customerId);
                    dispatch(
                        getEntitiesDocumentsThunk({
                            entities: [
                                {
                                    entityIds,
                                    entityType: DocumentModel_DocumentEntityType.CUSTOMER
                                }
                            ]
                        })
                    );
                });
            // eslint-disable-next-line no-promise-executor-return
            return resolve();
        });
    };
}
