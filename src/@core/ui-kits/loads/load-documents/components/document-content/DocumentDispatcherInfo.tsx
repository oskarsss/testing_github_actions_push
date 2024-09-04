import getInitials from '@/utils/get-initials';
import React from 'react';
import { useUsersMap } from '@/store/hash_maps/hooks';
import { getPublicURL } from '@/configs/storage';
import LoadDocumentComponents from '@/@core/ui-kits/loads/load-documents/LoadDocumentsComponents';

type Props = {
    dispatcherId: string;
};

export default function DocumentDispatcherInfo({ dispatcherId }: Props) {
    const dispatchersMap = useUsersMap();
    const dispatcher = dispatchersMap[dispatcherId];

    if (!dispatcher) return null;
    return (
        <>
            <LoadDocumentComponents.CardPersonAvatar src={getPublicURL(dispatcher.selfieThumbUrl)}>
                {getInitials(`${dispatcher.firstName} ${dispatcher.lastName}`)}
            </LoadDocumentComponents.CardPersonAvatar>
            <LoadDocumentComponents.CardPersonName noWrap>
                {`${dispatcher.firstName} ${dispatcher.lastName}`}
            </LoadDocumentComponents.CardPersonName>
        </>
    );
}
