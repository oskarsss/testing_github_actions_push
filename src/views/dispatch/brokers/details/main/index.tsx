import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import Notes from '@/@core/components/notes/Notes';
import { type ReactNode, useEffect, useMemo } from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { countInvalidDocuments } from '@/@core/components/documents/utils';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import Documents from '@/views/fleet/drivers/Details/components/Center/tabs/Documents/Documents';
import Header from '@/views/fleet/drivers/Details/components/Center/Header/Header';
import { styled } from '@mui/material';
import type { BrokerRetrieveReply_Broker } from '@proto/brokers';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import { useStableArray } from '@/hooks/useStable';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { brokersActions, brokersSelectors } from '@/store/dispatch/brokers/slice';
import useTabQuery from '@/hooks/useTabQuery';
import Members from './members';
import Notifications from './notifications';

type Props = {
    broker: BrokerRetrieveReply_Broker;
};

const ContentBlock = styled('div')(() => ({
    width   : '100%',
    height  : '100%',
    overflow: 'hidden'
}));

export type View = {
    id: string;
    name: IntlMessageKey;
    testID?: string;
    count?: number;
    children: ReactNode;
};

export default function BrokerMain({ broker }: Props) {
    const dispatch = useAppDispatch();
    const document_id = useAppSelector((state) => state.documents.broker);
    const selectedTabId = useAppSelector(brokersSelectors.getSelectedTab);

    const { documents } = useGetDocumentsByEntityType({
        entityId  : broker.brokerId,
        entityType: DocumentModel_DocumentEntityType.BROKER
    });

    const {
        tab_id,
        setTab
    } = useTabQuery(DETAILS_TABS_IDS.MAIN_NOTES, selectedTabId);

    useEffect(
        () => () => {
            dispatch(brokersActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        },
        []
    );

    useEffect(() => {
        if (tab_id) {
            dispatch(brokersActions.selectTab(tab_id));
        } else {
            dispatch(brokersActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        }
    }, [tab_id]);

    useEffect(() => {
        if (document_id) {
            setTab(DETAILS_TABS_IDS.DOCUMENTS);
        }
    }, [document_id]);

    const { data } = BrokersGrpcService.useGetBrokerUsersQuery({ brokerId: broker.brokerId });

    const members = useStableArray(data?.users);
    const VIEWS: View[] = [
        {
            id      : DETAILS_TABS_IDS.MAIN_NOTES,
            name    : 'common:profile.center.title.all_notes',
            children: (
                <Notes
                    entity_id={broker.brokerId}
                    entity_type="broker"
                    size="normal"
                    isHideHeader
                />
            )
        },
        {
            id      : DETAILS_TABS_IDS.DOCUMENTS,
            name    : 'common:profile.center.title.documents',
            children: (
                <Documents
                    title={broker.name}
                    entity_type={DocumentModel_DocumentEntityType.BROKER}
                    entity_id={broker.brokerId}
                />
            ),
            testID: '',
            count : countInvalidDocuments(documents)
        },

        {
            id      : DETAILS_TABS_IDS.MEMBERS,
            name    : 'common:profile.center.title.members',
            children: (
                <Members
                    brokerId={broker.brokerId}
                    members={members}
                />
            ),
            testID: ''
        },

        {
            id      : DETAILS_TABS_IDS.NOTIFICATIONS,
            name    : 'common:profile.center.title.notifications',
            children: (
                <Notifications
                    brokerId={broker.brokerId}
                    users={members}
                />
            ),
            testID: ''
        }
    ];

    const views = useMemo(
        () =>
            members.length
                ? VIEWS
                : VIEWS.filter((view) => view.id !== DETAILS_TABS_IDS.NOTIFICATIONS),
        [members.length]
    );

    const view = useMemo(
        () => views.find((view) => view.id === selectedTabId),
        [selectedTabId, views]
    );

    return (
        <>
            <Header
                views={views}
                value={selectedTabId}
                setSelectedViewId={setTab}
            />
            <ContentBlock>{view?.children}</ContentBlock>
        </>
    );
}
