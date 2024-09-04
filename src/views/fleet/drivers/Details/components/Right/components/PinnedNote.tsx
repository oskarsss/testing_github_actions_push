import { memo, useState } from 'react';
import { TestIDs } from '@/configs/tests';
import Profiles from '@/@core/ui-kits/profiles';
import { IndependentNoteChangeAction } from '@/@core/ui-kits/profiles/components/independent-note/IndependentNote';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';

type Props = {
    id: string;
    note: string;
};

const PinnedNote = ({
    id,
    note
}: Props) => {
    const [driver_note, setDriverNote] = useState<string>(note || '');
    const [updateNote, {
        isSuccess,
        reset
    }] = DriversGrpcService.useUpdateDriverNoteMutation();

    const changeHandler: IndependentNoteChangeAction = (e) => {
        if (isSuccess) {
            reset();
        }

        setDriverNote(e.target.value);
    };

    const update = () => {
        updateNote({
            driverId: id,
            note    : driver_note.trim()
        });
    };

    return (
        <Profiles.IndependentNote
            title="drivers:profile.right.independent_note.title"
            update={update}
            isLoading={false}
            isInfoExist
            infoTitle="drivers:profile.right.independent_note.tooltip"
            isDisabled={note === driver_note.trim() || isSuccess}
            onChange={changeHandler}
            inputLabel="drivers:profile.right.independent_note.field.label"
            inputPlaceholder="drivers:profile.right.independent_note.field.placeholder"
            inputValue={driver_note}
            testOptions={{
                save   : TestIDs.pages.driverProfile.buttons.savePinnedNote,
                content: TestIDs.pages.driverProfile.fields.pinnedNote
            }}
        />
    );
};

export default memo(PinnedNote);
