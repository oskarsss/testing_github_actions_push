import { ReactNode } from 'react';
import ChipDotIcon from '@/@core/fields/chip-select/components/ChipDotIcon';

export function createCustomDotIcons<Status extends string>(array: Status[]) {
    return array.reduce((acc, item) => {
        acc[item as Status] = <ChipDotIcon />;
        return acc;
    }, {} as Record<Status, ReactNode>);
}
