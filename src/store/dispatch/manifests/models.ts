import { ManifestFilterStatuses } from '@/models/manifests/manifest';

export enum MANIFESTS_VIEW_TYPES {
    all = 'all',
    planning = 'planning',
    assigned = 'assigned',
    moving = 'moving',
    completed = 'completed',
    truck = 'truck',
    custom = 'custom'
}
export type ManifestView = {
    view_id: string;
    name: string;
    filters: Record<string, (string | number)[] | string>;
    icon?: React.ReactNode;
    type: MANIFESTS_VIEW_TYPES;
};

export enum MANIFEST_VIEW_IDS_ENUM {
    ALL = 'all',
    PLANNING = 'planning',
    ASSIGNED = 'assigned',
    MOVING = 'moving',
    COMPLETED = 'completed'
}

export const DefaultManifestsViews: ManifestView[] = [
    {
        filters: {},
        name   : 'All',
        view_id: MANIFEST_VIEW_IDS_ENUM.ALL,
        type   : MANIFESTS_VIEW_TYPES.all
    },
    {
        filters: {
            manifest_status: [ManifestFilterStatuses.STATUS_PLANNING]
        },
        name   : 'Planning',
        view_id: MANIFEST_VIEW_IDS_ENUM.PLANNING,
        type   : MANIFESTS_VIEW_TYPES.planning
    },
    {
        filters: {
            manifest_status: [ManifestFilterStatuses.STATUS_ASSIGNED]
        },
        name   : 'Assigned',
        view_id: MANIFEST_VIEW_IDS_ENUM.ASSIGNED,
        type   : MANIFESTS_VIEW_TYPES.assigned
    },
    {
        filters: {
            manifest_status: [ManifestFilterStatuses.STATUS_IN_PROGRESS]
        },
        name   : 'Moving',
        view_id: MANIFEST_VIEW_IDS_ENUM.MOVING,
        type   : MANIFESTS_VIEW_TYPES.moving
    },
    {
        filters: {
            manifest_status: [ManifestFilterStatuses.STATUS_DELIVERED]
        },
        name   : 'Completed',
        view_id: MANIFEST_VIEW_IDS_ENUM.COMPLETED,
        type   : MANIFESTS_VIEW_TYPES.completed
    }
];

export type ManifestDetailsTab = 'stops' | 'loads' | 'driverPay' | 'borderConnect';
