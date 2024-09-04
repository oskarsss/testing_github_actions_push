import Notes from '@/@core/components/notes/Notes';
import { Stack } from '@mui/material';
import React from 'react';

type Props = {
    fuelTransactionId: string;
};

export default function EditFuelTransactionNotes({ fuelTransactionId }: Props) {
    return (
        <Stack
            padding={4}
            flex="1 1 0"
        >
            <Notes
                entity_type="fuel_transaction"
                entity_id={fuelTransactionId}
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
