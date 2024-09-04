import { memo, useCallback } from 'react';
import { isEqual } from 'lodash';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { Count, Label, ListItemButton, MenuItemWrap } from './styled';

type Props = {
    label: React.ReactNode;
    count?: React.ReactNode;
    checked: boolean | string | number | null;
    value: string;
    onClick: (value: string) => void;
    disabled?: boolean;
};

const FilterMenuItem = memo(
    ({
        label,
        checked,
        count,
        onClick,
        value,
        disabled = false
    }: Props) => {
        const handleClick = useCallback(() => {
            onClick(value);
        }, [onClick, value]);
        return (
            <ListItemButton onClick={handleClick}>
                <MenuItemWrap>
                    <Checkbox
                        checked={!!checked}
                        disabled={disabled}
                    />
                    <Label>{label}</Label>
                </MenuItemWrap>
                <Count>{count}</Count>
            </ListItemButton>
        );
    },
    isEqual
);

export default FilterMenuItem;
