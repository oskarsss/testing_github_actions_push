import moment from 'moment-timezone';
import Scheduling from '@/store/dispatch/scheduling/types';
import React from 'react';

export type columnType = {
    id: string;
    sticky: boolean;
    minWidth: number;
    day?: moment.Moment;
    today?: boolean;
};

export type EditType = 'truck' | 'trailer' | 'driver';

export type DataAndEditProps = {
    truck: Scheduling.TruckManifestRow;
};

export type PositionType = {
    left: number;
    right: null | number;
};

export type OverlayParams = {
    index_row: number;
    widthOverlay: number;
    positionOverlay: PositionType;
};

export type Params = {
    id: string;
    diffMinutes: number;
    manifest?: Scheduling.TruckManifestRow['manifests'][0];
    time_off?: Scheduling.TimeOffType;
    width: number;
    position: PositionType;
    overWidth?: boolean;
};

export type changeHeightType = (height: number) => void;
export type changeLeftNoCoveredType = (itemsRows: Params[][]) => void;
export type EditTimeOffType = (event: React.MouseEvent, time_off: Scheduling.TimeOffType) => void;
