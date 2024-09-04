import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { styled } from '@mui/material/styles';
import MuiList from '@mui/material/List';
import moment from 'moment-timezone';
import React from 'react';
import getShortcutsItem from './config';

const List = styled(MuiList)(({ theme }) => ({
    gridColumn                 : 1,
    gridRow                    : '1 / 4 !important',
    padding                    : '16px',
    backgroundColor            : theme.palette.semantic.background.secondary,
    '& .MuiListItemButton-root': {
        borderRadius: '4px',
        marginBottom: '4px'
    },
    '& ~ .MuiPickersLayout-actionBar': {
        gridColumn: 2
    }
}));

type Props = {
    onChange: (value: moment.Moment) => void;
    selectedDate: string | null;
};

export default function DateInputShortCuts({
    onChange,
    selectedDate
}: Props) {
    const { t } = useAppTranslation();
    const shortcuts = getShortcutsItem(selectedDate, t);

    return (
        <List>
            {shortcuts.map(({
                label,
                getValue
            }) => (
                <ListItem
                    key={label}
                    disablePadding
                >
                    <ListItemButton onClick={() => onChange(getValue())}>{label}</ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}
