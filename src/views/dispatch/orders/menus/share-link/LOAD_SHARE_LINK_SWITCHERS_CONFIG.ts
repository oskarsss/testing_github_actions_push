import { LoadGetTrackingLinkReply } from '@proto/loads';
import type { IntlMessageKey } from '@/@types/next-intl';

type TypeConfig = {
    id: string;
    label: IntlMessageKey;
    info: IntlMessageKey;
    field: keyof LoadGetTrackingLinkReply;
};

const LOAD_SHARE_LINK_SWITCHERS_CONFIG: TypeConfig[] = [
    // {
    //     id   : 'capacity',
    //     label: 'modals:loads.share_link.controls.capacity.label',
    //     info : 'modals:loads.share_link.controls.capacity.info',
    //     field: 'canViewTruckAvailability'
    // },
    {
        id   : 'documents',
        label: 'modals:loads.share_link.controls.documents.label',
        info : 'modals:loads.share_link.controls.documents.info',
        field: 'canViewDocuments'
    },
    {
        id   : 'eta',
        label: 'modals:loads.share_link.controls.eta.label',
        info : 'modals:loads.share_link.controls.eta.info',
        field: 'canViewEta'
    },
    {
        id   : 'driver_contact',
        label: 'modals:loads.share_link.controls.driver_contact.label',
        info : 'modals:loads.share_link.controls.driver_contact.info',
        field: 'canViewDriverContact'
    }

    // {
    //     field: 'showOtherLoadStops',
    //     id   : 'other_load_stops',
    //     info : 'modals:loads.share_link.controls.other_load_stops.info',
    //     label: 'modals:loads.share_link.controls.other_load_stops.label'
    // }
];

export default LOAD_SHARE_LINK_SWITCHERS_CONFIG;
