import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import { AppThunkAction } from '../types';

// eslint-disable-next-line import/prefer-default-export
export function documentsInit(): AppThunkAction<void> {
    return function (dispatch) {
        dispatch(DocumentTypesGrpcServices.endpoints.getDocumentTypes.initiate({}));
    };
}
