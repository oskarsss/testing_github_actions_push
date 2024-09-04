/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable max-len */
import { CSSProperties, SyntheticEvent, useState, useRef } from 'react';
import { Control, ErrorOption, Path, useController, FieldValues } from 'react-hook-form';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { NoOptionsText } from '@/@core/fields/select/components/CustomAutocomplete';
import AddIcon from '@mui/icons-material/Add';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';
import Loading from '@/@core/components/page/Loading';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, Tooltip } from '@mui/material';
import CustomAutocompleteAddButton from '@/@core/fields/select/components/CustomAutocompleteAddButton';
import { IconButton } from '@/@core/fields/select/BrokerSelect/styled';
import { applyTestId } from '@/configs/tests';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export type Option = {
    userId: string;
    firstName: string;
    lastName: string;
    selfieThumbUrl: string;
};

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    width?: CSSProperties['width'];
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    required?: boolean;
    label: IntlMessageKey;
    options: Option[];
    onAddNewUser?: (searchValue: string) => void;
    disabled?: boolean;
    loading?: boolean;
}

export default function ClientMembersSelect<TFieldValues extends FieldValues = FieldValues>({
    errors,
    control,
    name,
    width = '100%',
    variant = 'filled',
    size = 'small',
    required = false,
    label,
    options,
    onAddNewUser,
    disabled,
    loading
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const inputRef = useRef<HTMLInputElement>(null);
    const [enteredValue, setEnteredValue] = useState<string>('');

    const {
        field: {
            value,
            onChange,
            onBlur
        }
    } = useController({
        name,
        control
    });
    const handleChange = (e: SyntheticEvent<Element, Event>, data: Option[]) => {
        const selected_tags = data.map((val) => val.userId ?? val);
        onChange(selected_tags);
    };

    const handleClick = () => {
        const value = enteredValue.trim();
        if (!onAddNewUser) return;
        if (
            options.findIndex((option) =>
                `${option.firstName} ${option.lastName}`.includes(value)) < 0
        ) {
            onAddNewUser(value);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const renderNoOptionText = () => (
        <NoOptionsText onClick={handleClick}>
            <AddIcon />
            {t('core:selects.autocomplete.no_options.create.first_text')}{' '}
            {enteredValue && <span>"{enteredValue}"</span>} {t(label)}
        </NoOptionsText>
    );

    const renderTags = (value: Option[], getTagProps: AutocompleteRenderGetTagProps) =>
        value.map((val, index) => {
            const selected_tag = options.find((option) => option.userId === String(val));
            if (!selected_tag) return null;
            return (
                <Chip
                    {...getTagProps({ index })}
                    label={`${selected_tag.firstName} ${selected_tag.lastName}`}
                    sx={{
                        height     : 22,
                        marginRight: 5
                    }}
                />
            );
        });

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            variant={variant}
            size={size}
            inputRef={inputRef}
            required={required}
            InputProps={{
                ...params.InputProps
            }}
            sx={{
                '& .MuiInputBase-root': {
                    paddingRight: '50px !important'
                }
            }}
            inputProps={{
                ...params.inputProps
            }}
            label={t(label)}
            InputLabelProps={{
                shrink: true
            }}
            error={Boolean(errors[name])}
            onKeyDown={(e) => e.stopPropagation()}
        />
    );

    return (
        <FormControl
            style={{ width }}
            size={size}
            variant={variant}
        >
            <Autocomplete
                multiple
                disableClearable
                options={options}
                id="select-users"
                isOptionEqualToValue={(option, val) => option.userId === String(val)}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                noOptionsText={renderNoOptionText()}
                value={value}
                openOnFocus
                renderTags={renderTags}
                renderInput={renderInput}
                onChange={handleChange}
                onBlur={onBlur}
                onInputChange={(e, value) => setEnteredValue(value)}
                disabled={disabled || loading}
            />

            {errors[name] && (
                <FormHelperText
                    error
                    id="select-users"
                >
                    <span>{errors[name]?.message}</span>
                </FormHelperText>
            )}
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                position="absolute"
                right={36}
                top="50%"
                sx={{ transform: 'translate(0, -50%)' }}
                hidden={!onAddNewUser && !loading}
            >
                {loading && <CircularProgress size={16} />}
                {onAddNewUser && (
                    <Tooltip
                        title={t('core:selects.autocomplete.add_button.tooltip', {
                            label: t(label)
                        })}
                    >
                        <IconButton
                            size="small"
                            onClick={() => onAddNewUser('')}
                            onKeyDown={(e) => e.stopPropagation()}
                            sx={{ padding: '2px', position: 'static' }}
                        >
                            <AddCircleOutlineOutlinedIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
        </FormControl>
    );
}
