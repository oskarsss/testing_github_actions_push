import Notes from '@/@core/components/notes/Notes';
import { Stack } from '@mui/material';

type Props = {
    toll_transaction_id: string;
};

export default function EditTollTransactionNote({ toll_transaction_id }: Props) {
    return (
        <Stack
            padding={4}
            flex="1 1 0"
        >
            <Notes
                entity_type="toll_transaction"
                entity_id={toll_transaction_id}
                size="normal"
                variant="outlined"
                textFieldBottom

                // testOptions={{
                //     messageTestId   : TestIDs.pages.editTruck.fields.message,
                //     messageBoxTestId: TestIDs.pages.editTruck.areas.messageBox,
                //     leaveNoteTestId : TestIDs.pages.editTruck.buttons.sendMessage
                // }}
            />
        </Stack>
    );
}
