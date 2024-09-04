import CircularProgress from '@mui/material/CircularProgress';
import AllNotes from '@/@core/components/notes/components/AllNotes/AllNotes';
import DragActive from '@/@core/components/notes/components/DragActive/DragActive';
import { NoteEntityType } from '@/models/notes/note-entity-type';
import type { IntlMessageKey } from '@/@types/next-intl';
import { Wrapper } from './styled';
import Form from './Form/Form';

type Props = {
    entity_id: string;
    onClose?: () => void;
    EmptyNotes?: React.FC;
    size?: 'small' | 'normal';
    textFieldBottom?: boolean;
    placeholder?: IntlMessageKey;
    testOptions?: Record<string, string>;
    isDragActive: boolean;
    isLoading: boolean;
};

export default function NotesView({
    entity_id,
    onClose,
    size = 'normal',
    textFieldBottom = false,
    isLoading,
    isDragActive = false,
    placeholder = 'fields:note.placeholder_3',
    testOptions = {
        messageTestId   : '',
        messageBoxTestId: '',
        leaveNoteTestId : ''
    },
    EmptyNotes
}: Props) {
    if (isLoading) {
        return (
            <Wrapper>
                <CircularProgress size={30} />
            </Wrapper>
        );
    }

    if (isDragActive) {
        return <DragActive />;
    }

    return (
        <>
            <AllNotes
                text_field_bottom={textFieldBottom}
                size={size}
                EmptyNotes={EmptyNotes}
            />

            <Form
                entity_id={entity_id}
                placeholder={placeholder}
                onClose={onClose}
                messageTestId={testOptions.messageBoxTestId}
                messageBoxTestId={testOptions.messageBoxTestId}
                leaveNoteTestId={testOptions.leaveNoteTestId}
            />
        </>
    );
}
