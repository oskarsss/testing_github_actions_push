import { Stack } from '@mui/material';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';
import { useFactoringCompanyFormContext } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/FactoringCompanyForm';
import type { ChangeEvent } from 'react';
import { fileReader } from '@/utils/file-reader';
import {
    MIME_TYPES_MAP_REVERSE,
    useUploadPublicFile
} from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import UploadButton, { ButtonName, UploadType } from './UploadButton';
import ClearButton from './ClearButton';

type Props = {
    isPrivate: boolean;
    url: string;
    name: ButtonName;
    uploadType: UploadType;
};

export default function UploadLogoActions({
    isPrivate,
    url,
    name,
    uploadType
}: Props) {
    const [uploadPrivateFile] = StorageGrpcService.useUploadFileMutation();
    const { setValue } = useFactoringCompanyFormContext();

    const { uploadPublicFile } = useUploadPublicFile();

    const handleUploadLogoFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
        uploadPublicFile(files).then(({ filePath }) => {
            setValue('logoFileId', filePath, { shouldDirty: true });
        });
    };

    const handleUploadNoaFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];
        fileReader(file).then(({
            fileType,
            uint8Array
        }) => {
            if (!uint8Array) return;

            uploadPrivateFile({
                data       : uint8Array,
                mimeType   : MIME_TYPES_MAP_REVERSE[fileType],
                name       : file.name,
                thumbNeeded: false
            })
                .unwrap()
                .then(({ fileId }) => {
                    setValue('noaFileId', fileId, { shouldDirty: true });
                });
        });
    };

    const uploadHandler = isPrivate ? handleUploadNoaFile : handleUploadLogoFile;

    return (
        <Stack
            direction="row"
            gap="8px"
            justifyContent="space-between"
        >
            {url ? (
                <>
                    <UploadButton
                        uploadFile={uploadHandler}
                        name={name}
                        text="common:button.change"
                        uploadType={uploadType}
                    />

                    <ClearButton name={name} />
                </>
            ) : (
                <UploadButton
                    uploadFile={uploadHandler}
                    name={name}
                    text="common:button.upload"
                    uploadType={uploadType}
                />
            )}
        </Stack>
    );
}
