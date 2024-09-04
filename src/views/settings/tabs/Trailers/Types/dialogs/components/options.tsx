import { TrailerModel_Type_Icon } from '@proto/models/model_trailer';

enum TRAILER_TYPES_TITLE {
    DEFAULT = 'default',
    DRY_VAN = 'dry_van',
    REEFER = 'refer',
    FLATBED = 'flatbed',
    STEP_DECK = 'step_dec',
    TANKER = 'tanker',
    RGN_LOW_BOY = 'low_boy',
    POWER_ONLY = 'power_only'
}

export const TRAILER_TYPE_TITLE_LIST: Record<TrailerModel_Type_Icon, TRAILER_TYPES_TITLE> = {
    [TrailerModel_Type_Icon.DEFAULT]    : TRAILER_TYPES_TITLE.DEFAULT,
    [TrailerModel_Type_Icon.DRY_VAN]    : TRAILER_TYPES_TITLE.DRY_VAN,
    [TrailerModel_Type_Icon.REEFER]     : TRAILER_TYPES_TITLE.REEFER,
    [TrailerModel_Type_Icon.FLATBED]    : TRAILER_TYPES_TITLE.FLATBED,
    [TrailerModel_Type_Icon.STEP_DECK]  : TRAILER_TYPES_TITLE.STEP_DECK,
    [TrailerModel_Type_Icon.TANKER]     : TRAILER_TYPES_TITLE.TANKER,
    [TrailerModel_Type_Icon.RGN_LOW_BOY]: TRAILER_TYPES_TITLE.RGN_LOW_BOY,
    [TrailerModel_Type_Icon.UNSPECIFIED]: TRAILER_TYPES_TITLE.POWER_ONLY
};
