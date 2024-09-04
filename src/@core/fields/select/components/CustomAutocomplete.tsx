/* eslint-disable react/jsx-no-duplicate-props */
import {
    CSSProperties,
    HTMLAttributes,
    MouseEvent,
    ReactNode,
    SyntheticEvent,
    KeyboardEvent,
    useRef,
    useState
} from 'react';
import FormControl from '@mui/material/FormControl';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Box from '@mui/material/Box';
import { Autocomplete, FilledInputProps, InputAdornment, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { applyTestId } from '@/configs/tests';
import CustomAutocompleteAddButton from '@/@core/fields/select/components/CustomAutocompleteAddButton';
import CustomAutocompleteClearButton from '@/@core/fields/select/components/CustomAutocompleteClearButton';
import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const NoOptionsText = styled('div')(({ theme }) => ({
    color     : theme.palette.semantic.foreground.brand.primary,
    cursor    : 'pointer',
    transition: 'fontWeight 0.2s ease-in-out',
    display   : 'flex',
    alignItems: 'center',
    gap       : 4,
    flexWrap  : 'wrap',

    span: {
        fontWeight: 600
    },

    '&:hover': {
        fontWeight: 500
    }
}));

type EntityType =
    | 'broker'
    | 'tag'
    | 'customer'
    | 'category'
    | 'company'
    | 'plate'
    | 'vendor'
    | 'cycle';

export type Option = {
    id: string | number;
    name: string;
    marker?: ReactNode;
    markerEnd?: ReactNode;
    optionContent?: ReactNode;
};

export type OptionObjects = Record<string, Option>;

interface AutoCompleteProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    labelOption?: IntlOptions;
    width?: CSSProperties['width'];
    options: Option[];
    size?: 'small' | 'medium';
    autoFocus?: boolean;
    onAdd?: (event: MouseEvent<HTMLButtonElement>) => void;
    tooltipAddButton?: IntlMessageKey;
    entities_by_id: Record<number, Option>;
    entity?: EntityType;
    onCreate?: (e: MouseEvent<HTMLDivElement>, value: string) => void;
    required?: boolean;
    inputProps?: FilledInputProps;
    loading?: boolean;
    onChangeText?: (value: string) => void;
    testOptions?: Record<string, string | undefined>;
    disabled?: boolean;
    readOnly?: boolean;
    CustomInfoComponent?: ReactNode;
    customFilterOptions?: (options: Option[], enteredValue: string) => Option[];
}
export default function CustomAutocomplete<TFieldValues extends FieldValues = FieldValues>({
    control,
    label,
    labelOption,
    name,
    options,
    width = '100%',
    size = 'small',
    onAdd,
    tooltipAddButton,
    autoFocus = false,
    entities_by_id,
    entity,
    onCreate,
    required = false,
    loading = false,
    inputProps,
    onChangeText = () => {},
    testOptions = {
        inputTestID : '',
        addTestId   : '',
        optionTestId: ''
    },
    disabled = false,
    readOnly = false,
    CustomInfoComponent,
    customFilterOptions
}: AutoCompleteProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const inputRef = useRef<HTMLInputElement>(null);
    const [entered_value, setEnteredValue] = useState<string>('');
    const {
        field: {
            onChange,
            onBlur,
            value
        },
        formState: { errors }
    } = useController({
        name,
        control
    });

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        inputRef.current?.blur();
        if (onCreate) {
            onCreate(e, entered_value);
        }
    };

    const renderNoOptionText = () => {
        if (onAdd && onCreate && entity) {
            return (
                <NoOptionsText onClick={handleClick}>
                    <AddIcon />
                    {t('core:selects.autocomplete.no_options.create.first_text')}{' '}
                    {entered_value && <span>"{entered_value}"</span>} {t(`entity:${entity}`)}
                </NoOptionsText>
            );
        }

        return t('core:selects.autocomplete.no_options.default_text');
    };

    const getOptionLabel = (option: Option) => {
        if (typeof option === 'string' || typeof option === 'number') {
            if (!option) {
                return '';
            }

            if (entities_by_id[option]) {
                return entities_by_id[option].name;
            }
        }
        return option.name ? option.name : '';
    };

    const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: Option) => {
        const updatedProps = { ...props, key: option.id };
        return (
            <Box
                component="li"
                {...updatedProps}
                {...applyTestId(testOptions.optionTestId)}
                sx={{
                    ...(option?.marker && {
                        svg: {
                            marginRight: '5px'
                        }
                    })
                }}
            >
                {option?.marker}
                {option?.optionContent || option.name}
                {option?.markerEnd}
            </Box>
        );
    };

    const clearValue = () => {
        onChange('');
        setEnteredValue('');
    };

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            inputRef={inputRef}
            required={required}
            size={size}
            variant="filled"
            autoFocus={autoFocus}
            InputProps={{
                ...params.InputProps,
                ...inputProps,
                endAdornment:
                    !readOnly && !disabled ? (
                        <InputAdornment
                            position="end"
                            sx={{ ml: 0 }}
                        >
                            {CustomInfoComponent ? (
                                <Stack
                                    position="relative"
                                    top={-8}
                                >
                                    {CustomInfoComponent}
                                </Stack>
                            ) : undefined}
                            {!!value && <CustomAutocompleteClearButton onClick={clearValue} />}
                            {onAdd && (
                                <CustomAutocompleteAddButton
                                    onClick={onAdd}
                                    tooltipAddButton={tooltipAddButton}
                                    label={t(label, labelOption)}
                                    addTestId={testOptions.addTestId}
                                />
                            )}
                            {params.InputProps.endAdornment}
                        </InputAdornment>
                    ) : undefined
            }}
            inputProps={{
                ...params.inputProps,
                ...applyTestId(testOptions.inputTestID)
            }}
            InputLabelProps={{
                shrink: true
            }}
            label={t(label, labelOption)}
            error={Boolean(errors[name])}
            onKeyDown={(e) => e.stopPropagation()}
        />
    );

    const renderError = () => (
        <FormHelperText
            error
            id={`select-input-${name}`}
        >
            <span>{errors[name]?.message as string}</span>
        </FormHelperText>
    );

    const handleChange = (e: SyntheticEvent<Element>, data: Option | Option[] | null) => {
        if (!Array.isArray(data)) {
            onChange(data ? data.id : '');
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && options.length === 1) {
            const target = e.target as HTMLInputElement;
            target.blur();
            onChange(options[0].id);
        }
    };

    return (
        <FormControl style={{ width }}>
            <Autocomplete
                disabled={disabled}
                options={options}
                loading={loading}
                isOptionEqualToValue={(option, val) => String(option.id) === String(val)}
                getOptionLabel={(option) => getOptionLabel(option)}
                filterOptions={
                    customFilterOptions
                        ? (options: Option[]) => customFilterOptions(options, entered_value)
                        : undefined
                }
                value={value}
                openOnFocus
                disableClearable
                readOnly={readOnly}
                noOptionsText={renderNoOptionText()}
                renderOption={renderOption}
                renderInput={renderInput}
                onChange={handleChange}
                onBlur={onBlur}
                onKeyDownCapture={onKeyDown}
                onInputChange={(e, value) => {
                    setEnteredValue(value);
                    onChangeText(value);
                }}
            />
            {errors[name] && renderError()}
        </FormControl>
    );
}
