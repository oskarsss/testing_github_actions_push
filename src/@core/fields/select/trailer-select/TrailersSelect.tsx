import { useMemo } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import createMap from '@/utils/create-map';
import type { IntlMessageKey } from '@/@types/next-intl';
import { TrailerModel_Status } from '@proto/models/model_trailer';
import { useAppSelector } from '@/store/hooks';
import { TrailerDataSelectors } from '@/store/storage/trailers/slice';
import OptionName from './OptionName';
import TrailerStatus from './TrailerStatus';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    required?: boolean;
    label?: IntlMessageKey;
    testID?: string;
    showDeleted?: boolean;
}

export default function TrailersSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    required = false,
    label = 'core:selects.trailer.label',
    testID = '',
    showDeleted = false
}: Props<TFieldValues>) {
    const trailerTypesMap = useTrailersTypesMap();

    const trailers = useAppSelector(TrailerDataSelectors.getRows);

    const {
        options,
        trailersById
    } = useMemo(() => {
        const options: Option[] = (
            showDeleted
                ? trailers
                : trailers.filter(({ status }) => status !== TrailerModel_Status.DELETED)
        ).map((trailer) => {
            const iconIndex = trailerTypesMap[trailer.trailerTypeId]?.icon || 0;

            return {
                id  : trailer.trailerId,
                name: `#${trailer.referenceId} - ${trailer.year} ${trailer.model
                    .charAt(0)
                    .toUpperCase()}${trailer.model.slice(1)}`,
                optionContent: <OptionName trailer={trailer} />,
                marker       : getTrailerTypeIcon(iconIndex),
                markerEnd    : <TrailerStatus status={trailer.status} />
            };
        });

        return { options, trailersById: createMap(options, 'id') };
    }, [trailers, trailerTypesMap, showDeleted]);

    return (
        <CustomAutocomplete
            control={control}
            name={name}
            label={label}
            options={options}
            entities_by_id={trailersById}
            required={required}
            testOptions={{
                inputTestID: testID
            }}
        />
    );
}
