import { KeyboardEvent } from 'react';

namespace AssignTypes {
    export type OptionProps<Option> = {
        option: Option;
        onClickOption: (option: Option) => void;
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
        setOptionRef: (ref: HTMLElement | null) => void;
        selectedOptionId?: string;
    };
}

export default AssignTypes;
