import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { fileReader } from '@/utils/file-reader';
import { useAppDispatch } from '@/store/hooks';
import { DraftsActions } from '@/store/drafts/slice';
import toast from 'react-hot-toast';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';
import { MIME_TYPES_MAP_REVERSE } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Files = {
    file_id: string;
    name: string;
    file_name: string;
    path: string;
    url: string;
};

type Props = {
    location: string;
    merge: boolean;
    onResCallback: (data: { paths: Files[] }) => void;
    dropzoneOptions?: DropzoneOptions;
};

const accessFilesArr = ['image/jpeg', 'application/pdf', 'image/png'];

const useFiles = ({
    onResCallback,
    dropzoneOptions = {}
}: Props) => {
    const dispatch = useAppDispatch();
    const [uploadFile] = StorageGrpcService.useUploadFileMutation();
    const { t } = useAppTranslation();

    return useDropzone({
        ...dropzoneOptions,
        onDrop: (files, fileRejection) => {
            if (fileRejection.length) {
                toast.error(fileRejection.map((file) => file.errors[0].message).join('\n'));
                return;
            }

            dispatch(DraftsActions.SetUploadingDocument(true));

            fileReader(files[0]).then(async ({
                fileType,
                uint8Array
            }) => {
                if (!uint8Array) {
                    return;
                }

                uploadFile({
                    name       : files[0].name,
                    mimeType   : MIME_TYPES_MAP_REVERSE[fileType],
                    data       : uint8Array,
                    thumbNeeded: false
                })
                    .unwrap()
                    .then(({ fileId }) => {
                        onResCallback({
                            paths: [
                                {
                                    path     : fileId,
                                    name     : files[0].name,
                                    file_id  : fileId,
                                    file_name: files[0].name,
                                    url      : fileId
                                }
                            ]
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => {
                        dispatch(DraftsActions.SetUploadingDocument(false));
                    });
            });
        },
        validator(file) {
            if (!accessFilesArr.includes(file.type)) {
                return {
                    code   : 'file-type-not-supported',
                    message: t('new_loads:errors.file_not_supported')
                };
            }

            if (file.size / (1024 * 1024) > 10) {
                return {
                    code   : 'file-too-large',
                    message: t('new_loads:errors.file_larger')
                };
            }
            return null;
        }
    });
};

export default useFiles;
