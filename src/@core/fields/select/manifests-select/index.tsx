import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import type { IntlMessageKey } from '@/@types/next-intl';
import createMap from '@/utils/create-map';
import {
    Autocomplete,
    Box,
    CircularProgress,
    FormControl,
    FormHelperText,
    TextField
} from '@mui/material';
import { ManifestGetRequest, ManifestGetRequest_SortType } from '@proto/manifests';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useMemo, useState, type CSSProperties } from 'react';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import ManifestOption from './components/Option';

type Props<T extends FieldValues = FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    manifestSelectFilters?: Partial<ManifestGetRequest>;
    disabled?: boolean;
    skipManifestId?: string;
    skipFetch?: boolean;
};

export default function ManifestSelect<T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    width = '100%',
    manifestSelectFilters = {},
    disabled,
    skipManifestId,
    skipFetch
}: Props<T>) {
    const { t } = useAppTranslation();
    const [open, setOpen] = useState(false);

    const {
        field: {
            value,
            onChange
        },
        fieldState: { error }
    } = useController({
        name,
        control
    });

    const {
        data,
        isLoading
    } = ManifestsGrpcService.useGetManifestsQuery(
        {
            ...{
                driverIds: [],
                page     : 0,
                perPage  : 10000,
                statuses : [
                    ManifestModel_Status.ASSIGNED,
                    ManifestModel_Status.IN_PROGRESS,
                    ManifestModel_Status.PLANNING
                ],
                trailerIds: [],
                truckIds  : [],
                sortType  : ManifestGetRequest_SortType.FIRST_STOP_APPOINTMENT_START_AT_ASC,
                startDate : '',
                endDate   : '',
                loadIds   : []
            },
            ...manifestSelectFilters
        },
        {
            skip: skipFetch
        }
    );

    const manifests = useMemo(() => {
        if (!data?.manifests) return [];
        const flattedManifests = data.manifests;
        if (!skipManifestId) return flattedManifests;
        return flattedManifests.filter((manifest) => manifest.manifestId !== skipManifestId);
    }, [data?.manifests, skipManifestId]);

    const manifestsMap = createMap(manifests, 'manifestId');

    const options = manifests.map((manifest) => manifest.manifestId);

    return (
        <FormControl style={{ width }}>
            <Autocomplete
                open={open}
                size="small"
                value={value}
                disabled={disabled}
                onChange={(_, newValue) => {
                    if (!newValue) {
                        onChange('');
                        return;
                    }
                    onChange(newValue);
                }}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => {
                    const manifest = manifestsMap[option];
                    const manifestTitle = manifest?.title ? `l ${manifest.title}` : '';
                    return manifest ? `M-${manifest.friendlyId} ${manifestTitle}` : '';
                }}
                options={options}
                loading={isLoading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        label={t(label)}
                        variant="filled"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLoading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            )
                        }}
                    />
                )}
                renderOption={(props, option) => {
                    const manifest = manifestsMap[option];
                    return (
                        <Box
                            component="li"
                            {...props}
                        >
                            <ManifestOption option={manifest} />
                        </Box>
                    );
                }}
            />
            {error && <FormHelperText error>{t(error.message as IntlMessageKey)}</FormHelperText>}
        </FormControl>
    );
}
