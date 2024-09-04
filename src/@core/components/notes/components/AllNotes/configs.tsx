import {
    UpdatedIcon,
    CreatedIcon,
    DeletedIcon,
    AssignedIcon,
    UnassignedIcon,
    ClearedIcon
} from '../../icons';

const SystemNote = {
    FIELD_START: {
        match  : /<s-field>/g,
        replace: '<b class="notes__list__item__text"><i>"'
    },
    FIELD_END: {
        match  : /<\/s-field>/g,
        replace: '"</b></i>'
    },
    NEW_USER_START: {
        match  : /<s-new-user>/g,
        replace: '<span class="s-new-user">'
    },
    NEW_USER_END: {
        match  : /<\/s-new-user>/g,
        replace: '</span>'
    },
    OLD_USER_START: {
        match  : /<s-old-user>/g,
        replace: '<span class="s-old-user">'
    },
    OLD_USER_END: {
        match  : /<\/s-old-user>/g,
        replace: '</span>'
    },
    NEW_VALUE_START: {
        match  : /<s-new-value>/g,
        replace: '<span class="notes__bold-font">'
    },
    NEW_VALUE_END: {
        match  : /<\/s-new-value>/g,
        replace: '</span >'
    },
    OLD_VALUE_START: {
        match  : /<s-old-value>/g,
        replace: '<b class="notes__list__item__text">'
    },
    OLD_VALUE_END: {
        match  : /<\/s-old-value>/g,
        replace: '</b>'
    },
    LIST_START: {
        match  : /<s-list>/g,
        replace: '<div class="notes__list">'
    },
    LIST_END: {
        match  : /<\/s-list>/g,
        replace: '</div>'
    },
    ITEM_START: {
        match  : /<s-list-item>/g,
        replace: '<p class="notes__list__item">'
    },
    ITEM_END: {
        match  : /<\/s-list-item>/g,
        replace: '</p>'
    },
    ACTION_UPDATED_START: {
        match  : /<s-action-updated>/g,
        replace: `${UpdatedIcon}`
    },
    ACTION_UPDATED_END: {
        match  : /<\/s-action-updated>/g,
        replace: '</span>'
    },
    ACTION_CREATED_START: {
        match  : /<s-action-created>/g,
        replace: `<span class='notes__icon-box'> ${CreatedIcon}`
    },
    ACTION_CREATED_END: {
        match  : /<\/s-action-created>/g,
        replace: '</span>'
    },
    ACTION_CLEARED_START: {
        match  : /<s-action-cleared>/g,
        replace: `<span class='notes__icon-box'> ${ClearedIcon}`
    },
    ACTION_CLEARED_END: {
        match  : /<\/s-action-cleared>/g,
        replace: '</span>'
    },
    ACTION_DELETED_START: {
        match  : /<s-action-deleted>/g,
        replace: `<span class='notes__icon-box'> ${DeletedIcon}`
    },
    ACTION_DELETED_END: {
        match  : /<\/s-action-deleted>/g,
        replace: '</span>'
    },
    ACTION_ASSIGNED_START: {
        match  : /<s-action-assigned>/g,
        replace: `<span class='notes__icon-box'> ${AssignedIcon}`
    },
    ACTION_ASSIGNED_END: {
        match  : /<\/s-action-assigned>/g,
        replace: '</span>'
    },
    ACTION_UNASSIGNED_START: {
        match  : /<s-action-unassigned>/g,
        replace: `<span> ${UnassignedIcon}`
    },
    ACTION_UNASSIGNED_END: {
        match  : /<\/s-action-unassigned>/g,
        replace: '</span>'
    }
};

const ManualNote = {
    ACTION_NEXT_LINE: {
        match  : /\n/g,
        replace: '<br />'
    }
};

const ReplaceNoteConfig = {
    system: SystemNote,
    manual: ManualNote
};

export default ReplaceNoteConfig;
