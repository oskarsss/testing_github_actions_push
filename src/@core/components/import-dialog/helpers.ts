import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ImportActions } from '@/store/import/slice';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';
import { deleteImportFilesAction } from '@/store/import/actions';
import { ProcessorID } from '../../../../proto_data/ts/v1/import';

const LOCAL_STORAGE_KEY_SELECT = 'import_type_file';

export const saveImportType = (category_id: string, processor_id: ProcessorID) => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SELECT) as string) || {};
    const newData = JSON.stringify({ ...data, [category_id]: processor_id });
    localStorage.setItem(LOCAL_STORAGE_KEY_SELECT, newData);
};

export const getImportType = (category_id: string) => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SELECT) as string) || null;

    if (data) {
        return (data[category_id] as ProcessorID) || ProcessorID.PROCESSOR_UNKNOWN;
    }

    return ProcessorID.PROCESSOR_UNKNOWN;
};

export const convertingSize = (bytes: number, decimals = 2) => {
    if (!+bytes) {
        return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const useImportHelpers = () => {
    const dispatch = useAppDispatch();
    const [removeFile] = StorageGrpcService.useDeleteFileMutation();

    const file_list = useAppSelector(
        (state) => state.import.files_map[state.import.category_id]?.files || {}
    );

    const active_step = useAppSelector((state) => state.import.active_step);

    const performDeleteFiles = useCallback(() => {
        Object.values(file_list).forEach((files) => {
            files.forEach(({ file_path }) => {
                removeFile({ fileId: file_path });
            });
        });

        dispatch(deleteImportFilesAction());
    }, [dispatch, file_list, removeFile]);

    const reset = useCallback(
        ({ isFilesDelete = false }) => {
            if (isFilesDelete) {
                performDeleteFiles();
            }
            dispatch(ImportActions.SetActiveStep(0));
        },
        [performDeleteFiles]
    );

    const handleClose = useCallback(
        (onClose: () => void) => {
            if (active_step >= 2) {
                performDeleteFiles();
            }

            onClose();
        },
        [performDeleteFiles, active_step]
    );

    return { reset, handleClose };
};
