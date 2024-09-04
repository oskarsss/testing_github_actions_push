import { Stack } from '@mui/material';
import DocumentsComponents from '../styled';
import DocumentUpdatingProcess from './DocumentUpdatingProcess';

type Props = { document_title: string; isUpdating: boolean };

export default function DocumentHeaderTitle({
    document_title,
    isUpdating
}: Props) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            overflow="hidden"
            flexGrow={1}
            width="100%"
        >
            <DocumentsComponents.DocTypeTitle
                variant="subtitle1"
                noWrap
            >
                {document_title}
            </DocumentsComponents.DocTypeTitle>
            <DocumentUpdatingProcess isUpdating={isUpdating} />
        </Stack>
    );
}
