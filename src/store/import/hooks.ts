import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ImportGrpcService from '@/@grpcServices/services/import.service';
import { deleteImportFilesAction } from '@/store/import/actions';
import Import from './types';
import { ExtractRequest } from '../../../proto_data/ts/v1/import';

type SortRowType = Record<string, Import.Cell>;

export const stableSort = (
    array: Import.RowType[],
    cmp: (a: SortRowType, b: SortRowType) => number
) => {
    const stabilizedThis: [SortRowType, number, Import.RowType][] = array.map((el, index) => {
        const cellsObj = el.cells;
        return [cellsObj, index, el];
    });
    if (stabilizedThis.length > 0) {
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[2]);
    }
    return [];
};

const desc = (a: SortRowType, b: SortRowType, orderBy: Import.OrderByType) => {
    if (orderBy) {
        if (typeof a[orderBy].value === 'string' && typeof b[orderBy].value === 'string') {
            return b[orderBy].value.localeCompare(a[orderBy].value);
        }
        if (b[orderBy].value < a[orderBy].value) {
            return -1;
        }
        if (b[orderBy].value > a[orderBy].value) {
            return 1;
        }
    }

    return 0;
};

const getSorting = (order: Import.OrderType, orderBy: Import.OrderByType) =>
    order === 'desc'
        ? (a: SortRowType, b: SortRowType) => desc(a, b, orderBy)
        : (a: SortRowType, b: SortRowType) => -desc(a, b, orderBy);
const sortedRows = (rows: Import.RowType[], order: Import.OrderType, orderBy: Import.OrderByType) =>
    orderBy ? stableSort(rows, getSorting(order, orderBy)) : rows;

export const useMemoize = (data?: Import.ExtractResponse | null) => {
    const {
        order,
        orderBy
    } = useAppSelector((state) => state.import.filter);

    const sortedData = useMemo(
        () => ({
            columns: data?.result?.columns || {},
            rows   : data?.result ? sortedRows(data.result?.rows, order, orderBy) : [],
            stats  : data?.result?.stats || {
                totalRows       : 0,
                totalRowsValid  : '',
                totalRowsInvalid: '',
                rowsGroupByError: []
            }
        }),
        [data, order, orderBy]
    );

    const isValidTable = useMemo(() => Number(data?.result?.stats?.totalRowsValid) > 0, [data]);

    return {
        data: sortedData,
        isValidTable
    };
};

export type ExtractData = ReturnType<typeof useMemoize>;

export const useImportRequest = () => {
    const dispatch = useAppDispatch();
    const processor_id = useAppSelector((state) => state.import.processor_id);
    const files_map = useAppSelector(
        (state) => state.import.files_map[state.import.category_id]?.files || {}
    );

    const [extract, extract_result] = ImportGrpcService.useExtractMutation();
    const [postImport, import_result] = ImportGrpcService.useImportMutation();

    const importData = useCallback(() => {
        if (!Object.keys(files_map).length) return;
        const files: ExtractRequest['files'] = {};
        Object.entries(files_map).forEach(([key, value]) => {
            files[key] = {
                filePath: value.map((file) => file.file_path)
            };
        });

        postImport({
            processorId: processor_id,
            files
        })
            .unwrap()
            .then(() => {
                dispatch(deleteImportFilesAction());
            });
    }, [files_map, processor_id, dispatch, postImport]);

    const extractData = useCallback(() => {
        if (!Object.keys(files_map).length) return;
        const files: ExtractRequest['files'] = {};
        Object.entries(files_map).forEach(([key, value]) => {
            files[key] = {
                filePath: value.map((file) => file.file_path)
            };
        });

        extract({
            processorId: processor_id,
            files
        });
    }, [extract, files_map, processor_id]);

    const memoizedImportData = useMemoize(import_result.data);
    const memoizedExtractData = useMemoize(extract_result.data);

    return {
        memoizedImportData,
        memoizedExtractData,
        import_result,
        extract_result,
        importData,
        extractData
    };
};
