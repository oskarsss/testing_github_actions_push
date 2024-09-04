import { IconBlockWrapper, SubTitle } from '@/views/settings/components/styled';
import { getPublicURL } from '@/configs/storage';
import ChangeableAvatar from '@/@core/components/changeable-avatar/ChangeableAvatar';
import toast from 'react-hot-toast';
import { useAccount } from '@/store/app/hooks';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import AccountGrpcService from '@/@grpcServices/services/account.service';
import { fileReader } from '@/utils/file-reader';
import { MIME_TYPES_MAP_REVERSE } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { useAppDispatch } from '@/store/hooks';

type Props = {
    first_name?: string;
    last_name?: string;
};
export default function Avatar({
    first_name,
    last_name
}: Props) {
    const [removeFile] = StorageGrpcService.useDeleteFileMutation();
    const [uploadFile] = StorageGrpcService.useUploadPublicFileMutation();
    const [uploadSelfie] = AccountGrpcService.useUploadAccountSelfieMutation();

    const { user } = useAccount();
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const checkFile = async (file: File | null) => {
        if (!file) {
            return;
        }

        if (file.size > 10485760) {
            toast.error(t('settings:profile.photo.error'), {
                position: 'top-right',
                duration: 2500
            });
            return;
        }

        try {
            const {
                uint8Array,
                fileType
            } = await fileReader(file);

            const response = await uploadFile({
                name    : file.name,
                mimeType: MIME_TYPES_MAP_REVERSE[fileType],
                data    : uint8Array
            }).unwrap();

            uploadSelfie({
                fileId     : response.filePath,
                thumbFileId: response.filePath
            });

            dispatch(
                AccountGrpcService.util.updateQueryData('getAccount', {}, (getAccountData) => ({
                    ...getAccountData,
                    ...(getAccountData.user
                        ? {
                            user: {
                                ...getAccountData.user,
                                selfieUrl     : response.filePath,
                                selfieThumbUrl: response.filePath
                            }
                        }
                        : {})
                }))
            );

            const file_url = user?.selfieUrl;

            if (!file_url) {
                return;
            }

            removeFile({ fileId: file_url });
        } catch (error) {
            const defineError = error as Error;

            toast.error(defineError?.message || t('common:error'), {
                position: 'top-right',
                duration: 2500
            });
        }
    };

    return (
        <IconBlockWrapper>
            <SubTitle>{t('settings:profile.photo.title')}</SubTitle>

            <ChangeableAvatar
                first_name={first_name}
                last_name={last_name}
                upload={checkFile}
                selfie_thumb_url={getPublicURL(user?.selfieUrl)}
                sx_avatar={{
                    border: '1px dashed rgba(145, 158, 171, 0.2)'
                }}
                size={180}
            />
        </IconBlockWrapper>
    );
}
