import React from 'react';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { Autocomplete, FilterOptionsState, TextField } from '@mui/material';
import { useController } from 'react-hook-form';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export type Option<T> = React.FC<{ option: T }>;

export type Label<T> = React.FC<{ option: T }>;

export type FilterOptions = (options: string[], state: FilterOptionsState<string>) => string[];

type Props<T> = {
    control: any;
    listIds: string[];
    dataMap: Record<string, T>;
    OptionComponent: Option<T>;
    LabelComponent: Label<T>;
    name: string;
    variant?: 'outlined' | 'filled';
    maxTags?: number;
    label: IntlMessageKey;
    filterOptions: FilterOptions;
};

export default function ChipAutocomplete<T>({
    control,
    variant = 'filled',
    maxTags = 2,
    OptionComponent,
    LabelComponent,
    listIds,
    name,
    dataMap,
    label,
    filterOptions
}: Props<T>) {
    const { t } = useAppTranslation();
    const {
        field: {
            onChange,
            value
        }
    } = useController({
        name,
        control,
        defaultValue: []
    });

    return (
        <FormControl
            sx={{
                width: '100%'
            }}
        >
            <Autocomplete
                multiple
                sx={{}}
                id="size-small-filled"
                size="small"
                options={listIds}
                value={value}
                filterOptions={(options, state) => filterOptions(options, state)}
                onChange={(event, newValue) => {
                    onChange(newValue);
                }}
                disableCloseOnSelect
                renderTags={(value, getTagProps) => {
                    const displayedValue = value.slice(0, maxTags);
                    const otherValues = value.slice(maxTags);

                    return (
                        <>
                            {displayedValue.map((option, index) => (
                                <Chip
                                    variant="filled"
                                    label={<LabelComponent option={dataMap[option]} />}
                                    size="small"
                                    {...getTagProps({ index })}
                                />
                            ))}
                            {otherValues.length > 0 && (
                                <Chip
                                    variant="filled"
                                    label={`+${otherValues.length}`}
                                    size="small"
                                />
                            )}
                        </>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        maxRows={1}
                        {...params}
                        variant={variant}
                        size="small"
                        InputLabelProps={{
                            size: 'small'
                        }}
                        label={t(label)}
                    />
                )}
                renderOption={(props, option) => (

                    // const matches = match(option.title, inputValue, { insideWords: true });
                    // const parts = parse(option.title, matches);
                    <li {...props}>
                        <OptionComponent option={dataMap[option]} />
                    </li>
                )}
            />
        </FormControl>
    );
}
