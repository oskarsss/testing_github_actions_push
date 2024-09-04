import MenuList from '@mui/material/MenuList';
import EditIcon from '@mui/icons-material/Edit';
import Notes from '@/store/notes/types';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import NotesGrpcService from '@/@grpcServices/services/notes.service';
import VectorIcons from '@/@core/icons/vector_icons';
import NoteMoreOptionItemMarkup from './NoteMoreOptionItemMarkup';

type Props = {
    note: Notes.NoteType;
    setEditedNote: (note: Notes.NoteType | null) => void;
    hasEditPermission: boolean;
    hasDeletePermission: boolean;
    isEditableNote: boolean;
};
export const useNoteMoreOptionMenu = menuHookFabric(NoteMoreOption, { cleanContentOnClose: true });

function NoteMoreOption({
    note,
    setEditedNote,
    hasEditPermission,
    hasDeletePermission,
    isEditableNote
}: Props) {
    const menu = useNoteMoreOptionMenu(true);

    const [deleteNote] = NotesGrpcService.useDeleteNoteMutation();

    const confirm = useConfirm();

    const handleDelete = () => {
        menu.close();
        confirm({
            title       : 'core:notes.more_options.delete.confirm.title',
            body        : 'core:notes.more_options.delete.confirm.body',
            confirm_text: 'common:button.delete',
            onConfirm   : async () => {
                try {
                    await deleteNote({
                        noteId: note.noteId
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    const handleEdit = () => {
        setEditedNote(note);
        menu.close();
    };

    return (
        <MenuList
            disablePadding
            sx={{ opacity: 0.8 }}
            autoFocus
            onKeyDown={(e) => {
                e.preventDefault();
                if (e.key === 'e') {
                    handleEdit();
                }
                if (e.key === 'Delete') {
                    handleDelete();
                }
            }}
        >
            {hasEditPermission && isEditableNote && (
                <NoteMoreOptionItemMarkup
                    icon={<EditIcon sx={{ fontSize: '14px' }} />}
                    text="common:button.edit"
                    button_key_text="E"
                    onAction={handleEdit}
                />
            )}
            {hasDeletePermission && (
                <NoteMoreOptionItemMarkup
                    icon={<VectorIcons.Delete />}
                    text="common:button.delete"
                    text_color="#D92D20"
                    button_key_text="delete"
                    onAction={handleDelete}
                />
            )}
        </MenuList>
    );
}
