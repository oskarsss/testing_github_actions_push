import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useCallback } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import shortcutsItems, { IShortcutsItem } from './config';
import { ValueType } from '../types';
import { List } from './styled';

type Props = {
    onChange: (value: ValueType) => void;
    selectedDate: ValueType;
    setIsOpen: (value: boolean) => void;
    customShortcuts?: IShortcutsItem[];
};

export default function Shortcuts({
    onChange,
    selectedDate,
    customShortcuts,
    setIsOpen
}: Props) {
    const { t } = useAppTranslation();
    const onClick = useCallback(
        (shortcut: IShortcutsItem) => {
            const value = shortcut.getValue(selectedDate[0]);
            onChange(value);
            if (!shortcut?.is_reset) {
                setTimeout(() => setIsOpen(false), 300);
            }
        },
        [selectedDate[0]]
    );

    const isSelected = useCallback(
        (getValue: IShortcutsItem['getValue'], is_period?: boolean) => {
            const [startSelected, endSelected] = selectedDate;
            const [startValue, endValue] = getValue();
            if (!startValue || !endValue) return false;
            if (!startSelected || !endSelected) return false;

            if (is_period) {
                return (
                    startSelected.diff(endSelected, 'days') === startValue.diff(endValue, 'days')
                );
            }
            return startValue.isSame(startSelected, 'day') && endValue.isSame(endSelected, 'day');
        },
        [selectedDate[0], selectedDate[1]]
    );

    return (
        <List>
            {(customShortcuts || shortcutsItems).map(({
                label,
                getValue,
                is_period,
                is_reset
            }) => {
                const selected = isSelected(getValue, is_period);
                return (
                    <ListItem
                        key={label}
                        disablePadding
                    >
                        <ListItemButton
                            selected={selected}
                            onClick={() => onClick({ label, getValue, is_reset })}
                        >
                            {t(label)}
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
