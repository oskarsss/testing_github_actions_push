import React, { useRef } from 'react';
import { Control, useController } from 'react-hook-form';
import { TextField } from '@mui/material';
import MentionsPopper from './MentionsPopper';
import { FormValues } from '.';

type Props = {
    control: Control<FormValues>;
};

function SubjectTextField({ control }: Props) {
    const { field } = useController({ control, name: 'subject' });

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const inputRef = useRef<HTMLElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e.target.value);
    };

    const setMention = (mention: string) => {
        field.onChange(field.value + mention);
        setOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.shiftKey && event.key === '{' && field.value[field.value.length - 1] !== '{') {
            setOpen(true);
            setAnchorEl(event.currentTarget);

            return true;
        }
        if (open) {
            if (
                event.key === 'Enter' ||
                event.key === 'Tab' ||
                event.key === 'Escape' ||
                event.key === 'ArrowDown' ||
                event.key === 'ArrowUp'
            ) {
                return;
            }
            setOpen(false);
        }
    };

    const handleBlur = () => {
        field.onBlur();
        setOpen(false);
    };

    return (
        <div>
            <MentionsPopper
                anchorEl={anchorEl}
                open={open}
                setMention={setMention}
            />

            <TextField
                inputRef={inputRef}
                label="Subject"
                variant="filled"
                fullWidth
                value={field.value}
                onKeyDown={handleKeyDown}
                onChange={onChange}
                onBlur={handleBlur}
            />
        </div>
    );
}

export default SubjectTextField;
