/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable max-len */
import { CSSProperties, MouseEvent, SyntheticEvent, useState, useRef } from 'react';
import { Control, ErrorOption, Path, useController, FieldValues } from 'react-hook-form';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useEntityTags, useTags } from '@/store/tags/hooks';
import Chip from '@mui/material/Chip';
import { NoOptionsText } from '@/@core/fields/select/components/CustomAutocomplete';
import AddIcon from '@mui/icons-material/Add';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TestKey, applyTestId, TestIDs } from '@/configs/tests';
import { TagModel_EntityType } from '@proto/models/model_tag';
import TagsGrpcService from '@/@grpcServices/services/tags.service';
import type { TagEntityGetReply_Tag } from '@proto/tags';
import { useCreateTagMenu } from './CreateTagMenu';
import CreateTagButton from './CreateTagButton';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    entityType: keyof typeof TagModel_EntityType;
    name?: Path<TFieldValues>;
    width?: CSSProperties['width'];
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    required?: boolean;
    inputTestID?: string;
}

export default function TagsSelect<TFieldValues extends FieldValues = FieldValues>({
    errors,
    control,
    entityType,
    name = 'tags' as Path<TFieldValues>,
    width = '100%',
    variant = 'filled',
    size = 'small',
    inputTestID,
    required = false
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const createTagMenu = useCreateTagMenu();
    const inputRef = useRef<HTMLInputElement>(null);
    const [enteredValue, setEnteredValue] = useState<string>('');
    const [createTag] = TagsGrpcService.useCreateTagMutation();
    const {
        tags,
        isLoading
    } = useTags(entityType);

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

    const handleChange = (e: SyntheticEvent<Element, Event>, data: TagEntityGetReply_Tag[]) => {
        const selected_tags = data.map((val) => val.tagId ?? val);
        onChange(selected_tags);
    };

    const addNewTag = (tagId: string) => {
        onChange([...value, tagId]);
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleClick = () => {
        const value = enteredValue.trim();
        if (!value) return;
        if (tags.findIndex((tag) => tag.name === value) < 0) {
            createTag({
                entityType: TagModel_EntityType[entityType],
                name      : value
            })
                .unwrap()
                .then((response) => {
                    addNewTag(response.tagId);
                });
        }
    };

    const renderNoOptionText = () => (
        <NoOptionsText onClick={handleClick}>
            <AddIcon />
            {t('core:selects.autocomplete.no_options.create.first_text')}{' '}
            <span>"{enteredValue}"</span> {t('entity:tag')}
        </NoOptionsText>
    );

    const onAddTag = (e: MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLElement>) => {
        createTagMenu.open({
            entityType,
            addNewTag
        })(e);
    };

    const renderTags = (
        value: TagEntityGetReply_Tag[],
        getTagProps: AutocompleteRenderGetTagProps
    ) =>
        value.map((val, index) => {
            const selected_tag = tags.find((tag) => tag.tagId === String(val));
            if (selected_tag === undefined) {
                return null;
            }
            return (
                <Chip
                    label={selected_tag?.name}
                    {...applyTestId(TestIDs.components.select.tags.optionPrefix)}
                    {...getTagProps({ index })}
                    sx={{
                        height     : 22,
                        marginRight: 5
                    }}
                />
            );
        });

    const clearValue = () => {
        onChange([]);
        setEnteredValue('');
    };

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
                ...params.inputProps,
                [TestKey]: inputTestID
            }}
            label={t('entity:tags')}
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
                options={tags}
                loading={isLoading}
                id="select-car-tag"
                isOptionEqualToValue={(option, val) => option.tagId === String(val)}
                getOptionLabel={(option) => option.name}
                noOptionsText={renderNoOptionText()}
                value={value}
                openOnFocus
                renderTags={renderTags}
                renderInput={renderInput}
                onChange={handleChange}
                onBlur={onBlur}
                onInputChange={(e, value) => setEnteredValue(value)}
            />

            {errors[name] && (
                <FormHelperText
                    error
                    id="select-input-tags"
                >
                    <span>{errors[name]?.message}</span>
                </FormHelperText>
            )}
            <CreateTagButton onCreateTag={onAddTag} />
        </FormControl>
    );
}
