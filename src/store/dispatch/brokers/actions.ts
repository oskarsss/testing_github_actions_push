import { AppThunkAction } from '@/store/types';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { getEntitiesDocumentsThunk } from '@/store/documents/slice';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';

// eslint-disable-next-line import/prefer-default-export
export function brokersInit(refetch = true): AppThunkAction<Promise<void>> {
    return function (dispatch) {
        return new Promise((resolve) => {
            dispatch(
                BrokersGrpcService.endpoints.getBrokers.initiate(
                    {},
                    {
                        forceRefetch: refetch
                    }
                )
            )
                .unwrap()
                .then(({ brokers }) => {
                    const entityIds = brokers.map((broker) => broker.brokerId);
                    dispatch(
                        getEntitiesDocumentsThunk({
                            entities: [
                                {
                                    entityIds,
                                    entityType: DocumentModel_DocumentEntityType.BROKER
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
