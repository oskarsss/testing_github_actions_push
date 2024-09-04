import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FileModel_MimeType } from '@proto/models/model_file';
import { fileReader, readMultipleFiles } from '@/utils/file-reader';
import { StorageFilesUploadRequest_File } from '@proto/storage';
import toast from 'react-hot-toast';
import { FilesActions } from '@/store/files/slice';
import StorageGrpcService, { StorageClient } from './storage.service';

const MIME_TYPES_MAP: Record<FileModel_MimeType, string> = {
    [FileModel_MimeType.UNSPECIFIED]: '',
    [FileModel_MimeType.PNG]        : 'image/png',
    [FileModel_MimeType.JPEG]       : 'image/jpeg',
    [FileModel_MimeType.GIF]        : 'image/gif',
    [FileModel_MimeType.PDF]        : 'application/pdf',
    [FileModel_MimeType.MP3]        : 'audio/mpeg',
    [FileModel_MimeType.MP4]        : 'video/mp4',
    [FileModel_MimeType.MOV]        : 'video/quicktime',
    [FileModel_MimeType.WEBP]       : 'image/webp',
    [FileModel_MimeType.SVG]        : 'image/svg+xml',
    [FileModel_MimeType.ZIP]        : 'application/zip',
    [FileModel_MimeType.DOC]        : 'application/msword',
    [FileModel_MimeType.DOCX]:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    [FileModel_MimeType.XLS] : 'application/vnd.ms-excel',
    [FileModel_MimeType.XLSX]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    [FileModel_MimeType.PPT] : 'application/vnd.ms-powerpoint',
    [FileModel_MimeType.PPTX]:
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    [FileModel_MimeType.CSV]: 'text/csv',
    [FileModel_MimeType.TXT]: 'text/plain',
    [FileModel_MimeType.JPG]: 'image/jpeg'
};

export const MIME_TYPES_MAP_REVERSE: Record<string, FileModel_MimeType> = {
    ''                  : FileModel_MimeType.UNSPECIFIED,
    'image/png'         : FileModel_MimeType.PNG,
    'image/jpeg'        : FileModel_MimeType.JPEG,
    'image/gif'         : FileModel_MimeType.GIF,
    'application/pdf'   : FileModel_MimeType.PDF,
    'audio/mpeg'        : FileModel_MimeType.MP3,
    'video/mp4'         : FileModel_MimeType.MP4,
    'video/quicktime'   : FileModel_MimeType.MOV,
    'image/webp'        : FileModel_MimeType.WEBP,
    'image/svg+xml'     : FileModel_MimeType.SVG,
    'application/zip'   : FileModel_MimeType.ZIP,
    'application/msword': FileModel_MimeType.DOC,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        FileModel_MimeType.DOCX,
    'application/vnd.ms-excel'                                         : FileModel_MimeType.XLS,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileModel_MimeType.XLSX,
    'application/vnd.ms-powerpoint'                                    : FileModel_MimeType.PPT,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        FileModel_MimeType.PPTX,
    'text/csv'  : FileModel_MimeType.CSV,
    'text/plain': FileModel_MimeType.TXT
};

export const useLazyRetrieveFileStream = () => {
    const {
        company_id,
        token
    } = useAppSelector((state) => state.app);
    const storeFiles = useAppSelector((state) => state.files);

    const retrieveFileStream = useCallback(
        (
            fileId: string
        ): Promise<{ blobUrl: string; name: string; mimeType: FileModel_MimeType }> =>
            new Promise((resolve, reject) => {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    ...(company_id ? { company_id } : {})
                };
                if (storeFiles[fileId]) {
                    resolve(storeFiles[fileId]);
                    return;
                }

                const stream = StorageClient.storageFileRetrieve({ fileId }, { meta: headers });

                const chunks: Uint8Array[] = [];
                let mimeType: FileModel_MimeType = FileModel_MimeType.PDF;
                let name = '';
                stream.responses.onMessage((res) => {
                    chunks.push(res.chunk);
                    if (res.mimeType) {
                        mimeType = res.mimeType;
                    }
                    if (res.name) {
                        name = res.name;
                    }
                });

                stream.responses.onError((err) => {
                    console.error('useRetrieveFileStream ERROR', err);
                    resolve({
                        blobUrl: '',
                        name,
                        mimeType
                    });
                });

                stream.responses.onComplete(() => {
                    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);

                    const joinedArray = new Uint8Array(totalLength);

                    let offset = 0;
                    chunks.forEach((chunk) => {
                        joinedArray.set(chunk, offset);
                        offset += chunk.length;
                    });
                    const blob = new Blob([joinedArray], { type: MIME_TYPES_MAP[mimeType] });
                    const url = URL.createObjectURL(blob);

                    resolve({
                        blobUrl: url,
                        name,
                        mimeType
                    });
                });
            }),
        [company_id, token]
    );

    return { retrieveFileStream };
};

export const useRetrieveFileStream = (fileId?: string) => {
    const storeFile = useAppSelector((state) => state.files[fileId || '']);
    const dispatch = useAppDispatch();

    const data = useMemo(
        () => storeFile || { blobUrl: '', name: '', mimeType: FileModel_MimeType.PDF },
        [storeFile]
    );

    const {
        company_id,
        token
    } = useAppSelector((state) => state.app);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const Abort = new AbortController();
        if (fileId && !storeFile) {
            const headers = {
                Authorization: `Bearer ${token}`,
                ...(company_id ? { company_id } : {})
            };

            setIsLoading(true);

            const stream = StorageClient.storageFileRetrieve(
                { fileId },
                {
                    meta : headers,
                    abort: Abort.signal
                }
            );

            const chunks: Uint8Array[] = [];
            let mimeType: FileModel_MimeType = FileModel_MimeType.PDF;
            let name = '';
            stream.responses.onMessage((res) => {
                chunks.push(res.chunk);
                if (res.mimeType) {
                    mimeType = res.mimeType;
                }
                if (res.name) {
                    name = res.name;
                }
            });

            stream.responses.onComplete(() => {
                const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);

                const joinedArray = new Uint8Array(totalLength);

                let offset = 0;
                chunks.forEach((chunk) => {
                    joinedArray.set(chunk, offset);
                    offset += chunk.length;
                });
                const blob = new Blob([joinedArray], { type: MIME_TYPES_MAP[mimeType] });
                const url = URL.createObjectURL(blob);
                dispatch(FilesActions.setFile({ fileId, file: { blobUrl: url, name, mimeType } }));
                setIsCompleted(true);
                setIsLoading(false);
            });

            stream.responses.onError((err) => {
                try {
                    console.debug('ABORTING FILE STREAM', Abort);
                    Abort?.abort?.();
                } catch (error) {
                    console.error('ABORTING FILE STREAM ERROR', error);
                }
                console.error('useRetrieveFileStream ERROR', err);
                setIsError(true);
                setIsLoading(false);
                setIsCompleted(true);
            });
        } else {
            setIsCompleted(true);
            setIsLoading(false);
        }

        return () => {
            try {
                console.debug('ABORTING FILE STREAM', Abort);
                Abort?.abort?.();
            } catch (error) {
                console.error('ABORTING FILE STREAM ERROR', error);
            }
        };
    }, [fileId]);

    return { data, type: MIME_TYPES_MAP[data.mimeType], isCompleted, isError, isLoading };
};

export const useUploadFiles = () => {
    const [uploadFile, uploadFileState] = StorageGrpcService.useUploadFileMutation();
    const [uploadFiles, uploadFilesState] = StorageGrpcService.useUploadFilesMutation();

    const upload = (
        files: File[],
        options?: {
            toastTitle?: string;
            errorTitle?: string;
        }
    ): Promise<{ fileId: string }> =>
        new Promise((resolve, reject) => {
            const toastTitle = options?.toastTitle || 'Uploading file';
            const toastError = options?.errorTitle || 'Error uploading file';

            toast.loading(toastTitle, {
                id      : 'upload_file_toast',
                position: 'top-center'
            });

            const showErrorToast = () => {
                toast.error(toastError, {
                    position: 'top-right',
                    duration: 2500
                });
            };

            readMultipleFiles(files).then((filesData) => {
                if (filesData.length === 1) {
                    if (!filesData[0].uint8Array) return;
                    uploadFile({
                        name       : files[0].name,
                        mimeType   : MIME_TYPES_MAP_REVERSE[filesData[0].fileType],
                        data       : filesData[0].uint8Array,
                        thumbNeeded: false
                    })
                        .unwrap()
                        .then(({ fileId }) => {
                            toast.remove('upload_file_toast');
                            resolve({ fileId });
                        })
                        .catch((error) => {
                            showErrorToast();
                        });
                } else {
                    const uploadBody: StorageFilesUploadRequest_File[] = filesData
                        .filter((fileData) => fileData.uint8Array)
                        .map((fileData, index) => ({
                            name    : files[index].name,
                            mimeType: MIME_TYPES_MAP_REVERSE[fileData.fileType],
                            data    : fileData.uint8Array
                        }));
                    uploadFiles({
                        files: uploadBody
                    })
                        .unwrap()
                        .then(({ fileId }) => {
                            toast.remove('upload_file_toast');
                            resolve({ fileId });
                        })
                        .catch((error) => {
                            showErrorToast();
                        });
                }
            });
        });

    return { upload, isFileUploading: uploadFileState.isLoading || uploadFilesState.isLoading };
};

export const useUploadPublicFile = () => {
    const [uploadFile, state] = StorageGrpcService.useUploadPublicFileMutation();

    const uploadPublicFile = (files: FileList | null): Promise<{ filePath: string }> =>
        new Promise((resolve, reject) => {
            if (!files || files.length === 0) {
                return;
            }

            const file = files[0];

            fileReader(file)
                .then(({
                    fileType,
                    uint8Array
                }) => {
                    if (!uint8Array) return;

                    uploadFile({
                        data    : uint8Array,
                        mimeType: MIME_TYPES_MAP_REVERSE[fileType],
                        name    : file.name
                    })
                        .unwrap()
                        .then(({ filePath }) => {
                            resolve({ filePath });
                        })
                        .catch((error) => {
                            console.error('Upload file failed', error);
                        });
                })
                .catch((error) => {
                    console.error('File read failed', error);
                });
        });

    return { uploadPublicFile, state };
};
