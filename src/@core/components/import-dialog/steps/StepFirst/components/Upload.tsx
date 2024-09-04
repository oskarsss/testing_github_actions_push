import { useAppTranslation } from '@/hooks/useAppTranslation';
import Lottie from 'lottie-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Import from '@/store/import/types';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useUploadFiles } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { updateImportFilesAction } from '@/store/import/actions';
import lottieDragFileHere from '../../../../../../../public/lotties/drag-file-here.json';
import lottieUploadLoading from '../../../../../../../public/lotties/data-upload-in-progress.json';
import { convertingSize } from '../../../helpers';
import UploadedFiles from './UploadedFiles';
import { Dropzone } from '../styled';
import { UploadFileInfo } from '../../../styled';

type Props = {
    category_id: Import.CategoryId;
    required_file: Import.RequiredFile;
};
export default function Upload({
    category_id,
    required_file
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const {
        upload,
        isFileUploading
    } = useUploadFiles();

    // const [uploadFile, { isLoading }] = StorageGrpcService.useUploadFileMutation();
    const files_map = useAppSelector((state) => state.import.files_map[category_id]);

    const handleUploadFiles = async (files: File[]) => {
        try {
            upload(files).then(({ fileId }) => {
                dispatch(
                    updateImportFilesAction({
                        required_file,
                        files: [
                            {
                                file_path: fileId,
                                file_size: convertingSize(files[0].size),
                                file_name: files[0].name
                            }
                        ]
                    })
                );
            });
        } catch (err) {
            const error = err as { message?: string; error?: string };
            const message = error?.message || error?.error || t('common:error');

            toast(message, {
                position: 'top-right',
                duration: 2500
            });
        }
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        open
    } = useDropzone({
        noClick : true,
        multiple: true,
        maxFiles: 10,
        accept  : {
            'text/csv'                                                         : ['.csv'],
            'application/vnd.ms-excel'                                         : ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        },
        onDropRejected: () => toast.error(t('core:import.error.file')),
        onError       : () => toast.error(t('core:import.error.file')),
        onDrop        : (files) => handleUploadFiles(files)
    });

    return (
        <Dropzone
            {...getRootProps()}
            onClick={open}
            isDragActive={isDragActive}
        >
            <UploadFileInfo>
                <Lottie
                    animationData={isFileUploading ? lottieUploadLoading : lottieDragFileHere}
                    style={{ height: 130, width: 200 }}
                />
                <h5>{t('core:import.step.first.dropzone.title')}</h5>
                <p>{t('core:import.step.first.dropzone.desc')}</p>
            </UploadFileInfo>
            {files_map?.files && <UploadedFiles required_file={required_file} />}
            <input {...getInputProps()} />
        </Dropzone>
    );
}
