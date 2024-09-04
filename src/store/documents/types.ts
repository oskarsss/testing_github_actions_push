import {
    DocumentModel_Status,
    DocumentModel_Type,
    DocumentModel_Document
} from '@proto/models/model_document';

/** Documents */
namespace Documents {
    export type Status = DocumentModel_Status;

    // export type Document = {
    //     document_type_id: string;
    //     unique_key: string;
    //     url: string;
    //     number: string;
    //     state: string;
    //     expires_at: string;
    //     status: Status;
    //     created_at: string;
    //     doc_type_title: string;
    //     doc_type_state_supported: boolean;
    //     doc_type_status_supported: boolean;
    //     doc_type_state: any;
    //     doc_type_expirable: boolean;
    //     doc_type_number_supported: boolean;
    //     doc_type_can_driver_update: boolean;
    //     doc_type_can_driver_view: boolean;
    //     expired: boolean;

    //     /**
    //      *
    //      *
    //      * document_type_id: string;
    //     unique_key: string;
    //     url: string;
    //     status: Status;

    //     added_by: string | null;
    //     doc_type_can_driver_update: boolean;
    //     doc_type_can_driver_view: boolean;
    //     doc_type_expirable: boolean;
    //     doc_type_number_supported: boolean;
    //     doc_type_state: string;
    //     doc_type_state_supported: boolean;
    //     doc_type_status_supported: boolean;
    //     doc_type_title: string;
    //     expired: boolean | number;
    //     expires_at: string;
    //     number: string;
    //     state: string;

    //     created_at: string;
    //      */
    // };

    export type Document = DocumentModel_Document;

    export type List = Document[];

    export type DocumentType = DocumentModel_Type;

    export type ConvertedDocument = Document & {
        documentType: DocumentType | null;
    };

    // export namespace API {
    //     export namespace DocumentType {
    //         export namespace Get {
    //             export type Request = null;

    //             export type Response = APIResponse<{
    //                 document_types: Documents.DocumentType[];
    //             }>;
    //         }

    //         export namespace Delete {
    //             export type Request = {
    //                 id: DocumentType['document_type_id'];
    //                 entity_type: EntityType;
    //             };

    //             export type Response = APIResponse<{
    //                 document_type: {
    //                     document_type_id: DocumentType['document_type_id'];
    //                 };
    //             }>;
    //         }

    //         export namespace UpdateOrder {
    //             export type Request = APIRequestBody<{
    //                 document_types: Record<string, number>;
    //             }> &
    //                 APIRequestParams<{
    //                     entity_type: EntityType;
    //                 }>;

    //             export type Response = APIResponse;
    //         }

    //         export namespace Update {
    //             export type Request = APIRequestBody<{
    //                 title: string;
    //                 state_supported: boolean;
    //                 state: string;
    //                 expirable: boolean;
    //                 number_supported: boolean;
    //                 required: boolean;
    //                 can_driver_view: boolean;
    //                 can_driver_update: boolean;
    //                 status_supported: boolean;
    //                 entity_type: EntityType;
    //             }> &
    //                 APIRequestParams<{
    //                     entity_type: EntityType;
    //                     document_type_id: DocumentType['document_type_id'];
    //                 }>;
    //             export type Response = APIResponse<{
    //                 document_type: DocumentType & {
    //                     created_at: string;
    //                     updated_at: string;
    //                     deleted: boolean;
    //                     status_supported: boolean;
    //                 };
    //             }>;
    //         }

    //         export namespace Create {
    //             export type Request = APIRequestBody<{
    //                 title: string;
    //                 state_supported?: boolean;
    //                 state?: string;
    //                 expirable?: boolean;
    //                 number_supported?: boolean;
    //                 required?: boolean;
    //                 can_driver_view?: boolean;
    //                 can_driver_update?: boolean;
    //                 status_supported?: boolean;
    //             }> &
    //                 APIRequestParams<{
    //                     entity_type: EntityType;
    //                 }>;

    //             export type Response = APIResponse<{
    //                 document_type: DocumentType;
    //             }>;
    //         }
    //     }
    // }
}

export default Documents;
