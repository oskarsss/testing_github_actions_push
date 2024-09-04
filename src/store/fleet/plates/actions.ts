/* eslint-disable import/prefer-default-export */
import { AppDispatch } from '@/store/types';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { getEntitiesDocumentsThunk } from '@/store/documents/slice';
import PlateCompaniesGrpcService from '@/@grpcServices/services/plate-companies.service';
import PlatesGrpcService from '@/@grpcServices/services/plates.service';

export function platesInit(refetch = false) {
    return function (dispatch: AppDispatch) {
        dispatch(
            PlatesGrpcService.endpoints.getPlates.initiate(
                {},
                {
                    forceRefetch: refetch
                }
            )
        )
            .unwrap()
            .then(({ plates }) => {
                const entityIds = plates.map((plate) => plate.plateId);
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds,
                                entityType: DocumentModel_DocumentEntityType.PLATE
                            }
                        ]
                    })
                );
            });

        dispatch(PlateCompaniesGrpcService.endpoints.getPlateCompanies.initiate({}))
            .unwrap()
            .then(({ plateCompanies }) => {
                const companiesIds = plateCompanies.map((company) => company.plateCompanyId);
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds : companiesIds,
                                entityType: DocumentModel_DocumentEntityType.PLATE_COMPANY
                            }
                        ]
                    })
                );
            });
    };
}
