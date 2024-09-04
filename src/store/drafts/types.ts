import {
    LoadDraftsGetReply_LoadDraft,
    LoadDraftFields_Stop,
    LoadDraftFields_InvoiceItem,
    LoadDraftFields,
    LoadDraftUpdateRequest
} from '@proto/load_drafts';

type LoadDraftGetWaypointsReply_Waypoint = { distance: number; lat: number; lon: number };

namespace DraftsTypes {
    export type Stop = LoadDraftFields_Stop;

    export type Stops = Stop[];

    export type BrokerContactProps = {
        phone_number: string;
        email: string;
    };

    export type InvoiceItem = LoadDraftFields_InvoiceItem;

    export type Fields = LoadDraftFields;

    export type Draft = LoadDraftsGetReply_LoadDraft;

    export type Drafts = Draft[];

    export type Waypoint = LoadDraftGetWaypointsReply_Waypoint;

    export type Waypoints = Waypoint[];

    export type UpdateDraftRequest = LoadDraftUpdateRequest;
}

export default DraftsTypes;
