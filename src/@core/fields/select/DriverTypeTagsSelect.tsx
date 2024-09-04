import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Chip, IconButton, InputAdornment, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { useDriversTypes } from '@/store/fleet/drivers/hooks';
import { useMemo, useState } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useCreateDriverType } from '@/views/settings/tabs/Drivers/Types/dialogs/CreateDriverType';

type Props<TFieldValues extends FieldValues = FieldValues> = {
    control: Control<TFieldValues>;
    showAddDriverTypeButton?: boolean;
};

export default function DriverTypeTagsSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    showAddDriverTypeButton
}: Props<TFieldValues>) {
    const [open, setOpen] = useState(false);
    const { t } = useAppTranslation();
    const { driverTypes } = useDriversTypes();
    const createDriverType = useCreateDriverType();
    const name = 'driverTypes' as Path<TFieldValues>;
    const label = 'core:selects.driver_type_tags.label';
    const {
        field: {
            value,
            onChange
        },
        formState: { errors }
    } = useController({
        name,
        control
    });

    const driver_types_options = useMemo(
        () => [
            ...driverTypes.map((driverType) => ({
                id  : driverType.driverTypeId,
                name: driverType.name,
                icon: DRIVER_TYPE_ICONS[driverType.icon]
            })),
            { id: 'all', name: t('fields:select.all'), icon: <span /> }
        ],
        [driverTypes, t]
    );

    const renderValue = (selected: PathValue<TFieldValues, Path<TFieldValues>>) => (
        <Box
            sx={{
                display : 'flex',
                flexWrap: 'wrap',
                gap     : 0.5
            }}
        >
            {selected.map((val: string) => {
                const selected_doc = driver_types_options.find((el) => el.id === val);
                if (!selected_doc) return null;
                return (
                    <Chip
                        key={val}
                        label={selected_doc.name}
                        icon={selected_doc.icon}
                        sx={{
                            padding: '0 5px',
                            span   : {
                                padding: '0 5px'
                            }
                        }}
                    />
                );
            })}
        </Box>
    );

    const renderMenuItems = useMemo(
        () =>
            driver_types_options.map((tag) => (
                <MenuItem
                    sx={{
                        gap: '5px'
                    }}
                    key={tag.id}
                    value={tag.id}
                >
                    {tag.icon}
                    {tag.name}
                </MenuItem>
            )),
        [driver_types_options]
    );

    const onChangeHandler = (e: SelectChangeEvent) => {
        if (e.target.value.includes('all')) {
            const all_values = driverTypes.map((driverType) => driverType.driverTypeId);
            onChange(all_values);
            setOpen(false);
        } else {
            onChange(e.target.value);
        }
    };

    const onAdd = () => {
        createDriverType.open({
            onSuccessCreate: (driverTypeId) => {
                onChange([...value, driverTypeId]);
            }
        });
    };

    const renderError = () => (
        <FormHelperText
            sx={{ color: 'error.main' }}
            id={`select-input-${name}`}
        >
            <span>{errors[name]?.message as string}</span>
        </FormHelperText>
    );

    return (
        <FormControl
            style={{ width: '100%' }}
            variant="filled"
        >
            <InputLabel
                required
                id={`select-chip-input-${name}`}
                error={Boolean(errors[name])}
                htmlFor={`select-chip-input-${name}`}
            >
                {t(label)}
            </InputLabel>
            <Select
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                variant="filled"
                value={value}
                onChange={onChangeHandler}
                label={t(label)}
                disabled={false}
                error={Boolean(errors.chip)}
                labelId={`select-chip-input-${name}`}
                aria-describedby={`select-chip-input-${name}`}
                multiple
                renderValue={renderValue}
                endAdornment={
                    showAddDriverTypeButton ? (
                        <Tooltip
                            title={t('core:selects.autocomplete.add_button.tooltip', {
                                label: t(label)
                            })}
                        >
                            <IconButton
                                size="small"
                                onClick={onAdd}
                                onKeyDown={(e) => e.stopPropagation()}
                                sx={{
                                    position: 'absolute',
                                    right   : '34px',
                                    padding : '2px'
                                }}
                            >
                                <AddCircleOutlineOutlinedIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    ) : undefined
                }
                sx={
                    showAddDriverTypeButton
                        ? {
                            paddingRight       : 0,
                            '.MuiSelect-filled': {
                                paddingRight: '60px !important'
                            }
                        }
                        : undefined
                }
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 48 * 4.5 + 8,
                            width    : 250
                        }
                    }
                }}
            >
                {renderMenuItems}
            </Select>
            {errors[name] && renderError()}
        </FormControl>
    );
}
