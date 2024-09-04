import { AppThunkAction } from '@/store/types';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { getEntitiesDocumentsThunk } from '@/store/documents/slice';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';

export function trailersInit(refetch = true): AppThunkAction<Promise<void>> {
    return function (dispatch) {
        return new Promise((resolve) => {
            // dispatch(
            //     TrailersGrpcService.endpoints.getTrailers.initiate(
            //         {},
            //         {
            //             forceRefetch: refetch
            //         }
            //     )
            // )
            //     .unwrap()
            //     .then(({ trailers }) => {
            //         const entityIds = trailers.map((trailer) => trailer.trailerId);

            //         dispatch(
            //             getEntitiesDocumentsThunk({
            //                 entities: [
            //                     {
            //                         entityIds,
            //                         entityType: DocumentModel_DocumentEntityType.TRAILER
            //                     }
            //                 ]
            //             })
            //         );
            //     });

            dispatch(TrailerCompaniesGrpcService.endpoints.getTrailerCompanies.initiate({}))
                .unwrap()
                .then((companies) => {
                    const companiesIds = companies.trailerCompanies.map(
                        (company) => company.trailerCompanyId
                    );
                    dispatch(
                        getEntitiesDocumentsThunk({
                            entities: [
                                {
                                    entityIds : companiesIds,
                                    entityType: DocumentModel_DocumentEntityType.TRAILER_COMPANY
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
