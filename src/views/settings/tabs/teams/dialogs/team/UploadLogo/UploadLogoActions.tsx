import { Stack } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useUploadPublicFile } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { Control, Path, useController } from 'react-hook-form';
import UploadButton, { ButtonText, UploadType } from './UploadButton';
import ClearButton from './ClearButton';
import { TeamDefaultValues } from '../TeamFields';

type Props = {
    isPrivate: boolean;
    url: string;
    uploadType: UploadType;
    control: Control<TeamDefaultValues>;
    name: Path<TeamDefaultValues>;
};

export default function UploadLogoActions({
    isPrivate,
    url,
    name,
    uploadType,
    control
}: Props) {
    const {
        field: { onChange }
    } = useController({ name, control });

    const { uploadPublicFile } = useUploadPublicFile();

    const handleUploadLogoFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
        uploadPublicFile(files).then(({ filePath }) => {
            onChange(filePath);
        });
    };

    const uploadHandler = handleUploadLogoFile;

    return (
        <Stack
            direction="row"
            gap="8px"
            justifyContent="space-between"
        >
            {url ? (
                <>
                    <UploadButton
                        control={control}
                        uploadFile={uploadHandler}
                        name={name}
                        text={ButtonText.CHANGE}
                        uploadType={uploadType}
                    />

                    <ClearButton
                        control={control}
                        name={name}
                    />
                </>
            ) : (
                <UploadButton
                    control={control}
                    uploadFile={uploadHandler}
                    name={name}
                    text={ButtonText.UPLOAD}
                    uploadType={uploadType}
                />
            )}
        </Stack>
    );
}
