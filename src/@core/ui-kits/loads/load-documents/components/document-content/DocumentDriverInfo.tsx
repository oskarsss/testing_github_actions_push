import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import React from 'react';
import getInitials from '@/utils/get-initials';
import LoadDocumentComponents from '@/@core/ui-kits/loads/load-documents/LoadDocumentsComponents';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

type Props = {
    driverId: string;
};

export default function DocumentDriverInfo({ driverId }: Props) {
    const driversMap = useDriversMap();
    const driver = driversMap[driverId];
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl);
    if (!driver) return null;
    return (
        <>
            <LoadDocumentComponents.CardPersonAvatar src={url}>
                {getInitials(`${driver?.firstName || ''} ${driver?.lastName || ''}`)}
            </LoadDocumentComponents.CardPersonAvatar>
            <LoadDocumentComponents.CardPersonName noWrap>
                {`${driver?.firstName || ''} ${driver?.lastName || ''}`}
            </LoadDocumentComponents.CardPersonName>
        </>
    );
}
