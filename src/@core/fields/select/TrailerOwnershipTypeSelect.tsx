import SelectInput from '@/@core/fields/inputs/SelectInput';
import { ComponentProps, ReactNode, useMemo } from 'react';
import { TrailerOwnershipTypes } from '@/models/fleet/trailers/trailer-type';
import { TRAILER_OWNERSHIP_TYPE_ICONS } from '@/@core/theme/entities/trailer/trailerOwnershipType';
import { Control, ErrorOption, FieldValues, Path } from 'react-hook-form';
import { Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

interface Props<TFieldValues extends FieldValues = FieldValues>
    extends Omit<ComponentProps<typeof SelectInput>, 'options' | 'label' | 'control' | 'errors'> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label?: IntlMessageKey;
}

export default function TrailerOwnershipTypeSelect<TFieldValues extends FieldValues = FieldValues>({
    label = 'core:selects.trailer_ownership_type.label',
    ...props
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();

    const options = useMemo(() => {
        const getLabel = (icon: ReactNode, label: ReactNode) => (
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="4px"
                sx={{
                    svg: {
                        width : '23px',
                        height: '23px'
                    }
                }}
            >
                {icon}
                {label}
            </Stack>
        );

        return Object.values(TrailerOwnershipTypes).map((type) => ({
            value: type,
            label: () =>
                getLabel(
                    TRAILER_OWNERSHIP_TYPE_ICONS[type],
                    t(`state_info:trailers.ownership_type.${type}`)
                )
        }));
    }, [t]);

    return (
        <SelectInput
            label={label}
            options={options}
            width="100%"
            size="small"
            {...props}
        />
    );
}
