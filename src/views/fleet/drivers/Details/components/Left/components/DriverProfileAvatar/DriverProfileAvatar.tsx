import { memo } from 'react';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';
import DriversTypes from '@/store/fleet/drivers/types';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import ChangeableAvatar from '@/@core/components/changeable-avatar/ChangeableAvatar';
import { fileReader } from '@/utils/file-reader';
import {
    MIME_TYPES_MAP_REVERSE,
    useRetrieveFileStream
} from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';

type Props = {
    driver: DriverModel_Driver;
};

function DriverProfileAvatar({ driver }: Props) {
    const [updateSelfie] = DriversGrpcService.useUpdateDriverSelfieMutation();
    const [uploadFile] = StorageGrpcService.useUploadFileMutation();

    const driverType = useDriverTypesMap(driver.driverTypeId);

    const { data } = useRetrieveFileStream(driver.selfieUrl || driver.selfieThumbUrl);

    const upload = (file: File) => {
        fileReader(file).then(async ({
            fileType,
            uint8Array
        }) => {
            if (!uint8Array) {
                return;
            }

            uploadFile({
                name       : file.name,
                mimeType   : MIME_TYPES_MAP_REVERSE[fileType],
                data       : uint8Array,
                thumbNeeded: true
            })
                .unwrap()
                .then(({
                    fileId,
                    thumbFileId
                }) => {
                    updateSelfie({
                        driverId   : driver.driverId,
                        fileId,
                        thumbFileId: thumbFileId ?? fileId
                    });
                });
        });
    };

    return (
        <ChangeableAvatar
            first_name={driver.firstName}
            last_name={driver.lastName}
            upload={upload}
            selfie_thumb_url={data.blobUrl}
            icon={driverType ? DRIVER_TYPE_ICONS[driverType.icon] : null}
            icon_tooltip={driverType?.name || ''}
        />
    );
}

export default memo(DriverProfileAvatar);
