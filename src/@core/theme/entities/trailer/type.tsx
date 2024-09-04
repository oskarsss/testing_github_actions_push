import { ReactNode } from 'react';
import { TrailerModel_Type_Icon } from '@proto/models/model_trailer';
import {
    ReeferIcon,
    DryVan,
    StepDeckIcon,
    FlatbedIcon,
    TankerIcon,
    DefaultIcon,
    RGNIcon,
    PowerOnlyIcon
} from './type_icons';

export const TRAILER_TYPE_ICONS_LIST: Record<TrailerModel_Type_Icon, ReactNode> = {
    [TrailerModel_Type_Icon.DEFAULT]    : <DefaultIcon />,
    [TrailerModel_Type_Icon.DRY_VAN]    : <DryVan />,
    [TrailerModel_Type_Icon.REEFER]     : <ReeferIcon />,
    [TrailerModel_Type_Icon.FLATBED]    : <FlatbedIcon />,
    [TrailerModel_Type_Icon.STEP_DECK]  : <StepDeckIcon />,
    [TrailerModel_Type_Icon.TANKER]     : <TankerIcon />,
    [TrailerModel_Type_Icon.RGN_LOW_BOY]: <RGNIcon />,
    [TrailerModel_Type_Icon.UNSPECIFIED]: <PowerOnlyIcon />
};

export const getTrailerTypeIcon = (type?: TrailerModel_Type_Icon | null) => {
    if (!type) {
        return TRAILER_TYPE_ICONS_LIST[0];
    }

    if (type in TRAILER_TYPE_ICONS_LIST) {
        return TRAILER_TYPE_ICONS_LIST[type];
    }

    return TRAILER_TYPE_ICONS_LIST[0];
};
