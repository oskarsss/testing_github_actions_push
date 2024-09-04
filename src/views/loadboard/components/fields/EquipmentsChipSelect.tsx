import React, { useMemo } from 'react';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { Autocomplete, TextField } from '@mui/material';
import { useController } from 'react-hook-form';
import createMap from '@/utils/create-map';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    control: any;
    variant?: 'outlined' | 'filled';
    maxTags?: number;
};

export default function EquipmentsChipSelect({
    control,
    variant = 'outlined',
    maxTags = 2
}: Props) {
    const { data } = LoadboardGrpcService.useGetEquipmentsQuery({});
    const { t } = useAppTranslation();
    const {
        field: {
            onChange,
            value
        }
    } = useController({
        name        : 'equipment_ids',
        control,
        defaultValue: []
    });

    const [equipmentsList, equipmentsMap] = useMemo(
        () => [
            data?.equipments.map((eq) => eq.equipmentId) || [],
            createMap(data?.equipments || [], 'equipmentId')
        ],
        [data?.equipments]
    );

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
                options={equipmentsList}
                getOptionLabel={(option) => equipmentsMap[option]?.code}
                value={value}
                onChange={(event, newValue) => {
                    onChange(newValue);
                }}
                renderTags={(value, getTagProps) => {
                    const displayedValue = value.slice(0, maxTags);
                    const otherValues = value.slice(maxTags);

                    return (
                        <>
                            {displayedValue.map((option, index) => (
                                <Chip
                                    variant="filled"
                                    label={equipmentsMap[option]?.name}
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
                        label={t('loadboard:fields.equipments_type.label')}
                    />
                )}
                renderOption={(props, option, {
                    selected,
                    inputValue
                }) => (

                    // const matches = match(option.title, inputValue, { insideWords: true });
                    // const parts = parse(option.title, matches);
                    <li {...props}>{equipmentsMap[option].name}</li>
                )}
            />
        </FormControl>
    );
}
