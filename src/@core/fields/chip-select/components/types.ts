import { ComponentProps } from 'react';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import { ProvideTagsType } from '@/store/api_tags';

namespace ChipSelectTypes {
    export type OnChange<StatusType> = (status: StatusType) => Promise<any> | void;
    export type OtherProps = Pick<
        ComponentProps<typeof ChipSelect>,
        | 'is_changing'
        | 'tooltip'
        | 'buttonTestId'
        | 'optionTestId'
        | 'styles'
        | 'sx'
        | 'full_width'
        | 'show_arrow'
        | 'show_icon'
        | 'size'
        | 'stylesText'
    >;

    export type InvalidateTags = ProvideTagsType[] | { id: string; type: ProvideTagsType }[];

    export type CustomColors = { background: string; color: string };
}

export default ChipSelectTypes;
