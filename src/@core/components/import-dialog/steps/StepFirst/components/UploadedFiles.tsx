import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type Import from '@/store/import/types';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';
import { deleteImportFileAction } from '@/store/import/actions';
import lottieUploadCompleted from '../../../../../../../public/lotties/data-upload-completed.json';
import {
    UploadFile,
    FileCopyIcon,
    Indicator,
    Size,
    Percent,
    ProcessContainer,
    RightBlock,
    LottieBox
} from '../styled';

type Props = {
    required_file: Import.RequiredFile;
};
export default function UploadedFiles({ required_file }: Props) {
    const dispatch = useAppDispatch();
    const process = 100;
    const files = useAppSelector(
        (state) => state.import.files_map[state.import.category_id].files[required_file.id] || []
    );
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    const [removeFile] = StorageGrpcService.useDeleteFileMutation();

    const onDeleteFile = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file_path: string
    ) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
            deleteImportFileAction({
                required_file,
                file_path
            })
        );
        removeFile({ fileId: file_path });
    };

    return files.map(
        (file) =>
            file && (
                <UploadFile
                    key={file.file_path}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <FileCopyIcon />
                    <ProcessContainer>
                        <h6>{file.file_name}</h6>
                        <div>
                            <Size>{file.file_size}</Size>
                            <Indicator>
                                <span style={{ width: `${process}%` }} />
                            </Indicator>
                            <Percent>{`${process}%`}</Percent>
                        </div>
                    </ProcessContainer>
                    <RightBlock>
                        <LottieBox>
                            {file && (
                                <Lottie
                                    lottieRef={lottieRef}
                                    animationData={lottieUploadCompleted}
                                    loop={false}
                                />
                            )}
                        </LottieBox>
                        <IconButton
                            aria-label="delete"
                            disabled={process < 100}
                            onClick={(e) => onDeleteFile(e, file.file_path)}
                        >
                            <DeleteIcon color="primary" />
                        </IconButton>
                    </RightBlock>
                </UploadFile>
            )
    );
}
