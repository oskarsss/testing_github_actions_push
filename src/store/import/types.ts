import {
    ExtractReply,
    GetImportConfigReply_Category,
    GetImportConfigReply_Category_Processor,
    GetImportConfigReply_Category_Processor_RequiredFile,
    ImportResult_Row,
    ImportResult_Row_Cell,
    ProcessorID
} from '../../../proto_data/ts/v1/import';

/** Import */
namespace Import {
    export type RequiredFile = GetImportConfigReply_Category_Processor_RequiredFile;
    export type ProcessorType = GetImportConfigReply_Category_Processor;
    export type Category = GetImportConfigReply_Category;
    export type Cell = ImportResult_Row_Cell;
    export type RowType = ImportResult_Row;
    export type ExtractResponse = ExtractReply;
    export type CategoryId =
        | 'fuel'
        | 'tolls'
        | 'trucks'
        | 'drivers'
        | 'trailers'
        | 'loads'
        | 'plates'
        | 'vendors'
        | 'customers'
        | 'brokers';

    export type OrderByType = null | string;
    export type OrderType = 'asc' | 'desc';

    export type Filter = {
        orderBy: OrderByType;
        order: OrderType;
    };

    export namespace Redux {
        type FileLocal = {
            file_path: string;
            file_name: string;
            file_size: string;
        };

        export type UpdateFilesPayload = {
            required_file: RequiredFile;
            files: FileLocal[];
        };

        export type UpdateCategoryIdPayload = {
            category_id: CategoryId;
        };

        export type UpdateProcessorIdPayload = {
            processor_id: ProcessorID;
        };

        export type DeleteFilePayload = {
            required_file: RequiredFile;
            file_path: string;
        };

        export type InitialState = {
            filter: Filter;
            active_step: number;
            category_id: CategoryId;
            processor_id: ProcessorID;
            files_map: {
                [key: string]: {
                    files: {
                        [key: string]: FileLocal[];
                    };
                };
            };
        };
    }
}

export default Import;
