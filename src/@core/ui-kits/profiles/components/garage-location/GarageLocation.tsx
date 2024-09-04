import { memo, useState } from 'react';
import Profiles from '@/@core/ui-kits/profiles';
import { IndependentNoteChangeAction } from '@/@core/ui-kits/profiles/components/independent-note/IndependentNote';

type Props = {
    isSuccess: boolean;
    reset: () => void;
    parking_location: string;
    isLoading: boolean;
    onUpdateLocation: (parking_location: string) => void;
    testOptions?: Record<string, string | undefined>;
};

const GarageLocation = ({
    isSuccess,
    reset,
    parking_location,
    isLoading,
    onUpdateLocation,
    testOptions = {
        garageLocation    : '',
        saveGarageLocation: ''
    }
}: Props) => {
    const [garageLocation, setGarageLocation] = useState<string>(parking_location || '');

    const changeHandler: IndependentNoteChangeAction = (e) => {
        if (isSuccess) {
            reset();
        }

        setGarageLocation(e.target.value);
    };

    const saveGarageLocation = () => {
        onUpdateLocation(garageLocation.trim());
    };

    return (
        <Profiles.IndependentNote
            title="common:profile.right.independent_note.title"
            update={saveGarageLocation}
            isLoading={isLoading}
            isInfoExist={false}
            isDisabled={parking_location === garageLocation.trim() || isSuccess}
            onChange={changeHandler}
            inputLabel="common:profile.right.independent_note.field.label"
            inputPlaceholder="common:profile.right.independent_note.field.placeholder"
            inputValue={garageLocation}
            testOptions={{
                save   : testOptions.saveGarageLocation,
                content: testOptions.garageLocation
            }}
        />
    );
};

export default memo(GarageLocation);
