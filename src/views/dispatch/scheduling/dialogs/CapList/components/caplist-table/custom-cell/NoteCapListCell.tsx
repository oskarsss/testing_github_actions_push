import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import trucksAvailabilityService from '@/@grpcServices/services/trucks-availability.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Input = styled('input')(({ theme }) => ({
    padding        : '4px 8px',
    borderRadius   : '4px',
    width          : '100%',
    overflow       : 'hidden',
    borderColor    : 'transparent',
    backgroundColor: 'transparent',
    margin         : 0,
    border         : 'none',
    boxShadow      : 'none',
    font           : 'inherit',
    color          : theme.palette.semantic.text.secondary,
    fontSize       : '14px',
    fontWeight     : 500,

    '&:hover': {
        backgroundColor: theme.palette.semantic.foreground.white.tertiary
    },

    '&::placeholder': {
        color: theme.palette.semantic.text.disabled
    }
}));

type Props = {
    truckId: string;
    note: string;
};

const NoteCapListCell = ({
    truckId,
    note
}: Props) => {
    const { t } = useAppTranslation();
    const [value, setValue] = useState(note);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [update, { isLoading }] = trucksAvailabilityService.useUpdateTruckAvailabilityMutation();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        if (isLoading || note === value) return;
        update({
            note    : value,
            truckId,
            autoPost: false
        })
            .unwrap()
            .then(() => {
                inputRef.current?.blur();
            });
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlur();
        }
    };

    useEffect(() => {
        if (inputRef.current === document.activeElement) return;
        setValue(note);
    }, [note]);

    return (
        <Tooltip
            title={t('common:tooltips.edit_note')}
            disableInteractive
        >
            <Input
                onClick={(e) => {
                    e.stopPropagation();
                }}
                name="note"
                autoComplete="off"
                ref={inputRef}
                value={value}
                placeholder={t('schedule:dialogs.cap_list.table.cells.note.placeholder')}
                disabled={isLoading}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />
        </Tooltip>
    );
};

export default NoteCapListCell;
