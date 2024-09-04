import { TextField } from '@mui/material';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import MentionsPopper from '@/views/accounting/settlements/dialogs/send-settlement/components/MentionsPopper';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DefaultValues } from '@/views/accounting/settlements/dialogs/send-settlement/helpers';

type Props = {
    control: Control<DefaultValues>;
    label: string;
    placeholder: string;
    name: keyof DefaultValues;
    minRows?: number;
    maxRows?: number;
    multiline?: boolean;
};

function SendSettlementsTextField({
    control,
    label,
    placeholder,
    name,
    minRows,
    maxRows,
    multiline
}: Props) {
    const { t } = useAppTranslation();
    const {
        field,
        fieldState: { error }
    } = useController({ control, name });
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e.target.value);
    };

    const setMention = (mention: string) => {
        field.onChange(field.value + mention);
        setOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const value = (field.value || '') as string;
        if (event.shiftKey && event.key === '{' && value[value.length - 1] !== '{') {
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
                label={label}
                placeholder={placeholder}
                variant="filled"
                fullWidth
                minRows={minRows}
                maxRows={maxRows}
                value={field.value}
                onKeyDown={handleKeyDown}
                onChange={onChange}
                onBlur={handleBlur}
                error={!!error}
                multiline={multiline}
            />
        </div>
    );
}

export default SendSettlementsTextField;
