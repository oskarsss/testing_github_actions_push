import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import Notes from '@/@core/components/notes/Notes';
import type { CustomerModel_Customer } from '@proto/models/model_customer';
import { type ReactNode, useEffect, useMemo } from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { countInvalidDocuments } from '@/@core/components/documents/utils';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import Documents from '@/views/fleet/drivers/Details/components/Center/tabs/Documents/Documents';
import Header from '@/views/fleet/drivers/Details/components/Center/Header/Header';
import { styled } from '@mui/material';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { useStableArray } from '@/hooks/useStable';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useTabQuery from '@/hooks/useTabQuery';
import { customersActions, customersSelectors } from '@/store/dispatch/customers/slice';
import Members from './members';
import Notifications from './notifications';

type Props = {
    customer: CustomerModel_Customer;
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

export default function CustomerMain({ customer }: Props) {
    const dispatch = useAppDispatch();
    const document_id = useAppSelector((state) => state.documents.customer);
    const selectedTabId = useAppSelector(customersSelectors.getSelectedTab);
    const { documents } = useGetDocumentsByEntityType({
        entityId  : customer.customerId,
        entityType: DocumentModel_DocumentEntityType.CUSTOMER
    });
    const {
        tab_id,
        setTab
    } = useTabQuery(DETAILS_TABS_IDS.MAIN_NOTES, selectedTabId);
    const { data } = CustomersGrpcService.useGetCustomerUsersQuery({
        customerId: customer.customerId
    });

    const members = useStableArray(data?.users);

    useEffect(
        () => () => {
            dispatch(customersActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        },
        []
    );

    useEffect(() => {
        if (tab_id) {
            dispatch(customersActions.selectTab(tab_id));
        } else {
            dispatch(customersActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        }
    }, [tab_id]);

    useEffect(() => {
        if (document_id) {
            setTab(DETAILS_TABS_IDS.DOCUMENTS);
        }
    }, [document_id]);

    const VIEWS: View[] = [
        {
            id      : DETAILS_TABS_IDS.MAIN_NOTES,
            name    : 'common:profile.center.title.all_notes',
            children: (
                <Notes
                    entity_id={customer.customerId}
                    entity_type="customer"
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
                    title={customer.name}
                    entity_type={DocumentModel_DocumentEntityType.CUSTOMER}
                    entity_id={customer.customerId}
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
                    members={members}
                    customerId={customer.customerId}
                />
            ),
            testID: ''
        },

        {
            id      : DETAILS_TABS_IDS.NOTIFICATIONS,
            name    : 'common:profile.center.title.notifications',
            children: (
                <Notifications
                    customerId={customer.customerId}
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
