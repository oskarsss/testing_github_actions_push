import { memo, CSSProperties, ReactNode, ComponentProps, ChangeEvent } from 'react';
import { Checkbox } from '@mui/material';
import TableEditorComponents from '@/@core/components/table/TableEditor/TableEditorComponents';

type Props = {
    height?: CSSProperties['height'];
    onChange: (unique_key: string, checked: boolean) => void;
    icon?: ReactNode;
    checkedIcon?: ReactNode;
    isChecked: boolean;
    disabled?: boolean;
    unique_key: string;
    name?: string;
    sx?: ComponentProps<typeof TableEditorComponents.FormControlLabel>['sx'];
};

const CheckBoxComponent = ({
    unique_key,
    name,
    height,
    onChange,
    disabled = false,
    icon,
    checkedIcon,
    isChecked,
    sx
}: Props) => {
    const toggleChecked = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(unique_key, event.target.checked);
    };

    return (
        <TableEditorComponents.FormControlLabel
            height={height}
            checked={Boolean(isChecked)}
            disabled={disabled}
            sx={sx}
            control={(
                <Checkbox
                    onChange={toggleChecked}
                    disabled={disabled}
                    checked={Boolean(isChecked)}
                    icon={icon}
                    checkedIcon={checkedIcon}
                />
            )}
            label={name}
        />
    );
};

export default memo(CheckBoxComponent);
