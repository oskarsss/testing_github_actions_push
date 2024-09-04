import Typography from '@mui/material/Typography';
import { LoadDraftFields } from '@proto/load_drafts';
import { Control, Path, useController, useWatch } from 'react-hook-form';

type Props = {
    name: Path<LoadDraftFields>;
    control: Control<LoadDraftFields>;
};

const noteCharactersLimit = 1024;

export default function NotesCustomError({
    name,
    control
}: Props) {
    const {
        fieldState: { error }
    } = useController({ name, control });
    const countNoteCharacters = useWatch({ control, name }).toString().length;
    return (
        <>
            <span>{error?.message || ''}</span>
            <Typography
                variant="body2"
                color="textSecondary"
                position="absolute"
                bottom="0"
                right="0"
            >
                {countNoteCharacters}/{noteCharactersLimit}
            </Typography>
        </>
    );
}
