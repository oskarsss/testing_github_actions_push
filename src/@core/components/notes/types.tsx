import { ComponentProps } from 'react';
import NotesComponents from '@/@core/components/notes/styled';
import { NoteEntityType } from '@/models/notes/note-entity-type';
import { IntlMessageKey } from '@/@types/next-intl';
import NotesTabs from '@/@core/components/notes/components/NotesTabs/NotesTabs';

export type ChatWithDriver = {

    /**
     * display name in tabs M-300, M-301, etc.
     */
    label: string;
    entity_id: string;

    /**
     * use entity_type specifically designed for the driver
     */
    entity_type: NoteEntityType;

    /**
     * driver ids is required
     * these drivers will be shown in the chat above
     */
    driverIds: string[];
};

export type Props = {

    /**
     * If you use chatsWithDrivers, this field will be used for team and general
     * load_id, truck_id, driver_id, etc.
     */
    entity_id: string;

    /**
     * If you use chatsWithDrivers, this field will be used for team and general
     * 'driver', 'truck', 'load', 'trailer', etc.
     */
    entity_type: NoteEntityType;

    /**
     * support for various tabs
     * for drivers chats
     * use entity_type specifically designed for the driver
     */
    chatsWithDrivers?: ChatWithDriver[];

    /**
     * 'general', 'team', 'driver', etc.
     */
    note_type?: 'general' | 'team' | 'driver';

    /**
     * called when a note has been sent
     */
    onClose?: () => void;

    /**
     * 'Leave a note...' by default
     */
    placeholder?: IntlMessageKey;

    /**
     * 'normal' by default
     */
    size?: 'small' | 'normal';

    /**
     * @example
     * if (variant==='menu') {
     * // styles for `<NotesComponents.AuthContainer />`
     *      {
     *          height: '390px',
     *          width : '500px'
     *      }
     * }
     * // styles for `<NotesComponents.SectionHeader />`
     *      {
     *         padding: '10px 0px 0px 10px',
     *         margin : 0,
     *      }
     * }
     * if (variant==='outlined') {
     * // styles for `<NotesComponents.SectionBody />`
     *      {
     *          border      : `1px solid ${theme.palette.semantic.border.secondary}`,
     *          borderRadius: '8px'
     *      }
     * }
     * if (variant==='filled') {
     * // styles for `<NotesComponents.SectionHeader />`
     *      {
     *         justifyContent : 'center',
     *         marginBottom   : 0,
     *         minHeight      : '40px',
     *         borderBottom   : (theme) => `1px solid ${theme.palette.semantic.border.secondary}`,
     *         borderRadius   : '12px 12px 0 0',
     *         padding        : '4px 16px',
     *         backgroundColor: (theme) => theme.palette.semantic.background.white
     *      }
     * }
     */
    variant?: 'outlined' | 'filled' | 'menu';

    /**
     * `false` by default
     *
     * If `true` - text field will be at the bottom
     */
    textFieldBottom?: boolean;

    /**
     * `false` by default
     */
    isHideHeader?: boolean;
    testOptions?: Record<string, string>;

    /**
     * ###All fields are optional
     * @description
     * You can replace the component or pass props
     *
     * @example
     * // use with NotesComponents component or your component
     * import NotesComponents from '@/@core/components/notes/styled';
     * <Notes
     *      entity_id={load_id}
     *      entity_type="load"
     *      slots={{
     *          header: {
     *              component: NotesComponents.SectionHeader, // or your component
     *              props: {
     *                  sx: {
     *                      backgroundColor: (theme) => theme.palette.semantic.background.white,
     *                  }
     *              }
     *          },
     *          container: {
     *              component: NotesComponents.AuthContainer, // or your component
     *          }
     *      }}
     * />
     */
    slots?: {
        header?: {
            component?: typeof NotesComponents.SectionHeader;
            props?: ComponentProps<typeof NotesComponents.SectionHeader>;
        };
        container?: {
            component?: typeof NotesComponents.Container;
            props?: ComponentProps<typeof NotesComponents.Container>;
        };
        tabs?: {
            props?: Partial<ComponentProps<typeof NotesTabs>>;
        };
    };

    /**
     * Your own component for empty notes
     * @example
     * <Notes
     *     entity_id={load_id}
     *     entity_type="load"
     *     EmptyNotes={() => <div>No messages between you and driver</div>}
     * />
     */
    EmptyNotes?: React.FC;

    /**
     * set up wheelPropagation
     */
    wheelPropagation?: boolean;
};

export type UserTypeWithOnline = {
    selfieThumbUrl: string;
    fullName: string;
    online: boolean;
    onlineAge: string;
    driverId: string;
    userId: string;
    title: string;
};

export type UsersMap = Record<string, UserTypeWithOnline>;
